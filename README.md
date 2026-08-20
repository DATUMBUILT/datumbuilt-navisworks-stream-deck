# DATUMBUILT Navisworks + Stream Deck

Two companion tools for toggling Clash Detective's **Hide Other** setting in Autodesk Navisworks Manage 2027.

## Products

### ▲ DATUMBUILT Clash Tools 1.2.1

A .NET Framework 4.8 plug-in loaded inside Navisworks. It adds:

- **▲ DATUMBUILT → Toggle Clash Hide Other**
- Keyboard shortcut **Ctrl+Shift+H**
- A local-only bridge on `127.0.0.1:42727` for the Stream Deck companion

### DATUMBUILT Navisworks for Stream Deck 2.0.2.0

A native Stream Deck Node.js plug-in with one action: **Toggle Clash Hide Other**. It sends a request to the Navisworks plug-in over the loopback interface. It does not expose a network service beyond the local computer.

## Install

Download both files from the GitHub release:

1. Extract `DATUMBUILT-Navisworks-Clash-Tools-1.2.1.zip`, close Navisworks, and run `Install.cmd`.
2. Double-click `DATUMBUILT-Navisworks-Stream-Deck-2.0.2.streamDeckPlugin` and approve installation.
3. Start Navisworks Manage 2027, then start Stream Deck.
4. Add **DATUMBUILT Navisworks → Toggle Clash Hide Other** to a key.

Both products are required for the Stream Deck action. The Stream Deck process cannot call the Navisworks API directly; the in-process Navisworks plug-in performs the toggle.

## Build from source

See [navisworks/README.md](navisworks/README.md) and [stream-deck/README.md](stream-deck/README.md).

## Security

The bridge listens only on IPv4 loopback (`127.0.0.1`) at TCP port `42727`. It accepts the single command `TOGGLE_CLASH_HIDE_OTHER`; it does not execute arbitrary commands.

## License

MIT. Autodesk, Navisworks, Elgato, and Stream Deck are trademarks of their respective owners. This project is independently developed and is not affiliated with or endorsed by Autodesk or Elgato.
