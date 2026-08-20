$ErrorActionPreference = 'Stop'
$bundleTarget = Join-Path $env:APPDATA 'Autodesk\ApplicationPlugins\VC.Navisworks2027Starter.bundle'

if (Test-Path -LiteralPath $bundleTarget) {
    Remove-Item -LiteralPath $bundleTarget -Recurse -Force
    Write-Host "Removed $bundleTarget"
} else {
    Write-Host 'The plug-in is not installed for the current user.'
}

