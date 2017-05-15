### 1.下面是我们的配置style_modules,并且在开发环境下
```js
 style_modules: {
      extensions: ['less','scss'],
      filter: function(module, regex, options, log) {
        if (options.development) {
          console.log("开发环境下module.name----",module.name);
          return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);
        } else {
          // in production mode there's no webpack "style-loader",
          // so the module.name will be equal to the asset path
          return regex.test(module.name);
        }
      },
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
      parser: function(module, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log);
        } else {
          // in production mode there's Extract Text Loader which extracts CSS text away
          return module.source;
        }
      }
}
```
注意：此时传入到filter中的module会包含所有的js/less等所有的文件，而不仅仅是less/scss文件。下面只是less文件的截图

```js
./~/less-loader/stringify.loader.js!./~/bootstrap/less/alerts.less
./~/less-loader/stringify.loader.js!./~/bootstrap/less/badges.less
./~/less-loader/stringify.loader.js!./~/bootstrap/less/breadcrumbs.less
./~/less-loader/stringify.loader.js!./~/bootstrap/less/button-groups.less
./~/less-loader/stringify.loader.js!./~/bootstrap/less/buttons.less
./~/less-loader/stringify.loader.js!./~/bootstrap/less/carousel.less
./~/less-loader/stringify.loader.js!./~/bootstrap/less/close.less
./~/less-loader/stringify.loader.js!./~/bootstrap/less/code.less
./~/less-loader/stringify.loader.js!./~/bootstrap/less/component-animations.less
./~/less-loader/stringify.loader.js!./~/bootstrap/less/scaffolding.less
./~/less-loader/stringify.loader.js!./~/bootstrap/less/tables.less
./~/less-loader/stringify.loader.js!./~/bootstrap/less/thumbnails.less
./~/less-loader/stringify.loader.js!./~/bootstrap/less/tooltip.less
./~/less-loader/stringify.loader.js!./~/bootstrap/less/type.less
./~/less-loader/stringify.loader.js!./~/bootstrap/less/utilities.less
./~/less-loader/stringify.loader.js!./~/bootstrap/less/variables.less
./~/less-loader/stringify.loader.js!./~/bootstrap/less/wells.less
./~/less-loader/stringify.loader.js!./src/theme/bootstrap.config.less
```
所以开发环境下module.name是一个文件路径，而且对less/scss文件进行处理的loader路径也加上了