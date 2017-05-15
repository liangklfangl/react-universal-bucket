 #### 1.该webpack-isomorphic-tools本质上是webpack的插件
 通过打印webpack的配置plugins,我们可以看到如下的内容:
 ```js
 Plugin {
    //其中webpack2中的options就是我们在该插件的config文件中配置的这个对象
    options:
     { debug: false,
        //debug配置
       assets:
        { images: [Object],
          fonts: [Object],
          svg: [Object],
          bootstrap: [Object],
          style_modules: [Object] 
          },
      //assets配置
       webpack_assets_file_path: 'webpack-assets.json',
       //webpack_assets_file_path配置
       webpack_stats_file_path: 'webpack-stats.json',
       development: true 
       },
    //log是一个Log对象
    log:
     Log {
       options: { debug: false },
       preamble: '[webpack-isomorphic-tools/plugin]' 
     },
     //该对象有一个regular_expressions方法
    regular_expressions:
     { images: { /\.(jpeg|jpg|png|gif)$/ [lastIndex]: 0 },
       fonts: { /\.(woff|woff2|ttf|eot)$/ [lastIndex]: 0 },
       svg: { /\.svg$/ [lastIndex]: 0 },
       bootstrap: { /\.js$/ [lastIndex]: 0 },
       style_modules: { /\.(less|scss)$/ [lastIndex]: 0 } 
       },
   //该对象有一个regularExpressions方法
    regularExpressions:
     { images: { /\.(jpeg|jpg|png|gif)$/ [lastIndex]: 0 },
       fonts: { /\.(woff|woff2|ttf|eot)$/ [lastIndex]: 0 },
       svg: { /\.svg$/ [lastIndex]: 0 },
       bootstrap: { /\.js$/ [lastIndex]: 0 },
       style_modules: { /\.(less|scss)$/ [lastIndex]: 0 }
    } 
}
```
该plugin有options对象表示配置，log配置是一个Log对象，regular_expressions与regularExpressions