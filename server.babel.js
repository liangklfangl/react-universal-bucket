const fs = require("fs");
const babelrc = fs.readFileSync("./.babelrc");
let config ;

try{
	config = JSON.parse(babelrc);
}catch(err){
	console.error("你的.babelrc文件有误，请仔细检查");
	console.error(err);
}
//你可以指定ignore配置来忽略某些文件。
//https://github.com/babel/babel/tree/master/packages/babel-register
require("babel-register")(config);
//require("babel-register")会导致以后所有的.es6,.es,.js,.jsx的文件都会被babel处理