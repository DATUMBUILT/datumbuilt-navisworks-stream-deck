import streamDeck from "@elgato/streamdeck";
import { appendFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { ToggleClashHideOtherAction } from "./toggle-clash-hide-other.js";

try {
  appendFileSync(join(tmpdir(), "DATUMBUILT-StreamDeck.log"), `${new Date().toISOString()} Plug-in started.\n`);
} catch {
  // Startup diagnostics must not prevent registration.
}

streamDeck.logger.setLevel("info");
streamDeck.actions.registerAction(new ToggleClashHideOtherAction());
streamDeck.connect();
