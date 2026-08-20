# DATUMBUILT Navisworks + Stream Deck

Two companion products providing direct Stream Deck control of Autodesk Navisworks Manage 2027 without simulated keystrokes.

## Products

### ▲ DATUMBUILT Navisworks Tools 1.3.2

A .NET Framework 4.8 plug-in loaded inside Navisworks. It provides the Clash Hide Other toggle and a loopback-only command bridge for Stream Deck.

### DATUMBUILT Navisworks for Stream Deck 3.0.0.0

Includes Toggle Clash Hide Other plus direct actions for selection, item movement/reset, measurements, Appearance Profiler, Clash Detective, and red/blue/black markup tools. Hold-enabled actions use a 600 ms threshold. Every drawing action enforces markup thickness 6.

## Install

1. Extract `DATUMBUILT-Navisworks-Tools-1.3.2.zip`, close Navisworks, and run `Install.cmd`.
2. Double-click `DATUMBUILT-Navisworks-Stream-Deck-3.0.0.streamDeckPlugin` and approve installation.
3. Start Navisworks Manage 2027, then start Stream Deck.
4. Drag actions from **DATUMBUILT Navisworks** onto your keys.

Both products are required. The Stream Deck process cannot call the Navisworks API directly; the companion plug-in executes commands inside Navisworks.

## Security

The bridge listens only on `127.0.0.1:42727` and accepts a fixed allowlist of commands. It cannot execute arbitrary programs or shell commands.

## License

MIT. Autodesk, Navisworks, Elgato, and Stream Deck are trademarks of their respective owners.