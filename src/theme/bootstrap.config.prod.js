const path = require("path");
const bootstrapConfig = require('./bootstrap.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
bootstrapConfig.styleLoader = ExtractTextPlugin.extract({ 
	fallback: 'style-loader', 
	use: 'css-loader?sourceMap!sass-loader?sourceMap'
});
module.exports = bootstrapConfig;

