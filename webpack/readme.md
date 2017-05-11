### webpack-dev-server
这是开发环境的服务器，用于取代了webpack内置的webpack-dev-server服务器。当客户端资源发生变化以后，我们会自己重新打包。支持HMR和从内存中直接拉取资源@而且也引入了webpack-isomorphic-tools，此时他是用于client端的!目的是方便客户端的开发工具。
不要误解，虽然他也启动了服务器:
```js
app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));
//它只是为了将
```
它只是为了将资源打包到static/dist下，并保持到内存中而已。真实的服务器会从这个内存中获取资源@。那么它到底为什么要启动这个服务器呢？
```js
 output: {
      path: assetsPath,
      filename: '[name]-[hash].js',
      chunkFilename: '[name]-[chunkhash].js',
      publicPath: 'http://' + host + ':' + port + '/dist/'
    },
```
其实我们此时直接通过localhost访问这个资源是访问不到的，因为它真实是在内存中的。
所以，目前我认为它只是和webpack-dev-server扮演一样的角色，当我们的客户端资源发生变化以后它会热加载。
<pre>
webpack Dev Middleware:

It's a simple wrapper middleware for webpack. It serves the files emitted from webpack over a connect server. This should be used for development only.
翻译：就是将webpack打包产生的文件，那些存在于内存中的文件给一个服务器。但是只会在开发环境下用。而且保证每次给服务器的资源是最新的。
It has a few advantages over bundling it as files:

No files are written to disk, it handle the files in memory
If files changed in watch mode, the middleware no longer serves the old bundle, but delays requests until the compiling has finished. You don't have to wait before refreshing the page after a file modification.
I may add some specific optimization in future releases.

webpack hot middleware:

Actually making your application capable of using hot reloading to make seamless changes is out of scope, and usually handled by another library.
</pre>

### watching
注意:我们的webpack-dev-server.js是在node端运行的，所以下面的代码是错误的:
```js
const images = require("../static/logo.jpg");
//但是我们在entry文件中还是可以require引入任何东西的，这是client端的作用
//和webpack是一致的
```
