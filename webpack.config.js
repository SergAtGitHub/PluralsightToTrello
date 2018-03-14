var path = require('path');

module.exports = {
	context: path.resolve('./build/scripts/project/'),
	entry: {
		popup: './PluralsightToTrello/popup/popup.js',
		content: './PluralsightToTrello/content/pluralsight_cs.js',
		options: './PluralsightToTrello/options/options.js',
		background: './PluralsightToTrello/background/eventPage.js'
	},
	output: {
		path: path.resolve('build/dist/js'),
		filename: "[name].js"
	}
}