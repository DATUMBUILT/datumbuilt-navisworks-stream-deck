import streamDeck from "@elgato/streamdeck";
import { appendFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { ToggleClashHideOtherAction } from "./toggle-clash-hide-other.js";
import {
  AppearanceProfileResetAction, BlackArrowAction, BlueCloudAction, BlueEllipseAction,
  BlueLineAction, BlueStringAction, ClashDetectiveAction, DrawEraseAction,
  EllipseCloudAction, EraserAction, ItemMoveResetAction, LineStringAction,
  MeasureClearAction, RedCloudAction, RedEllipseAction, RedLineAction,
  RedStringAction, SelectWindowAction
} from "./navisworks-actions.js";

try { appendFileSync(join(tmpdir(), "DATUMBUILT-StreamDeck.log"), `${new Date().toISOString()} Plug-in started.\n`); } catch { }

streamDeck.logger.setLevel("info");
[
  new ToggleClashHideOtherAction(), new SelectWindowAction(), new ItemMoveResetAction(),
  new DrawEraseAction(), new MeasureClearAction(), new AppearanceProfileResetAction(),
  new BlackArrowAction(), new LineStringAction(), new EllipseCloudAction(),
  new ClashDetectiveAction(), new RedCloudAction(), new RedEllipseAction(),
  new RedStringAction(), new RedLineAction(), new EraserAction(), new BlueCloudAction(),
  new BlueEllipseAction(), new BlueStringAction(), new BlueLineAction()
].forEach((pluginAction) => streamDeck.actions.registerAction(pluginAction));
streamDeck.connect();