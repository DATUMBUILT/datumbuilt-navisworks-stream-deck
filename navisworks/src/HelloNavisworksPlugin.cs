using System.Windows.Forms;
using Autodesk.Navisworks.Api;
using Autodesk.Navisworks.Api.Interop;
using Autodesk.Navisworks.Api.Plugins;

namespace VC.Navisworks2027Starter
{
    [Plugin("DatumBuiltTools2027", "VC27", DisplayName = "▲ DATUMBUILT Tools")]
    [RibbonLayout("DATUMBUILT.xaml")]
    [RibbonTab("DatumBuiltTab", DisplayName = "▲ DATUMBUILT")]
    [Command(
        "ToggleClashHideOther",
        DisplayName = "Toggle Clash Hide Other",
        ToolTip = "Toggles Clash Detective's Hide Other isolation setting",
        Shortcut = "Ctrl+Shift+H",
        CanToggle = true,
        CallCanExecute = CallCanExecute.Always)]
    public sealed class HelloNavisworksPlugin : CommandHandlerPlugin
    {
        public override int ExecuteCommand(string commandId, params string[] parameters)
        {
            if (commandId != "ToggleClashHideOther")
            {
                return 0;
            }

            try
            {
                string error;
                if (!TryToggleClashHideOther(out error))
                {
                    MessageBox.Show(
                        error,
                        "Toggle Clash Hide Other",
                        MessageBoxButtons.OK,
                        MessageBoxIcon.Information);
                    return 1;
                }

                return 0;
            }
            catch (System.Exception exception)
            {
                MessageBox.Show(
                    exception.Message,
                    "Toggle Clash Hide Other error",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error);
                return 1;
            }
        }

        internal static bool TryToggleClashHideOther(out string error)
        {
            LcClClashDisplaySettings settings;
            if (!TryGetDisplaySettings(out settings))
            {
                error = "Open a Navisworks document, open Clash Detective, and select a clash result before using this command.";
                return false;
            }

            settings.HideOther = !settings.HideOther;
            error = null;
            return true;
        }

        public override CommandState CanExecuteCommand(string commandId)
        {
            CommandState state = new CommandState(commandId == "ToggleClashHideOther");
            if (!state.IsEnabled)
            {
                return state;
            }

            LcClClashDisplaySettings settings;
            if (TryGetDisplaySettings(out settings))
            {
                state.IsChecked = settings.HideOther;
            }

            return state;
        }

        private static bool TryGetDisplaySettings(out LcClClashDisplaySettings settings)
        {
            settings = null;
            Document document = Autodesk.Navisworks.Api.Application.ActiveDocument;
            if (document == null)
            {
                return false;
            }

            LcOpState activeState = LcOpState.GetActiveInstance();
            if (activeState == null)
            {
                return false;
            }

            LcClClashResultHighlighter highlighter = LcClClashResultHighlighter.GetInstance(activeState);
            if (highlighter == null || highlighter.DisplaySettings == null)
            {
                return false;
            }

            settings = highlighter.DisplaySettings;
            return true;
        }
    }
}
