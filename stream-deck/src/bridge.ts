import { createConnection } from "node:net";
import { appendFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const BRIDGE_PORT = 42727;
const LOG_PATH = join(tmpdir(), "DATUMBUILT-StreamDeck.log");

export function log(message: string): void {
  try { appendFileSync(LOG_PATH, `${new Date().toISOString()} ${message}\n`); } catch { }
}

export function sendBridgeRequest(request: string): Promise<string> {
  return new Promise((resolve) => {
    let settled = false;
    let response = "";
    const socket = createConnection({ host: "127.0.0.1", port: BRIDGE_PORT }, () => socket.write(`${request}\n`));
    const finish = (value: string) => {
      if (settled) return;
      settled = true;
      socket.destroy();
      resolve(value);
    };
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