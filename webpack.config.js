const webpack = require('webpack');
const path = require('path');
require('babel-polyfill');
const autoprefixer = require('autoprefixer');
const getDefaultBabelConfig = require("webpackcc/lib/getBabelDefaultConfig");
// const bootstrapEntryPoints = require('./webpack.bootstrap.config.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//bootstrap configuration for webpack
const customFile = path.join(__dirname,"bootstrap/.bootstraprc");
// console.log(`=> bootstrap-loader configuration: ${bootstrapEntryPoints.dev}`);
// { dev: 'bootstrap-loader',
//   prod: 'bootstrap-loader/extractStyles'
//    }
//This is default  
module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    'tether',
    //https://github.com/HubSpot/tether
    //http://tether.io/
    'font-awesome-loader',
    // bootstrapEntryPoints.dev,
    `bootstrap-loader`,
    // `bootstrap-loader/lib/bootstrap.loader?extractStyles&configFilePath=${customFile}!bootstrap-loader/no-op.js`,
    //将bootstrap的配置添加到webpack的entry中
    './src/client.js',
  ],

  output: {
    path: path.join(__dirname, 'public', 'assets'),
    filename: '[name]-[hash].js',
    publicPath: '/assets/',
  },

  // devtool: '#cheap-module-eval-source-map',

  resolve: { extensions: ['*', '.js'] },
  module: {
    rules: [
    {
	          test: /\.js$/,
	          // exclude: function(path){
           //     var isNpmModule=!!path.match(/node_modules/);
           //     return isNpmModule;
           //  },
            exclude :path.resolve("node_modules"),
            //exclude node_modules folder, or we can use include config to include some path 
	          use: [{
               loader: require.resolve("babel-loader"),
               options:getDefaultBabelConfig.getDefaultBabel()
            }]
	        },
           {
            test: /\.jsx$/,
            exclude :path.resolve("node_modules"),
            // exclude: function(path){
            //    var isNpmModule=!!path.match(/node_modules/);
            //    return isNpmModule;
            // },
            //exclude node_modules folder, or we can use include config to include some path 
            use: [{
              loader:require.resolve('babel-loader'),
              options:getDefaultBabelConfig.getDefaultBabel()
            }]
          },
      {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            minimize: true,
            modules: true,
            sourceMap: 'inline',
            importLoaders: 1,
            localIdentName: '[name]__[local]__[hash:base64:5]',
          },
        },
        {
          loader:'less-loader',
          options:{
            sourceMap: 'inline'
          }
        }
      ],
    }),
  },
        {
    test: /\.less$/,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            minimize: true,
            modules: true,
            sourceMap: 'inline',
            importLoaders: 1,
            localIdentName: '[name]__[local]__[hash:base64:5]',
          },
        },
        {
          loader:'less-loader',
          options:{
            sourceMap: 'inline'
          }
        }
      ],
    }),
  },
      {
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
      {
        loader:"style-loader",
        options:{

        }
      },
        {
          loader: 'css-loader',
          options: {
            minimize: true,
            modules: true,
            importLoaders: 3,
             sourceMap: 'inline',
            localIdentName: '[name]__[local]__[hash:base64:5]'
          },
        },
        {
          loader:"postcss-loader",
          options:{
            sourceMap:true
          }
        },
        {
         loader:'sass-loader',
         options:{
         sourceMap: 'inline'
         }
        }
        // {
        //   loader: 'sass-resources-loader',
        //   options: {
        //     // resources: './app/assets/styles/app-variables.scss'
        //   }
        // }
      ],
    }),
  },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader',
      },
      // Bootstrap 4
       { test: /bootstrap\/dist\/js\/umd\//, loader: 'imports-loader?jQuery=jquery' }
      // Bootstrap 3
      // { test: /bootstrap-sass\/assets\/javascripts\//, use: 'imports-loader?jQuery=jquery' },
    ],
  },
 plugins: [
    new ExtractTextPlugin({filename:"common.css"}),
    new ExtractTextPlugin({filename:"common1.css"}),
    new ExtractTextPlugin({filename:"common2.css"}),
    new ExtractTextPlugin({filename:"common3.css"}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    //Do not forget in bootstrap version 4
    //You can use expose-loader+ProviderPlugin to expose global variables
    new webpack.ProvidePlugin({
       $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      Tether: "tether",
      "window.Tether": "tether",
      Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
      Button: "exports-loader?Button!bootstrap/js/dist/button",
      Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
      Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
      Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
      Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
      Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
      Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
      Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
      Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
      Util: "exports-loader?Util!bootstrap/js/dist/util"
    }),
    new webpack.LoaderOptionsPlugin({
      postcss: [autoprefixer],
    }),
  ]
};
