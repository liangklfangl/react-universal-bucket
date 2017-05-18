const Express = require("express");
const customConfigPath = process.argv.splice(2);
const webpackWath = require("webpackcc/lib/webpackWatch");
//得到用户自己配置的webpack文件
const webpackConfig = require("./webpack.dev.config.js")(customConfigPath);
//这是最终得到的webpack配置
const util = require("util");
const path = require("path");
const webpack = require("webpack");
console.log(util.inspect(webpackConfig,{showHidden:true,depth:3}));
// const output = path.join(__dirname, '../dist').replace(/\\/g, '/');
// console.log("webpack打包完成",output);
// webpackConfig.output.path=(process.cwd().replace(/\\/g, '/')+"/build");
const compiler = webpackWath(webpackConfig,{watch:false});
const host = process.env.HOST || 'localhost';
const port = (Number(process.env.PORT) + 1) || 8080;
const serverOptions = {
  contentBase: 'http://' + host + ':' + port,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  // headers: {'Access-Control-Allow-Origin': '*'},
  stats: {colors: true}
};
const app = new Express();
app.use(require("webpack-dev-middleware")(compiler,serverOptions));
app.use(require("webpack-hot-middleware")(compiler));
//webpack-dev-middleware是从内存中取数据，此时webpack不会将数据写到disk
//webpack-hot-middleware是让webpack本身支持HMR
app.listen(port,function onAppListening(err){
	if(err){
		console.err(err);
	}else{
		    console.info('Webpack开发环境服务器在端口号%s监听', port);
		}
});
