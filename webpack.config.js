'use strict';

const webpack = require('webpack');

module.exports = {
	//context: __dirname + '/',
	entry: './index.js',
	output: {
		path: __dirname,
		libraryTarget: 'var',
		library: 'ConfettiCannon',
		filename: 'bundle.js',
	},
	//module: {
		//loaders: [
			//{ test:  /\.json$/, loader: 'hson' },
			//{ test:  /\.s?css$/, loaders: ['style', 'css?sourceMap', 'sass'] },
			//{ // ES6 support.
				//test:  /\.js$/,
				//loader: 'babel',
				//exclude: /node_modules/,
				//query: { presets: ['es2015'] },
			//},
		//],
		//preLoaders: [],
	//},
	//devtool: 'source-map',
};

