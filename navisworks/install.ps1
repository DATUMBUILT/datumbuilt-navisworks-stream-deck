param(
    [string]$NavisworksInstallDir = 'C:\Program Files\Autodesk\Navisworks Manage 2027',
    [switch]$SkipBuild
)

$ErrorActionPreference = 'Stop'

if (Get-Process -Name 'Roamer' -ErrorAction SilentlyContinue) {
    throw 'Navisworks is still running. Close Navisworks and end every Roamer.exe process in Task Manager, then run the installer again.'
}

$projectRoot = $PSScriptRoot
$bundleName = 'VC.Navisworks2027Starter.bundle'
$bundleTarget = Join-Path $env:APPDATA "Autodesk\ApplicationPlugins\$bundleName"
$contentsTarget = Join-Path $bundleTarget 'Contents\v24'
$assemblySource = Join-Path $projectRoot 'src\bin\Release\VC.Navisworks2027Starter.dll'
$ribbonSource = Join-Path $projectRoot 'src\DATUMBUILT.xaml'
$imagesSource = Join-Path $projectRoot 'src\Images'

if (-not $SkipBuild) {
    & (Join-Path $projectRoot 'build.ps1') -Configuration Release -NavisworksInstallDir $NavisworksInstallDir
}

if (-not (Test-Path -LiteralPath $assemblySource)) {
    throw "Built plug-in not found at '$assemblySource'."
}
if (-not (Test-Path -LiteralPath $ribbonSource)) {
    throw "Built ribbon layout not found at '$ribbonSource'."
}
if (-not (Test-Path -LiteralPath $imagesSource)) {
    throw "Ribbon images not found at '$imagesSource'."
}

New-Item -ItemType Directory -Path $contentsTarget -Force | Out-Null
$localizedTarget = Join-Path $contentsTarget 'en-US'
New-Item -ItemType Directory -Path $localizedTarget -Force | Out-Null
$imagesTarget = Join-Path $contentsTarget 'Images'
$localizedImagesTarget = Join-Path $localizedTarget 'Images'
New-Item -ItemType Directory -Path $imagesTarget -Force | Out-Null
New-Item -ItemType Directory -Path $localizedImagesTarget -Force | Out-Null
Copy-Item -LiteralPath (Join-Path $projectRoot 'bundle\PackageContents.xml') -Destination (Join-Path $bundleTarget 'PackageContents.xml') -Force
Copy-Item -LiteralPath $assemblySource -Destination (Join-Path $contentsTarget 'VC.Navisworks2027Starter.dll') -Force
Copy-Item -LiteralPath $ribbonSource -Destination (Join-Path $contentsTarget 'DATUMBUILT.xaml') -Force
Copy-Item -LiteralPath $ribbonSource -Destination (Join-Path $localizedTarget 'DATUMBUILT.xaml') -Force
Copy-Item -LiteralPath (Join-Path $imagesSource 'ToggleClashHideOther-16.png') -Destination $imagesTarget -Force
Copy-Item -LiteralPath (Join-Path $imagesSource 'ToggleClashHideOther-32.png') -Destination $imagesTarget -Force
Copy-Item -LiteralPath (Join-Path $imagesSource 'ToggleClashHideOther-16.png') -Destination $localizedImagesTarget -Force
Copy-Item -LiteralPath (Join-Path $imagesSource 'ToggleClashHideOther-32.png') -Destination $localizedImagesTarget -Force

Write-Host "Installed to $bundleTarget"
Write-Host 'Restart Navisworks Manage 2027, then open Add-Ins > External Tools.'
