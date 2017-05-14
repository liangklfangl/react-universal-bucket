const host = (process.env.HOST || "localhost")
const port = (+process.env.PORT + 1) || 8080;
const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const exist = require('exist.js');
const assetsPath = path.resolve(__dirname, '../static/dist');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-config'));
//我们这里加入这两个模块是为了保证在服务端对于image等也可以直接require。因为nodejs
//只能智能的require.resolve我们的js模块
/**
 * 得到通用的Babel配置
 * @param  {[type]} webpackConfig [description]
 * @return {[type]}               [description]
 */
function updateCombinedBabelConfig(){
  const babelrc = fs.readFileSync(path.join(__dirname,"../.babelrc"));
  let babelrcObject ={};
  //上面读取到的是一个字符串
  try {
    babelrcObject = JSON.parse(babelrc);
  } catch (err) {
    console.error('.babelrc.文件格式不正确');
    console.error(err);
  }
  const babelrcConfig4Dev = exist.get(babelrcObject,["env","development"],{});
  //获取为development环境配置的属性
  let combinedPlugins = babelrcObject.plugins || [];
  combinedPlugins = Object.keys(babelrcConfig4Dev).length != 0? combinedPlugins.concat(babelrcConfig4Dev.plugins) : combinedPlugins;
  //当前环境本身就是开发环境，所以组合两者的plugins的集合
  const babelLoaderQuery = Object.assign({}, babelrcConfig4Dev, babelrcObject, {plugins: combinedPlugins});
  delete babelLoaderQuery.env;
  let babelReactTransformPlugin ;
  //去掉env部分，因为对webpack打包没有任何用处
  for (let i = 0; i < babelLoaderQuery.plugins.length; ++i) {
   var plugin = babelLoaderQuery.plugins[i];
   if (Array.isArray(plugin) && plugin[0] === 'react-transform') {
     babelReactTransformPlugin = plugin;
     break;
    }
  }
  //如果没有babelReactTransformPlugin,我们要手动添加
  //react-transform-hmr是为react组件可以支持热加载而设计的
  if (!babelReactTransformPlugin) {
    babelReactTransformPlugin = ['react-transform', {transforms: []}];
    babelLoaderQuery.plugins.push(babelReactTransformPlugin);
    //为babel-plugin-react-transform添加热加载插件，其实可以使用react-hot-loader来完成这个功能
    //Detailt:https://github.com/liangklfang/babel-plugin-react-transform
    babelReactTransformPlugin[1].transforms.push({
      transform: 'react-transform-hmr',
      imports: ['react'],
      locals: ['module']
    });
  }
  //更新我们的webpack的entry，添加webpack-dev-middleware让webpack支持HMR
  //上面的react-transform-hmr是为react组件可以支持热加载而设计的，也就是修改react组件后
  //不会reload页面。但是这里是让webpack本身支持HMR
  return babelLoaderQuery;
}
module.exports = {
	entry:{
	    'main': [
	      'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
        "bootstrap-webpack!./src/theme/bootstrap.config.js",
	      './src/client.js'
	    ]
	},
   output: {
      path: assetsPath,
      filename: '[name]-[hash].js',
      chunkFilename: '[name]-[chunkhash].js',
      publicPath: 'http://' + host + ':' + port + '/dist/'
      //表示要访问我们客户端打包好的资源必须在前面加上的前缀，也就是虚拟路径
    },
	plugins:[
		new webpack.DefinePlugin({
	      __CLIENT__: true,
	      __SERVER__: false,
	      __DEVELOPMENT__: true,
	      __DEVTOOLS__: true 
	       // <-------- DISABLE redux-devtools HERE
	    }),
     new webpack.IgnorePlugin(/webpack-stats\.json$/),
     //我们不会为webpack-stats.json生成文件
     //https://webpack.js.org/plugins/ignore-plugin/#components/sidebar/sidebar.jsx
     webpackIsomorphicToolsPlugin.development()
     //在webpack的development模式下一定更要调用它支持asset hold reloading!
     //https://github.com/liangklfang/webpack-isomorphic-tools
	],
   module:{
      rules:[
        { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
        { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
        { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
        {
           test: webpackIsomorphicToolsPlugin.regular_expression('images'), 
           //这个images是从我们的webpack-isomorphic-tools.config.js中读取的
           use: {
             loader: require.resolve("url-loader"),
             options:{

             }
           }
         },
           {
            test: /\.jsx$/,
            exclude :path.resolve("node_modules"),
            // 这里不能使用path.resolve("node_modules")否则webpack-merge会出现两次通过
            // babel处理的情况，是webpack-merge的bug
            // https://github.com/survivejs/webpack-merge/issues/75
            use: [{
              loader:require.resolve('babel-loader'),
              options:updateCombinedBabelConfig()
            }]
          },
            {
            test: /\.js$/,
            exclude :path.resolve("node_modules"),
            // 这里不能使用path.resolve("node_modules")否则webpack-merge会出现两次通过
            // babel处理的情况，是webpack-merge的bug
            // https://github.com/survivejs/webpack-merge/issues/75
            use: [{
              loader:require.resolve('babel-loader'),
              options:updateCombinedBabelConfig()
            }]
          }]
   }
}