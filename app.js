var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//引入cors包,cors 安全，自定义用于跨域
var cors = require('cors');

var index = require('./routes/index');
var users = require('./routes/users');

//文件写入控制的模块
var fs = require('fs');  
//让Express渲染markdown文件
var markdown = require('markdown-js'); 

//生成一个express实例 app
var app = express();


//设置 views 文件夹为存放视图文件的目录, 即存放模板文件的地方,__dirname 为全局变量,存储当前正在执行的脚本所在的目录
app.set('views', path.join(__dirname, 'views'));
//设置视图模板引擎为 ejs。
app.set('view engine', 'ejs');

// 设置/public/favicon.ico为favicon图标
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//加载日志中间件。
app.use(logger('dev'));
//加载解析json的中间件
app.use(bodyParser.json());
//加载解析urlencoded请求体的中间件。
app.use(bodyParser.urlencoded({ extended: false }));
//加载解析cookie的中间件。
app.use(cookieParser());
//设置public文件夹为存放静态文件的目录
app.use(express.static(path.join(__dirname, 'public')));

//路由控制器。
app.use('/', index);
app.use('/users', users);

//监听端口4100，默认为3000(其实一直在开启3000)
// var server = app.listen(4100,()=>{
//   console.log('success')
// })

//跨域支持
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


// 捕获404错误，并转发到错误处理器。
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//开发环境下的错误处理器，将错误信息渲染error模版并显示到浏览器中。
// if (app.get('env') === 'development') {  
//     app.use(function(err, req, res, next) {  
//         res.status(err.status || 500);  
//         res.render('error', {  
//             message: err.message,  
//             error: err  
//         });  
//     });  
// } 

//生产环境下的错误处理器，将错误信息渲染error模版并显示到浏览器中。
// app.use(function(err, req, res, next) {  
//     res.status(err.status || 500);  
//     res.render('error', {  
//         message: err.message,  
//         error: {}  
//     });  
// }); 


// 默认写法综合上面两个的写法。
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//给Express注册Markdown渲染器
app.engine('md', function(path, options, fn){    
  fs.readFile(path, 'utf8', function(err, str){    
    if (err) return fn(err);    
    str = markdown.parse(str).toString();    
    fn(null, str);    
  });    
});  


app.use(cors({
   //允许这个域的访问，只有http://localhost：8080可以访问请求，其他都为跨域，安全，需要启动一个本地服务
    origin:['http://localhost:8080'],
   //只允许get和post请求
    methods:['GET','POST'],
    //只允许带这两种请求头的连接访问
    alloweHeaders:['Conten-Type', 'Authorization']
}));

///跨域中间件/
// app.all("*",function(req, res, next) {
//     res.setHeader("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By",' 3.2.1');
    // res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });

//导出app实例供其他模块调用
module.exports = app;
