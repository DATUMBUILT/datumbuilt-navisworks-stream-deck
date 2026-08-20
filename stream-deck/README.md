# DATUMBUILT Navisworks for Stream Deck

## Requirements

- Elgato Stream Deck 7.1 or later
- Node.js 20 or later for development
- pnpm

## Build

```powershell
pnpm install
pnpm run build
pnpm run validate
```

The Rollup configuration bundles `@elgato/streamdeck` into the compiled entry point. Do not mark that package as external: Stream Deck starts plug-ins with global module lookup disabled.

## Package

```powershell
pnpm run pack
```

The action connects only to `127.0.0.1:42727` and requires ▲ DATUMBUILT Clash Tools to be running inside Navisworks Manage 2027.
