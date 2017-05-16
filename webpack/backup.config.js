//commonjs中require一个模块就会执行，但是webpack是不一样的，仅仅是打包
const path = require('path');
const webpack = require("webpack");
const webpackBootstrap = require("./webpack.bootstrap.config.js");
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//通过这个插件可以在webpack打包之前删除某些目录中的文件
//strip-loader是一个webpack-loader，用于从你打包的代码中移除一些函数。特别是那些你开发环境中需要的函数，但是在生产模式下
//不需要的这些函数
const BabelConfigQuery = require("webpackcc/lib/getBabelDefaultConfig");
const projectRootPath = path.resolve(__dirname, '../');
const assetsPath = path.resolve(projectRootPath, './static/dist');
// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-config'));
//此时资源会真实的打包到目录下，而不是内存中~~~
module.exports = {
    // devtool: "source-map",
    //  entry:
   // { index: 'C:/Users/Administrator/Desktop/react-universal-bucket/src/client.js',
   //   main: [ 'bootstrap-loader', './src/client.js']
   // }
    entry: [
      // 'bootstrap-webpack!./src/theme/bootstrap.config.prod.js',
      // bootstrap-webpack no one to maintain
      // 'font-awesome-webpack!./src/theme/font-awesome.config.prod.js',
       // webpackBootstrap.dev,
        'bootstrap-loader',
       //bootstrap-sass-loader to process bootstrap-sass is deprecated!!!caution! 
       //use bootstrap-loader to replace
      './src/client.js'
    ], 
  output: {
    path: assetsPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/'
  },
  module:{
    rules:[
        { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' },
        { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
        { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
        { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
         {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
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
      },{
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
            test: /\.jsx$/,
            exclude :path.resolve("node_modules"),
            // 这里不能使用path.resolve("node_modules")否则webpack-merge会出现两次通过
            // babel处理的情况，是webpack-merge的bug
            // https://github.com/survivejs/webpack-merge/issues/75
            use: [
            {
                loader:require.resolve('strip-loader'),
                options:{
                  strip:["debug","console.log"]
                }
            },
             {
              loader:require.resolve('babel-loader'),
              options:BabelConfigQuery.getDefaultBabel ()
            }]
          },
            {
            test: /\.js$/,
            exclude :path.resolve("node_modules"),
            // 这里不能使用path.resolve("node_modules")否则webpack-merge会出现两次通过
            // babel处理的情况，是webpack-merge的bug
            // https://github.com/survivejs/webpack-merge/issues/75
            use: [
             {
                loader:require.resolve('strip-loader'),
                options:{
                  strip:["debug","console.log"]
                }
             },
            {
              loader:require.resolve('babel-loader'),
              options:BabelConfigQuery.getDefaultBabel ()
            }]
          }
    ]
  },
//extract-text-plugin在pro模式下默认会添加
 plugins: [
    new ExtractTextPlugin({filename:'app.css',allChunks: true}),

   new CleanPlugin([assetsPath], { root: projectRootPath }),
   //指定需要清除的路径以及root配置
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
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
    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
    webpackIsomorphicToolsPlugin
  ]
}
