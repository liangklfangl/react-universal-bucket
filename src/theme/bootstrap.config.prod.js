const loader = require('extract-text-webpack-plugin').extract({ 
	fallback: 'style-loader', 
	use: 'css-loader?sourceMap!less-loader?sourceMap'
})

bootstrapConfig.styleLoader=loader;
module.exports = bootstrapConfig;
