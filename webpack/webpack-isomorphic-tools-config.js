var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const util = require("util");
// see this link for more info on what all of this means
// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
module.exports = {

  // when adding "js" extension to asset types 
  // and then enabling debug mode, it may cause a weird error:
  //
  // [0] npm run start-prod exited with code 1
  // Sending SIGTERM to other processes..
  //
  debug: false, 
  //如果设置为true，那么会在console中打印调试信息
  //(1) port:8888
  // 如果设置了port，那么就是启动一个使用该port的HTTP服务器，其负责处理对于webpack资源的请求
  // 但是必须安装express。在这种情况下，我们的webpack-assets.json不会写到磁盘中，而是一直保持到
  // 内存中，就像webpack-dev-server一样。但是只有在开发模式下有用
  // (2)verbosity配置
  // 如果设置为'no webpack stats'，那么在开发环境下不会有任何webpack打包状态输出，此时error和warning都不会输出
  // 如果设置为'webpack stats for each build'，那么在开发模式下，增量打包的情况下，会打印webpack的打包状态到控制台中。
  // 如果不设置(默认是undefined)，那么采用默认值，此时在开发环境下，只会在第一次打包的时候将webpack的打包状态输出到console中
  //(3)patch_require: true, // is false by default
  //此时支持require.context与require.ensure函数，默认情况下是关闭的。这样可以避免不必要的代码操控
  //(4)webpack_assets_file_path: 'webpack-assets.json',
  //默认情况下我们会在webpack的context配置指定的路径下生成webpack-assets.json。你可以通过这个配置来
  //改变该文件的路径和文件名。这里的路径是相对于我们的webpack的context配置的
  //(5) webpack_stats_file_path: 'webpack-stats.json'
  //默认情况下，在debug模式下，它会创建一个webpack-stats.json(路径是通过webpack的context配置指定的)
  //可以通过该配置该修改文件名和路径名
  //(6) alias: webpack_configuration.resolve.alias
  //使用这个配置来让我们的`webpack-isomorphic-tools`知道webpack的alias配置，这个值必须和webpack的resolve.alias
  //相同，默认是空对象
  //(7)modulesDirectories: webpack_configuration.resolve.modulesDirectories
  //如果你使用了webpack的resolve.modulesDirectories，那么你应该配置这个选项，必须和webpack的配置一致。默认是
  //["node_modules"]
  //(8)其中assets就是为了配置你的文件类型以及相应的处理方式(images,fonts,svg不会出现在webpack-assets.json)
  //其中"assets"会出现在webpack-assets.json并作为key
  //通过webpackIsomorphicTools.assets()来获取到我们的webpack-assets.json中的内容
  //webpack配置中使用webpackIsomorphicToolsPlugin.regular_expression('images')
  assets: {
    //处理图片
    images: {
      extensions: [
        'jpeg',
        'jpg',
        'png',
        'gif'
      ],
      //这里指定了那些文件类型属于我们的images这种类型，如果只有一种文件类型那么可以使用extension配置
      //这里的images这种类型在webpack配置为regular_expression('images')
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    //处理字体文件
    fonts: {
      extensions: [
        'woff',
        'woff2',
        'ttf',
        'eot'
      ],
      //其中后缀为woff等属于字体类型
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    //处理svg类型
    svg: {
      extension: 'svg',
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    // this whole "bootstrap" asset type is only used once in development mode.
    // the only place it's used is the Html.js file
    // where a <style/> tag is created with the contents of the
    // './src/theme/bootstrap.config.js' file.
    // (the aforementioned <style/> tag can reduce the white flash 
    //  when refreshing page in development mode)
    //
    // hooking into 'js' extension require()s isn't the best solution
    // and I'm leaving this comment here in case anyone finds a better idea.
    bootstrap: {
      extension: 'js',
      //在include里面你必须手动指定path，只有在include里面的文件才会被webpack-isomorphic-tools处理
      //这里的路径和webpack中的context一致，同时支持正则表达式，同时include也支持一个函数，如
      //function (path){return false/true}
      include: ['./src/theme/bootstrap.config.js'],
      filter: function(module, regex, options, log) {
        function is_bootstrap_style(name) {
          return name.indexOf('./src/theme/bootstrap.config.js') >= 0;
        }
        if (options.development) {
          return is_bootstrap_style(module.name) && WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);
        }
        // no need for it in production mode
      },
      // in development mode there's webpack "style-loader",
      // so the module.name is not equal to module.name
      path: WebpackIsomorphicToolsPlugin.style_loader_path_extractor,
      parser: WebpackIsomorphicToolsPlugin.css_loader_parser
    },
    //如果你使用webpack的`css modules`特性，同时在production模式下你使用了ExtractTextPlugin，你可以如下配置
    //注意：目前我的调试获取到配置为{dev:true}，所以是development即开发环境，在开发环境下我是不会使用ExtractTextPlugin
    //所以我在hook中也删除了这个插件
    style_modules: {
      extensions: ['less','scss'],
      filter: function(module, regex, options, log) {
        if (options.development) {
          //开发模式下，我们使用了style-loader,导出的module.name是这种类型:./~/less-loader/stringify.loader.js!./~/bootstrap/less/alerts.less
          //所以此处不要使用默认的filter函数
          return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);
        } else {
          // in production mode there's no webpack "style-loader",
          // so the module.name will be equal to the asset path
          // 在生产模式下，没有style-loader，所以module.name和资源路径是一样的
           // console.log("生成环境下module.name----",module.name);
          return regex.test(module.name);
        }
      },
      //path的作用：将css-loader创建的模块module.name模块转化为正确的资源路径
      path: function(module, options, log) {
        if (options.development) {
          // in development mode there's webpack "style-loader",
          // so the module.name is not equal to module.name
          return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log);
        } else {
          // in production mode there's no webpack "style-loader",
          // so the module.name will be equal to the asset path
          return module.name;
        }
      },
      //如何将webpack中模块的javascript源代码抽取出来，其实就是处理module.source，同时修改module.exports
      parser: function(module, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log);
        } else {
          // in production mode there's Extract Text Loader which extracts CSS text away
          return module.source;
        }
      }
    }
  }
}
