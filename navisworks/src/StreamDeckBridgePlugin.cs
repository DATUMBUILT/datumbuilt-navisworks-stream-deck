using System;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Windows.Threading;
using Autodesk.Navisworks.Api.Plugins;

namespace VC.Navisworks2027Starter
{
    [Plugin("DatumBuiltStreamDeckBridge2027", "VC27", DisplayName = "▲ DATUMBUILT Stream Deck Bridge")]
    public sealed class StreamDeckBridgePlugin : EventWatcherPlugin
    {
        public override void OnLoaded()
        {
            StreamDeckBridge.Start(Dispatcher.CurrentDispatcher);
        }

        public override void OnUnloading()
        {
        }
    }

    internal static class StreamDeckBridge
    {
        internal const int Port = 42727;

        private static readonly object StartLock = new object();
        private static Thread serverThread;
        private static Dispatcher navisworksDispatcher;

        internal static void Start(Dispatcher dispatcher)
        {
            lock (StartLock)
            {
                navisworksDispatcher = dispatcher;
                if (serverThread != null && serverThread.IsAlive)
                    return;
                serverThread = new Thread(ServerLoop)
                {
                    IsBackground = true,
                    Name = "DATUMBUILT Stream Deck Bridge"
                };
                serverThread.Start();
                TryLog("Bridge started.");
            }
        }

        private static void ServerLoop()
        {
            TcpListener listener = null;
            try
            {
                listener = new TcpListener(IPAddress.Loopback, Port);
                listener.Start();
                TryLog("Listening on 127.0.0.1:" + Port + ".");

                while (true)
                {
                    try
                    {
                        using (var client = listener.AcceptTcpClient())
                        using (var stream = client.GetStream())
                        using (var reader = new StreamReader(stream, Encoding.UTF8, false, 256, true))
                        using (var writer = new StreamWriter(stream, new UTF8Encoding(false), 256, true) { AutoFlush = true })
                        {
                            string request = reader.ReadLine();
                            writer.WriteLine(ExecuteRequest(request));
                        }
                    }
                    catch (Exception exception)
                    {
                        TryLog(exception.ToString());
                        Thread.Sleep(250);
                    }
                }
            }
            catch (Exception exception)
            {
                TryLog(exception.ToString());
            }
            finally
            {
                if (listener != null)
                    listener.Stop();
            }
        }

        private static void TryLog(string message)
        {
            try
            {
                File.AppendAllText(
                    Path.Combine(Path.GetTempPath(), "DATUMBUILT-Navisworks-Bridge.log"),
                    DateTime.Now.ToString("O") + " " + message + Environment.NewLine);
            }
            catch { }
        }

        private static string ExecuteRequest(string request)
        {
            if (!string.Equals(request, "TOGGLE_CLASH_HIDE_OTHER", StringComparison.Ordinal))
                return "ERROR:UNKNOWN_REQUEST";
            if (navisworksDispatcher == null)
                return "ERROR:NO_UI_CONTEXT";

            string response = "ERROR:TIMEOUT";
            using (var completed = new ManualResetEventSlim(false))
            {
                navisworksDispatcher.BeginInvoke(new Action(() =>
                {
                    try
                    {
                        string error;
                        response = HelloNavisworksPlugin.TryToggleClashHideOther(out error)
                            ? "OK"
                            : "ERROR:" + error;
                    }
                    catch (Exception exception)
                    {
                        response = "ERROR:" + exception.Message;
                    }
                    finally
                    {
                        completed.Set();
                    }
                }));

                completed.Wait(3000);
            }
            return response;
        }
    }
}
