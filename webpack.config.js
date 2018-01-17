'use strict';

const webpack = require('webpack');

module.exports = {
	entry: './index.js',
	output: {
		path: __dirname,
		libraryTarget: 'umd',
		library: 'ConfettiCannon',
		filename: 'bundle.js',
	},
	module: {
		loaders: [
			{ // ES6 support.
				test:  /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: { presets: ['es2015'] },
			},
		],
	},
	//devtool: 'source-map',
};

