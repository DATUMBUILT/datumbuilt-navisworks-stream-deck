import { action, type KeyDownEvent, SingletonAction } from "@elgato/streamdeck";
import { log, sendBridgeRequest } from "./bridge.js";

@action({ UUID: "com.victorcastillo.datumbuilt.navisworks.toggle-clash-hide-other" })
export class ToggleClashHideOtherAction extends SingletonAction {
  override async onKeyDown(ev: KeyDownEvent): Promise<void> {
    const response = await sendBridgeRequest("TOGGLE_CLASH_HIDE_OTHER");
    log(`TOGGLE_CLASH_HIDE_OTHER: ${response}`);
    if (response === "OK") await ev.action.showOk(); else await ev.action.showAlert();
  }
}