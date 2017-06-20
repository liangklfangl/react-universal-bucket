### 在最新版本的webpack-isomorphic-tools中打包出来的不包含http签前缀部分
最新版本的3.0.2不会在打包的文件前面加上http的域名前缀，但是2.2.18是可以的。其实不管是否有前缀，其打包的都是静态资源。我们通过下面的方式来完成就可以了。
```js
app.use(Express.static(path.join(__dirname, '..', 'static')));
```

### Error: Bootstrap's JavaScript requires jQuery, using Webpack
请使用bootstrap-sass-loader而不是bootstrap-sass，webpack2中必须添加loader后缀。而且bootstrap-sass-loader和bootstrap-sass两个包都存在，所以要分清楚
```js
  'bootstrap-sass-loader!./src/theme/bootstrap.config.js'
  //同时要安装sass-loader才可以
```

### 报错信息如下
 (node:6240) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: Cannot find module './src/theme/bootstrap.config.js'
先删掉isomorphic生成的json文件(webpack-assets.json)，它里面肯定有./src/theme/bootstrap.config.js。这个例子采用了".bootstraprc"文件

### wcf我传入的是dev:true
```js
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
```
所以我们的css不会被单独抽取出来作为一个文件，这个一定要弄清楚。此时css全部是通过js实现内联插入的。

### 我没有在bootstrap中导入jquery
如果你引入bootstrap一直要求到你引入jQuery，那么问题的解决方法在[这里](http://blog.csdn.net/liangklfang/article/details/53694994)。

### 网页视觉效果不好
请使用bootstrap-sass 3版本，因为react-bootstrap是基于3版本的boostrap的，否则无法解析

### dev vs pro模式
在开发环境下，我们不会使用extract-text-webpack-plugin来将css单独抽取出来。所以css是被打包到js文件中。
```json
env:
  development:
    extractStyles: false
//不会将css单独抽取到一个文件中，至于原理还没有明白
  production:
    extractStyles: true
```
上面这段代码的理解：在开发模式下没有使用extract-text-webpack-plugin，所以我们的js与css打包到一个文件中，而webpack打包后生成的代码如下:
```js
/***/ (function(module, exports, __webpack_require__) {
exports = module.exports = __webpack_require__(25)();
exports.push([module.i, "html{border:2px solid blue;background-color:pink}body{background-color:#d3d3d3;color:#000}body div{font-weight:700}body div span{font-weight:400}", "", {"version":3,"sources":["C:/Users/Administrator/Desktop/test/test/C:/Users/Administrator/Desktop/test/test/styles.less","C:/Users/Administrator/Desktop/test/test/styles.less"],"names":[],"mappings":"AAAA,KACC,sBAAA,AACA,qBAAA,CCCA,ADED,KACE,yBAAA,AACA,UAAA,CCCD,ADHD,SAII,eAAA,CCEH,ADND,cAOM,eAAA,CCEL","file":"styles.less","sourcesContent":["html{\n\tborder:2px solid blue;\n\tbackground-color:pink;\n}\n/*test项目/test/styles.sccc*/\nbody {\n  background-color: lightgray;\n  color: black;\n  div {\n    font-weight: bold;\n\n    span {\n      font-weight: normal;\n    }\n  }\n}\n","html {\n  border: 2px solid blue;\n  background-color: pink;\n}\n/*test项目/test/styles.sccc*/\nbody {\n  background-color: lightgray;\n  color: black;\n}\nbody div {\n  font-weight: bold;\n}\nbody div span {\n  font-weight: normal;\n}\n"],"sourceRoot":""}]);
 })
```
而当你在浏览器中加载该模块的时候，会自动创建一个style标签插入，所以这是我的理解！如果是生产环境下，我们的extract-text-webpack-plugin会将css单独抽取一个文件，并将文件的url地址写入到webpack-assets.json中。

### 抛出错误控制台看不到
上次dva抛出错误但是控制台看不到错误的原因就在这里。我这里将event写成了envet也是这样的。但是你依然可以继续调用event的preventDefault方法而不会抛出错误

### 我们无法选中checkbox
下面的connect写的有问题:
```js
@connect((state)=>({
  loading: state.connect.connected
}),()=>({
  //如果第二个mapDispatchToProps要修改为函数，那么可以参考InfoBar的bindActionCreator来完成
  fetch: fetchRecipes,
  toggle: toggleActive
}))
```
修改为如下的内容即可：
```js
@connect((state)=>({
  loading: state.connect.connected
}),{
  fetch: fetchRecipes,
  toggle: toggleActive
})
```
这一点一定要注意了。第二个mapDispatchToProps是一个对象，会直接将对象中每一个函数的返回值dispatch出去，而此处每一个返回值都是一个promise，所以会经过redux-thunk进行处理

### 我们的WidgetForm无法调用connect
```js
export default connect((state)=>{
  saveError :state.widgets.saveError
},dispatch=>{
  return bindActionCreator({saveWidget,editStop},dispatch);
})
```
如果调用了这个方法，那么直接无法实例化。原因找到了:
```js
@connect((state)=>{
  return {
      saveError : state.widgets.saveError
  }
},(dispatch)=>{
  return bindActionCreator({saveWidget,editStop},dispatch);
})
```
是将bindActionCreators写成了`bindActionCreator`，而react不报错!!!!!

### redux-form
redux-form在3.0.12以后无法编辑表格，因为在state.form里面你始终只会看到保存一个对象，导致一个文本框变化以后，其他的文本框都变化了。因为state.form只会保存后一个编辑的表格行作为initialValue,这一点一定要注意

### 刷新后state不会改变
也就是我们通过一定操作导致了redux的store发生变化，然后即使你刷新页面了，也是修改后的结果，这个数据的保存工作就是redux的store完成的。但是，如果你重启了应用，那么所有的store状态全部都会被重置了。

### 图片没有转化为URL，同时dataURL类型不正确
```js
    "./src/containers/About/me.png": "data:image/png;base64,bW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArICI4ZGIwZGFlYTExN2FlMWFhYzYxZjMxZDc5MWQ5YTJmOS5wbmciOw==",
```
但是，明明我们配置了如下内容啊：
```js
{
   test: webpackIsomorphicToolsPlugin.regular_expression('images'), 
   //这个images是从我们的webpack-isomorphic-tools.config.js中读取的，包含jpg,png等所有的图片
    loader: "url-loader",
    options:{
      limit:10240
    }
 }
```
最后，找出的问题是由于自己在webpackcc中配置了对于png/jpg/jpeg等加载的loader。而有了webpack-isomorphic-tools以后不用我们自己添加图片处理的loader，全部由webpack-isomorphic-tools来完成。包括客户端的图片和服务端的图片。

### ping不需要监听node_modules

### 在生产模式下一直输出下面的错误
Webpack hmr: __webpack_hmr 404 not found
解决方法：修改entry，去掉下面的webpack-hot-middleware/client，因为在我们的生成模式下是不需要热加载的:
```js
  entry: [
     'webpack-hot-middleware/client',
    'tether',
    'font-awesome-loader',
    `bootstrap-loader`,
    './src/client.js'
  ],
```
同时也要去掉下面的插件:
```js
new webpack.HotModuleReplacementPlugin()
```
### 服务端同构的图片问题
为了使得服务端能够使用图片，我们必须使用webpack-isomorphic-tools。此时图片必须在webpack中如下配置:
```js
   {
     test: webpackIsomorphicToolsPlugin.regular_expression('images'), 
     //这个images是从我们的webpack-isomorphic-tools.config.js中读取的，包含jpg,png等所有的图片
      loader: "url-loader",
      options:{
        limit:10240
      }
   }
```
但是，此时你不需要配置如下的内容，即必须要删除对于png|jpg|jpeg|gif处理的loader：
```js
{
  test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
  use: {
    loader: require.resolve('url-loader'),
    //If the file is greater than the limit (in bytes) the file-loader is used and all query parameters are passed to it.
    //smaller than 10kb will use dataURL
    options: {
      limit: 10000
    }
  }
}
```
但是仅仅去掉上面的内容依然会抛出如下错误：

{ Error: ϵͳ�Ҳ���ָ����·����
    at notFoundError (C:\Users\Administrator\Desktop\react-universal-bucket\node_modules\cross-spawn\lib\enoent.js:11:11)
    at verifyENOENT (C:\Users\Administrator\Desktop\react-universal-bucket\node_modules\cross-spawn\lib\enoent.js:46:16)
    at ChildProcess.cp.emit (C:\Users\Administrator\Desktop\react-universal-bucket\node_modules\cross-spawn\lib\enoent.js:33:19)
    at Process.ChildProcess._handle.onexit (internal/child_process.js:215:12)
  errno: 'ENOENT',
  code: 'ENOENT',
  syscall: 'spawn undefined',
  killed: false,
  stdout: '',
  stderr: 'ϵͳ�Ҳ���ָ����·����\r\n',
  failed: true,
  signal: null,
  cmd: 'C:\\Users\\Administrator\\Desktop\\react-universal-bucket\\node_modules\\pngquant-bin\\vendor\\pngquant.exe --output C:\\Users\\ADMINI~1\\A                                                        ppData\\Local\\Temp\\a84f2f05-10a9-45d0-bce6-d1e61f866c94 C:\\Users\\ADMINI~1\\AppData\\Local\\Temp\\d23c49d6-84e8-494e-b77d-be336a2afdcb --quality                                                         95-100',
  timedOut: false }
(node:7388) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 2): TypeError: Cannot read property 'hasErrors' of undefined

因此，我们必须去掉下面的代码:
```js
 new _imageminWebpackPlugin2.default({
      test: /\.(jpe?g|png|gif|svg)$/i,
      disable: isDev, Disable during development
      //https://pngquant.org/
      pngquant: {
        quality: '95-100'
      },
      optipng: null,
      gifsicle: {
        optimizationLevel: 1
      },
      //http://www.lcdf.org/gifsicle/
      jpegtran: {
        progressive: false
      }
    })
```
### ExtractTextWebpackPlugin问题
如果产生了多余的css文件，那么很可能是因为我们添加了多余的ExtractTextWebpackPlugin。所以你一定要确保我们的插件是唯一的：
```js
const program = {
    onlyCf : true,
    cwd : process.cwd(),
    dev : true,
    hook:function(webpackConfig){
         webpackConfig.plugins=webpackConfig.plugins.filter((plugin)=>{
           return omitPlugins.indexOf(plugin.constructor.name)==-1
         });
         webpackConfig.module.rules.splice(9,1);
         //我们对于webpack-isomorphic-tools-config.js指定的image中的图片全部采用了该webpack-isomorphic-tools的加载，所以webpackcc中默认的png/jpg等都要移除
         return webpackConfig;
    }
  };
```
所以，不仅仅是插件，对于Plugin,Loader等都要确保是唯一的。所以，当你打包存在问题的时候一定要检查一下我们的loader和plugin等是否出现了重复了

### 导航栏的样式存在问题
是因为我自己定义的container这个class和react-bootstrap的class同名了，将自己的class修改为app_container就可以了

