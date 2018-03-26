var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	context: path.resolve('./src/'),
	entry: {
		'js/popup.js': './project/PluralsightToTrello/popup/popup.ts',
		'js/content.js': './project/PluralsightToTrello/content/content.ts',
		'js/options.js': './project/PluralsightToTrello/options/options.js',
		'js/background.js': './project/PluralsightToTrello/background/background.ts',
		'js/trello.js': './foundation/TrelloApi/client.coffee',

		'css/popup.css': './project/PluralsightToTrello/popup/popup.scss'
	},
	resolve: {
		extensions: [".min.js", ".js", ".ts", ".d.ts", ".min.css", "scss", ".css"]
	},
	output: {
		path: path.resolve('build/dist'),
		filename: "[name]"
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: "/node_modules/",
				loader: "ts-loader",
				options: { configFile: "tsconfig.json" }
			},
			{
				test: /\.coffee$/,
				use: ['coffee-loader']
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					use: [{
						loader: "css-loader",
						options: {
						  minimize: true || {/* CSSNano Options */}
						}
					}, {
						loader: "sass-loader",
						options: {
							includePaths: [
								path.resolve("./node_modules/milligram/dist")
							]
						}
					}],
					// use style-loader in development
					fallback: "style-loader"
				})
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
		}),
		new ExtractTextPlugin({
			filename: '[name]'
		})
	]
}