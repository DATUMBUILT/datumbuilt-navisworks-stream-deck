# DATUMBUILT Navisworks + Stream Deck

Direct Stream Deck control for Autodesk Navisworks Manage 2027—without simulated keystrokes or third-party macro actions.

This repository contains two companion products:

- **▲ DATUMBUILT Navisworks Tools 1.3.2** runs inside Navisworks and executes commands through the Navisworks command API.
- **DATUMBUILT Navisworks for Stream Deck 3.0.0** provides the Stream Deck actions and communicates with the Navisworks companion plugin.

Both products are required.

## Downloads

- [Download ▲ DATUMBUILT Navisworks Tools 1.3.2](releases/DATUMBUILT-Navisworks-Tools-1.3.2.zip)
- [Download DATUMBUILT Navisworks for Stream Deck 3.0.0](releases/DATUMBUILT-Navisworks-Stream-Deck-3.0.0.streamDeckPlugin)
- [SHA-256 checksums](releases/SHA256SUMS.txt)

## Requirements

- Windows 10 or later
- Autodesk Navisworks Manage 2027
- Elgato Stream Deck 7.1 or later

## Installation

### 1. Install the Navisworks companion plugin

1. Close Navisworks Manage.
2. Download and extract `DATUMBUILT-Navisworks-Tools-1.3.2.zip`.
3. Double-click `Install.cmd`.
4. Reopen Navisworks Manage 2027.

Navisworks should display the **▲ DATUMBUILT** ribbon tab. The companion plugin also starts its local Stream Deck bridge automatically.

### 2. Install the Stream Deck plugin

1. Download `DATUMBUILT-Navisworks-Stream-Deck-3.0.0.streamDeckPlugin`.
2. Double-click the file and approve installation.
3. Open Stream Deck.
4. Drag actions from **DATUMBUILT Navisworks** onto your keys.

## Included actions

| Action | Short press | Long press |
|---|---|---|
| Select / Window | Select Objects | Crossing Select |
| Item Move / Reset | Item Move | Reset selected transforms |
| Draw / Erase | Freehand markup | Erase markup |
| Measure / Clear | Point-to-point measure | Clear measurements |
| Apply A.P. / Reset | Apply Appearance Profile | Reset appearances |
| Line / String | Line | Line String |
| Ellipse / Cloud | Ellipse | Cloud |
| Toggle Clash Hide Other | Toggle Clash Detective Hide Other | — |
| Black Arrow | Black arrow, thickness 6 | — |
| Clash Detective | Open Clash Detective | — |
| Red Cloud | Red cloud, thickness 6 | — |
| Red Ellipse | Red ellipse, thickness 6 | — |
| Red String | Red line string, thickness 6 | — |
| Red Line | Red line, thickness 6 | — |
| Blue Cloud | Blue cloud, thickness 6 | — |
| Blue Ellipse | Blue ellipse, thickness 6 | — |
| Blue String | Blue line string, thickness 6 | — |
| Blue Line | Blue line, thickness 6 | — |
| Eraser | Erase markup | — |

Long-press actions use a 600 ms hold threshold.

## How it works

The Stream Deck plugin sends only predefined commands to a loopback bridge at `127.0.0.1:42727`. The companion plugin receives those commands inside Navisworks and invokes the corresponding Navisworks command.

The bridge:

- accepts connections only from the local computer;
- uses a fixed command allowlist;
- cannot execute arbitrary programs or shell commands;
- does not require internet access.

## Troubleshooting

### A Stream Deck key shows a yellow warning triangle

Confirm that:

1. Navisworks Manage 2027 is running.
2. Navisworks Tools **1.3.2** is installed.
3. Stream Deck plugin **3.0.0** is installed.
4. Navisworks was restarted after installing or upgrading the companion plugin.

The bridge log is located at:

```text
%TEMP%\DATUMBUILT-Navisworks-Bridge.log
```

The Stream Deck plugin log is located at:

```text
%TEMP%\DATUMBUILT-StreamDeck.log
```

### Navisworks still shows an older plugin version

Close Navisworks, rerun `Install.cmd` from the 1.3.2 package, and then reopen Navisworks. Version 1.3.2 includes the corrected upgrade installer.

## Building from source

The Navisworks project targets .NET Framework 4.8 and references the Navisworks Manage 2027 API. The Stream Deck project uses TypeScript, Node.js, and the Elgato Stream Deck SDK.

See [navisworks/README.md](navisworks/README.md) and [stream-deck/README.md](stream-deck/README.md) for development instructions.

## License

MIT. Autodesk, Navisworks, Elgato, and Stream Deck are trademarks of their respective owners.
