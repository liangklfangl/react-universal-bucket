const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const build = require("webpackcc/lib/build");
const devBuildConfig = require('./webpack.dev.config');
//得到webpack配置
const IP = process.env.IP || 'localhost';
const PORT = process.env.PORT || 8080;
const server = express();
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const util = require("util");
const omitPlugins = ["HtmlWebpackPlugin","ExtractTextPlugin"];
const program = {
    config:path.join(process.cwd(),"./webpack/webpack.pro.expand.config.js"),
    onlyCf : false,
    //表示会打包的，而且是watch模式
    cwd : process.cwd(),
    watch: 100,
    //监听源文件的文化100ms
    dev : false,
    //启动压缩,此时会添加如uglifyJS等,同时也会使用extract-text-webpack-plugin等抽取css到单独的文件
    //但是，这里一定要注意ExtractTextWebpackPlugin要添加两次，一次用于scss，一次用于less
    hook:function(webpackConfig){
         webpackConfig.plugins=webpackConfig.plugins.filter((plugin)=>{
           return omitPlugins.indexOf(plugin.constructor.name)==-1
         });
        webpackConfig.plugins.push(new ExtractTextWebpackPlugin({filename:'bucket-[contenthash].css'}));
        console.log("打包之前的配置为:",util.inspect(webpackConfig,{showHidden:true,depth:4}));
         return webpackConfig;
    }
  };

module.exports = build(program);