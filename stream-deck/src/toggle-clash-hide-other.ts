import { createConnection } from "node:net";
import { appendFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  action,
  type KeyDownEvent,
  SingletonAction
} from "@elgato/streamdeck";

const BRIDGE_PORT = 42727;
const LOG_PATH = join(tmpdir(), "DATUMBUILT-StreamDeck.log");

function log(message: string): void {
  try {
    appendFileSync(LOG_PATH, `${new Date().toISOString()} ${message}\n`);
  } catch {
    // Diagnostics must never prevent the action from running.
  }
}

@action({ UUID: "com.victorcastillo.datumbuilt.navisworks.toggle-clash-hide-other" })
export class ToggleClashHideOtherAction extends SingletonAction {
  override async onKeyDown(ev: KeyDownEvent): Promise<void> {
    log("Key pressed.");
    if (process.platform !== "win32") {
      log(`Unsupported platform: ${process.platform}.`);
      await ev.action.showAlert();
      return;
    }

    const response = await toggleThroughNavisworks();
    log(`Bridge response: ${response}`);
    if (response === "OK") {
      await ev.action.showOk();
    } else {
      await ev.action.showAlert();
    }
  }
}

function toggleThroughNavisworks(): Promise<string> {
  return new Promise((resolve) => {
    let settled = false;
    let response = "";
    const finish = (value: string) => {
      if (settled) return;
      settled = true;
      socket.destroy();
      resolve(value);
    };

    const socket = createConnection({ host: "127.0.0.1", port: BRIDGE_PORT }, () => {
      socket.write("TOGGLE_CLASH_HIDE_OTHER\n");
    });
    socket.setEncoding("utf8");
    socket.setTimeout(4000);
    socket.on("data", (chunk) => {
      response += chunk;
      const newline = response.indexOf("\n");
      if (newline >= 0) finish(response.slice(0, newline).trim());
    });
    socket.once("timeout", () => finish("ERROR:TIMEOUT"));
    socket.once("error", (error) => finish(`ERROR:${error.message}`));
    socket.once("end", () => finish(response.trim() || "ERROR:NO_RESPONSE"));
  });
}
