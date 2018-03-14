$codePath = "."
$sourcePath = "./src"
$projectPath = "$sourcePath/project"
$foundationPath = "$sourcePath/foundation"
$libPath = "$foundationPath/lib"
$pttPath = "$projectPath/PluralsightToTrello/"
$distPath = "$codePath/build/dist/"

$html = "$distPath/html"
if (-not (Test-Path $html))
{mkdir $html}
Copy-Item "$pttPath/options/options.html" $html
Copy-Item "$pttPath/popup/popup.html" $html

$thumbnails = "$distPath/thumbnails"
if (-not (Test-Path $thumbnails))
{mkdir $thumbnails}
Copy-Item "$pttPath/popup/icon.png" $thumbnails

Copy-Item "$codePath/manifest.json" $distPath

Copy-Item "$libPath/client.js" "$distPath/js"

Copy-Item "$codePath/node_modules/jquery/dist/jquery.min.js" "$distPath/js/jquery.js"