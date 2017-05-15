const build = require("webpackcc/lib/build");
const path = require("path");
const fs = require("fs");
const omitPlugins = ["CommonsChunkPlugin","HtmlWebpackPlugin","ExtractTextPlugin","ImageminPlugin"];
const program = {
    onlyCf : true,
    cwd : process.cwd(),
    dev : true,
    //不启动压缩
    //在hook执行之前已经被dedupe了，此处删除不需要的插件即可。
    //在开发模式下我们要删除ExtractTextPlugin，因为我们wcf本身就不会将css单独抽取出来，所以删除
    //HtmlWebpackPlugin我们采用了服务端渲染，所以不需要自动生成html页面
    hook:function(webpackConfig){
         webpackConfig.plugins=webpackConfig.plugins.filter((plugin)=>{
           return omitPlugins.indexOf(plugin.constructor.name)==-1
         });
         return webpackConfig;
    }
  };
function getCombinedWebpackConfig(customConfigPath){
  //得到我们开发环境下的babel配置
  const absolutePath = path.resolve(process.cwd(),customConfigPath[0]);
  //第一个元素就是我们配置的扩展的webpack配置
  program.config = absolutePath;
  //const可以修改引用
  return build(program);
}


module.exports = getCombinedWebpackConfig;