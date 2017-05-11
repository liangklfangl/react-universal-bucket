#!/usr/bin/env node
if (process.env.NODE_ENV !== 'production') {
  if (!require('piping')({
    hook: true,
    ignore: /(\/\.|~$|\.json$)/i
  })) {
    return;
  }
}
require('../server.babel'); 
//为我们的node代码注册babel，用于在代码执行的时候对代码进行转换
// babel registration (runtime transpilation for node)
require('../api/api');
