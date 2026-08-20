using System;
using System.Drawing;
using System.Reflection;
using Autodesk.Navisworks.Api.Interop;
using Autodesk.Navisworks.Gui.Command;
using Autodesk.Navisworks.Gui.Interface;
using Autodesk.Navisworks.Gui.Roamer;

namespace VC.Navisworks2027Starter
{
    internal static class NavisworksCommandExecutor
    {
        private const int MarkupThickness = 6;

        internal static bool TryExecute(string request, out string error)
        {
            error = null;
            try
            {
                switch (request)
                {
                    case "SELECT_OBJECTS": ExecuteNative("RoamerGUI_MODE_SELECT"); break;
                    case "SELECT_BOX": ExecuteNative("RoamerGUI_MODE_SELECT_BOX"); break;
                    case "ITEM_MOVE": ExecuteNative("RoamerGUI_ObjTranslate"); break;
                    case "RESET_SELECTED_TRANSFORMS": ExecuteNative("RoamerGUI_EDIT_RESET_MOVED"); break;
                    case "DRAW_FREEHAND": ExecuteMarkup("RoamerGUI_REDLINE_PEN", null); break;
                    case "ERASE_MARKUP": ExecuteNative("RoamerGUI_REDLINE_ERASE"); break;
                    case "MEASURE_POINT_TO_POINT": ExecuteNative("RoamerGUI_OM_MEASURE_PT_TO_PT"); break;
                    case "CLEAR_MEASUREMENTS": ExecuteNative("RoamerGUI_OM_MEASURE_NAV"); break;
                    case "APPLY_APPEARANCE_PROFILE": ExecuteNative("RoamerGUI_AppearanceProfiler_Play"); break;
                    case "RESET_ALL_APPEARANCES": ExecuteNative("RoamerGUI_EDIT_RESET_ALL_COLOURS"); break;
                    case "BLACK_ARROW": ExecuteMarkup("RoamerGUI_REDLINE_ARROW", Color.Black); break;
                    case "MARKUP_LINE": ExecuteMarkup("RoamerGUI_REDLINE_LINE", null); break;
                    case "MARKUP_STRING": ExecuteMarkup("RoamerGUI_REDLINE_LINE_STRING", null); break;
                    case "MARKUP_ELLIPSE": ExecuteMarkup("RoamerGUI_REDLINE_ELLIPSE", null); break;
                    case "MARKUP_CLOUD": ExecuteMarkup("RoamerGUI_REDLINE_CLOUD", null); break;
                    case "CLASH_DETECTIVE": ExecuteNative("ClashWindowCommand.Navisworks"); break;
                    case "RED_CLOUD": ExecuteMarkup("RoamerGUI_REDLINE_CLOUD", Color.Red); break;
                    case "RED_ELLIPSE": ExecuteMarkup("RoamerGUI_REDLINE_ELLIPSE", Color.Red); break;
                    case "RED_STRING": ExecuteMarkup("RoamerGUI_REDLINE_LINE_STRING", Color.Red); break;
                    case "RED_LINE": ExecuteMarkup("RoamerGUI_REDLINE_LINE", Color.Red); break;
                    case "BLUE_CLOUD": ExecuteMarkup("RoamerGUI_REDLINE_CLOUD", Color.Blue); break;
                    case "BLUE_ELLIPSE": ExecuteMarkup("RoamerGUI_REDLINE_ELLIPSE", Color.Blue); break;
                    case "BLUE_STRING": ExecuteMarkup("RoamerGUI_REDLINE_LINE_STRING", Color.Blue); break;
                    case "BLUE_LINE": ExecuteMarkup("RoamerGUI_REDLINE_LINE", Color.Blue); break;
                    default: error = "UNKNOWN_REQUEST"; return false;
                }
                return true;
            }
            catch (Exception exception)
            {
                error = exception.Message;
                return false;
            }
        }

        private static void ExecuteMarkup(string commandId, Color? color)
        {
            SetMarkupThickness(MarkupThickness);
            if (color.HasValue) SetMarkupColor(color.Value);
            ExecuteNative(commandId);
        }

        private static void SetMarkupThickness(int value)
        {
            var command = CommandManager.FindCommand("RoamerGUI_REDLINE_THICKNESS") as IntCommand;
            if (command == null) throw new InvalidOperationException("Markup thickness command is unavailable.");
            command.Execute(null, value, NumericCommandEventType.EndChange, LcUCIPExecutionContext.eRIBBON);
        }

        private static void SetMarkupColor(Color color)
        {
            var command = CommandManager.FindCommand("RoamerGUI_REDLINE_COLOUR") as ColorCommand;
            if (command == null) throw new InvalidOperationException("Markup color command is unavailable.");
            command.Execute(null, color, LcUCIPExecutionContext.eRIBBON);
        }

        private static void ExecuteNative(string commandId)
        {
            var command = CommandManager.FindCommand(commandId);
            if (command == null)
                throw new InvalidOperationException("Navisworks command is unavailable: " + commandId);
            if (!command.Enabled)
                throw new InvalidOperationException("Navisworks command is currently disabled: " + commandId);

            var executeCommand = command as IExecuteCommand;
            if (executeCommand != null)
            {
                if (!executeCommand.CanExecute(null))
                    throw new InvalidOperationException("Navisworks command cannot execute now: " + commandId);
                executeCommand.Execute(null, LcUCIPExecutionContext.eRIBBON);
                return;
            }

            var toggleCommand = command as IToggleCommand;
            if (toggleCommand != null)
            {
                toggleCommand.Execute(null, LcUCIPExecutionContext.eRIBBON);
                return;
            }

            throw new InvalidOperationException("Unsupported Navisworks command type for " + commandId + ": " + command.GetType().Name);
        }
    }
}