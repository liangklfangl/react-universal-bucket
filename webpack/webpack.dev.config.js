const build = require("webpackcc/lib/build");
const path = require("path");
const fs = require("fs");
const program = {
    onlyCf : true,
    cwd : process.cwd(),
    dev : true,
    //不启动压缩
    //下面这个hook用于去掉commonchunkplugin
    hook:function(webpackConfig){
         const commonchunkpluginIndex = webpackConfig.plugins.findIndex(plugin => {
           return plugin.constructor.name == "CommonsChunkPlugin"
         });
         webpackConfig.plugins.splice(commonchunkpluginIndex, 1);
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