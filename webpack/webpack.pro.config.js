const build = require("webpackcc/lib/build");
const path = require("path");
const omitPlugins = ["HtmlWebpackPlugin"];

const customConfigPath = process.argv.splice(2);
const util = require("util");
const program = {
    onlyCf : false,
    //表示会打包的，而且是watch模式
    cwd : process.cwd(),
    watch: 100,
    //监听源文件的文化100ms
    dev : false,
    //启动压缩,此时会添加如uglifyJS等,同时也会使用extract-text-webpack-plugin等抽取css到单独的文件
    hook:function(webpackConfig){
         webpackConfig.plugins=webpackConfig.plugins.filter((plugin)=>{
           return omitPlugins.indexOf(plugin.constructor.name)==-1
         });
         return webpackConfig;
    }
  };

const absolutePath = path.resolve(process.cwd(),customConfigPath[0]);
  //第一个元素就是我们配置的扩展的webpack配置
program.config = absolutePath;
 //const可以修改引用
const webpackConfig = build(program);
//得到最终的webpack配置
module.exports = webpackConfig; 
