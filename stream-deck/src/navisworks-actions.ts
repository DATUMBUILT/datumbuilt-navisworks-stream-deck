import { action, type KeyDownEvent, type KeyUpEvent, SingletonAction } from "@elgato/streamdeck";
import { log, sendBridgeRequest } from "./bridge.js";

const LONG_PRESS_MS = 600;

abstract class NavisworksBridgeAction extends SingletonAction {
  protected abstract readonly shortRequest: string;
  protected readonly longRequest?: string;
  private readonly pressedAt = new Map<string, number>();

  override async onKeyDown(ev: KeyDownEvent): Promise<void> {
    if (this.longRequest) {
      this.pressedAt.set(ev.action.id, Date.now());
      return;
    }
    await this.execute(ev, this.shortRequest);
  }

  override async onKeyUp(ev: KeyUpEvent): Promise<void> {
    if (!this.longRequest) return;
    const started = this.pressedAt.get(ev.action.id) ?? Date.now();
    this.pressedAt.delete(ev.action.id);
    const request = Date.now() - started >= LONG_PRESS_MS ? this.longRequest : this.shortRequest;
    await this.execute(ev, request);
  }

  private async execute(ev: KeyDownEvent | KeyUpEvent, request: string): Promise<void> {
    const response = await sendBridgeRequest(request);
    log(`${request}: ${response}`);
    if (response === "OK") await ev.action.showOk(); else await ev.action.showAlert();
  }
}

@action({ UUID: "com.victorcastillo.datumbuilt.navisworks.select-window" })
export class SelectWindowAction extends NavisworksBridgeAction { protected readonly shortRequest = "SELECT_OBJECTS"; protected readonly longRequest = "SELECT_BOX"; }

@action({ UUID: "com.victorcastillo.datumbuilt.navisworks.item-move-reset" })
export class ItemMoveResetAction extends NavisworksBridgeAction { protected readonly shortRequest = "ITEM_MOVE"; protected readonly longRequest = "RESET_SELECTED_TRANSFORMS"; }

@action({ UUID: "com.victorcastillo.datumbuilt.navisworks.draw-erase" })
export class DrawEraseAction extends NavisworksBridgeAction { protected readonly shortRequest = "DRAW_FREEHAND"; protected readonly longRequest = "ERASE_MARKUP"; }

@action({ UUID: "com.victorcastillo.datumbuilt.navisworks.measure-clear" })
export class MeasureClearAction extends NavisworksBridgeAction { protected readonly shortRequest = "MEASURE_POINT_TO_POINT"; protected readonly longRequest = "CLEAR_MEASUREMENTS"; }

@action({ UUID: "com.victorcastillo.datumbuilt.navisworks.appearance-profile-reset" })
export class AppearanceProfileResetAction extends NavisworksBridgeAction { protected readonly shortRequest = "APPLY_APPEARANCE_PROFILE"; protected readonly longRequest = "RESET_ALL_APPEARANCES"; }

@action({ UUID: "com.victorcastillo.datumbuilt.navisworks.black-arrow" })
export class BlackArrowAction extends NavisworksBridgeAction { protected readonly shortRequest = "BLACK_ARROW"; }

@action({ UUID: "com.victorcastillo.datumbuilt.navisworks.line-string" })
export class LineStringAction extends NavisworksBridgeAction { protected readonly shortRequest = "MARKUP_LINE"; protected readonly longRequest = "MARKUP_STRING"; }

@action({ UUID: "com.victorcastillo.datumbuilt.navisworks.ellipse-cloud" })
export class EllipseCloudAction extends NavisworksBridgeAction { protected readonly shortRequest = "MARKUP_ELLIPSE"; protected readonly longRequest = "MARKUP_CLOUD"; }

@action({ UUID: "com.victorcastillo.datumbuilt.navisworks.clash-detective" })
export class ClashDetectiveAction extends NavisworksBridgeAction { protected readonly shortRequest = "CLASH_DETECTIVE"; }

@action({ UUID: "com.victorcastillo.datumbuilt.navisworks.red-cloud" })
export class RedCloudAction extends NavisworksBridgeAction { protected readonly shortRequest = "RED_CLOUD"; }

@action({ UUID: "com.victorcastillo.datumbuilt.navisworks.red-ellipse" })
export class RedEllipseAction extends NavisworksBridgeAction { protected readonly shortRequest = "RED_ELLIPSE"; }

@action({ UUID: "com.victorcastillo.datumbuilt.navisworks.red-string" })
export class RedStringAction extends NavisworksBridgeAction { protected readonly shortRequest = "RED_STRING"; }

@action({ UUID: "com.victorcastillo.datumbuilt.navisworks.red-line" })
export class RedLineAction extends NavisworksBridgeAction { protected readonly shortRequest = "RED_LINE"; }

@action({ UUID: "com.victorcastillo.datumbuilt.navisworks.eraser" })
export class EraserAction extends NavisworksBridgeAction { protected readonly shortRequest = "ERASE_MARKUP"; }

@action({ UUID: "com.victorcastillo.datumbuilt.navisworks.blue-cloud" })
export class BlueCloudAction extends NavisworksBridgeAction { protected readonly shortRequest = "BLUE_CLOUD"; }

@action({ UUID: "com.victorcastillo.datumbuilt.navisworks.blue-ellipse" })
export class BlueEllipseAction extends NavisworksBridgeAction { protected readonly shortRequest = "BLUE_ELLIPSE"; }

@action({ UUID: "com.victorcastillo.datumbuilt.navisworks.blue-string" })
export class BlueStringAction extends NavisworksBridgeAction { protected readonly shortRequest = "BLUE_STRING"; }

@action({ UUID: "com.victorcastillo.datumbuilt.navisworks.blue-line" })
export class BlueLineAction extends NavisworksBridgeAction { protected readonly shortRequest = "BLUE_LINE"; }