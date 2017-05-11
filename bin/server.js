#!/usr/bin/env node
require('../server.babel'); // babel registration (runtime transpilation for node)
var path = require('path');
var rootDir = path.resolve(__dirname, '..');
// 注意：.development(__DEVELOPMENT__)方法已经过期，后面要用cross-env来设计
process.env.NODE_ENV="development";
/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;  
// <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

if (__DEVELOPMENT__) {
  if (!require('piping')({
      hook: true,
      ignore: /(\/\.|~$|\.json|\.scss$)/i
    })) {
    return;
  }
}

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools-config'))
  .development(__DEVELOPMENT__)
  .server(rootDir, function() {
  //rootDir必须和webpack的context一致，调用这个方法服务器就可以直接require任何资源了
  //这个路径用于获取webpack-assets.json文件，这个是webpack输出的
  // webpack-isomorphic-tools is all set now.
  // here goes all your web application code:
  // (it must reside in a separate *.js file 
  //  in order for the whole thing to work)
  //  此时webpack-isomorphic-tools已经注册好了，这里可以写你的web应用的代码，而且这些代码必须在一个独立的文件中
    require('../src/server');
  });
