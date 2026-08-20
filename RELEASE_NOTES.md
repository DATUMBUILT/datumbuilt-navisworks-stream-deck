# Release 2026.08.19

## Included

- ▲ DATUMBUILT Navisworks Tools for Navisworks Manage 2027 — 1.3.2
- DATUMBUILT Navisworks for Stream Deck — 3.0.0.0

## New Stream Deck actions

Select / Window, Item Move / Reset, Draw / Erase, Measure / Clear, Apply A.P. / Reset, Black Arrow, Line / String, Ellipse / Cloud, Clash Detective, Red Cloud, Red Ellipse, Red String, Red Line, Eraser, Blue Cloud, Blue Ellipse, Blue String, and Blue Line.

All markup drawing actions set thickness to 6. Red, blue, and black actions also set their color before activating the tool. Short/long pairs use a 600 ms hold threshold.

## Stability fixes

- Uses Navisworks' supported command manager instead of its private framework interface.
- Supports both execute and toggle command types, including Select Objects and Crossing Select.
- Corrects the installer so an upgrade replaces the active bundle instead of creating a nested bundle.

## Compatibility

- Windows 10 or later
- Autodesk Navisworks Manage 2027
- Elgato Stream Deck 7.1 or later

The Stream Deck actions require the companion Navisworks plug-in. Communication is restricted to IPv4 loopback TCP port 42727.