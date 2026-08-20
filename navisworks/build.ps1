param(
    [string]$Configuration = 'Release',
    [string]$NavisworksInstallDir = 'C:\Program Files\Autodesk\Navisworks Manage 2027'
)

$ErrorActionPreference = 'Stop'
$projectRoot = $PSScriptRoot
$solutionPath = Join-Path $projectRoot 'Navisworks2027Plugin.sln'
$vswherePath = Join-Path ${env:ProgramFiles(x86)} 'Microsoft Visual Studio\Installer\vswhere.exe'

if (-not (Test-Path -LiteralPath $vswherePath)) {
    throw 'Visual Studio Installer (vswhere.exe) was not found. Install Visual Studio 2022 or Build Tools with .NET desktop development.'
}

$msbuildPath = & $vswherePath -latest -products * -requires Microsoft.Component.MSBuild -find 'MSBuild\**\Bin\MSBuild.exe' | Select-Object -First 1
if (-not $msbuildPath) {
    throw 'MSBuild was not found. Install Visual Studio 2022 or Build Tools with .NET desktop development.'
}

& $msbuildPath $solutionPath /restore /t:Build /p:Configuration=$Configuration "/p:NavisworksInstallDir=$NavisworksInstallDir" /nr:false /m:1 /nologo
if ($LASTEXITCODE -ne 0) {
    throw "Build failed with exit code $LASTEXITCODE."
}
