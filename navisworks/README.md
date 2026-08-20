# ▲ DATUMBUILT Clash Tools for Navisworks Manage 2027

## Requirements

- Autodesk Navisworks Manage 2027
- Visual Studio 2022 or later with .NET desktop development
- .NET Framework 4.8 targeting pack

## Build

```powershell
.\build.ps1
```

The project references the Navisworks 2027 API from `C:\Program Files\Autodesk\Navisworks Manage 2027`. Supply `-NavisworksInstallDir` if it is installed elsewhere.

## Install a source build

Close Navisworks and run `./install.ps1`. The plug-in installs for the current user under `%APPDATA%\Autodesk\ApplicationPlugins`.

## Integration

`StreamDeckBridgePlugin.cs` starts a loopback-only TCP listener on port `42727`. UI work is dispatched onto Navisworks' dispatcher before updating `LcClClashDisplaySettings.HideOther`.
