$codePath = "."
$sourcePath = "./src"
$projectPath = "$sourcePath/project"
$foundationPath = "$sourcePath/foundation"
$libPath = "$foundationPath/lib"
$pttPath = "$projectPath/PluralsightToTrello/"
$distPath = "$codePath/build/dist/"

Copy-Item "$libPath/client.js" "$distPath/js"

Copy-Item "$codePath/node_modules/jquery/dist/jquery.min.js" "$distPath/js/jquery.js"