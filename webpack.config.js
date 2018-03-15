var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	context: path.resolve('./src/project/'),
	entry: {
		popup: './PluralsightToTrello/popup/popup.ts',
		content: './PluralsightToTrello/content/pluralsight_cs.ts',
		options: './PluralsightToTrello/options/options.js',
		background: './PluralsightToTrello/background/eventPage.js'
	},
	resolve: {
		extensions: [".ts", ".js"]
	},
	output: {
		path: path.resolve('build/dist'),
		filename: "js/[name].js"
	},
	module: {
		rules: [
			{
				test: /\.ts$/, 
				exclude: "/node_modules/",
				loader: "ts-loader"
			}
		]
	},
    plugins: [
        new CopyWebpackPlugin([
            { from: './PluralsightToTrello/**/*.png', to: './thumbnails/', flatten: true },
            { from: './PluralsightToTrello/**/*.html', to: './html/', flatten: true },
            './PluralsightToTrello/manifest.json'
        ])
    ]
}