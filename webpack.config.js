var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');

module.exports = {
	context: path.resolve('./src/'),
	entry: {
		popup: './project/PluralsightToTrello/popup/popup.ts',
		content: './project/PluralsightToTrello/content/pluralsight_cs.ts',
		options: './project/PluralsightToTrello/options/options.js',
		background: './project/PluralsightToTrello/background/eventPage.js',
		trello: './foundation/lib/client.coffee'
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
			},
			{
				test: /\.coffee$/,
				use: ['coffee-loader']
			}
		]
	},
	plugins: [
		new CopyWebpackPlugin([
			{ from: './project/PluralsightToTrello/**/*.png', to: './thumbnails/', flatten: true },
			{ from: './project/PluralsightToTrello/**/*.html', to: './html/', flatten: true },
			'./project/PluralsightToTrello/manifest.json'
		]),
		new webpack.ProvidePlugin({
			jQuery: 'jquery',
			$: 'jquery',
			jquery: 'jquery'
		})
	]
}