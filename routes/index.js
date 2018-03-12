
//下面为生成一个路由实例用来捕获访问主页的GET请求，导出这个路由并在app.js中通过app.use('/', routes); 加载。这样，当访问主页时，就会调用res.render('index', { title: 'Express' });渲染views/index.ejs模版并显示到浏览器中

// 以下代码实现了路由的功能，我们当然可以不要 routes/index.js 文件，把实现路由功能的代码都放在 app.js 里，但随着时间的推移 app.js 会变得臃肿难以维护，这也违背了代码模块化的思想，所以我们把实现路由功能的代码都放在 routes/index.js 里。官方给出的写法是在 app.js 中实现了简单的路由分配，然后再去 index.js 中找到对应的路由函数，最终实现路由功能。我们不妨把路由控制器和实现路由功能的函数都放到 index.js 里，app.js 中只有一个总的路由接口。


var express = require('express');
var query = require('./query');
var router = express.Router();
//加入markdown依赖,express 并不直接支持markdown语法
var markdown = require('markdown-js');

//mongodb
var mongoose = require('mongoose');
// var site = require('../database/db').site;

/* 这段代码的意思是当访问主页时，调用 ejs 模板引擎，来渲染 index.ejs 模版文件（即将 title 变量全部替换为字符串 Express），生成静态页面并显示在浏览器中 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/fendo', function (req, res) {  
  res.send('hello,world!');  
});  

router.get('/login', function (req, res) {  
  var logindata = { 
    title: 'Express',
    userName:'',
    password:''
  }
  res.render('login',logindata); 
}); 

//登录
router.post('/login',(req,res)=>{
  var opts = req.body;
  query(" SELECT *FROM `v_users` WHERE userAcount = ?",opts.userName).then((result)=>{
    var response = result[0];
    if(opts.password !== response.u_password){
      return res.send({
        errorCode:'404',
        errorMsg:'登录密码错误'
      })
    }
    //模拟生成loginToken
    var loginToken = response.userAcount + Math.random()*Math.pow(10,16)
    res.send({
      loginToken:loginToken
    })
  })
})



//markdown.markHtml(); 是将markdown格式的字符转换成Html
// 当用户从浏览器访问这个页面的时候，输出一个指向JavaEye的超链接:
// markdown 字符串:
// router.get('/markdown', function(req, res) {    
//     var html = markdown.makeHtml("[fendo](http://blog.csdn.net/u011781521?viewmode=contents \"Click\") ");    
//     res.send(html)    
//     res.end();    
// });

router.get('/markdown', function(req, res) {    
   res.render('index.md',{layout:false});  
});

//在index.js中添加url处理代码,将/blogs/*.html的url, 映射到markdown文件
router.get('/blogs/:title.html', function(req, res, next) {    
    var path = [    
        'blogs/',    
        req.params.title, '.md'    
    ].join('');    
        
    console.log(path)    
    res.render(path, {layout: false});    
})  


var items=[{title:'文章1'},{title:'文章2'}];  
/* GET home page. */  
router.get('/demo', function(req, res, next) {  
  res.render('demo',{title:'文章列表',items:items});  
});  
  
router.get('/form', function(req, res, next) {  
   res.render('form',{title:'文章列表',message:'fendo8888'});  
});  
  
router.post('/form', function(req, res, next) {  
  res.redirect('/demo');  
});  

//此处为后端假数据，没有访问数据库，我只让返回了一个json对象
///first域名前后端是可以共享的

router.post('/first', function(req, res, next) {
  res.json({name:'aaa',pwd:'123'});
});

//css内部样式和内联样式都可以在网页上看到效果，但是外链的css和js不会有效果，javascript同样。
//一个网页的内容其实就是一段字符串，response.write()可以接受一个字符串作为参数，所以很明显只需要把一个网页的内容作为参数传递给response.write()即可
router.get('/article', function(req, res, next) {
  var html = '<html>'  
        +'<head>'  
        +'<title>nodejs</title>'  
        +'<style type="text/css">'  
        +'body{color:red;}'  
        +'</style>'  
        +'</head>'  
        +'<body>'  
        +   'hello world! 1234'  
        +'</body>'  
        +'</html>';  
        res.writeHead(200,{'Content-Type' : 'text/html'});  
        res.write(html);  
        res.end();  
});

//必须有reg.ejs文件（里面可以为空），同时必须有template文件
router.get('/reg', function (req, res) {
  res.render('reg', {
    title: '用户注册',
    // layout如果不指定 默认就会使用layout.ejs 作为默认布局文件
    layout: 'template'
  });    
});



// monnpm install hiredis redis




// var conn = mongoose.connect.openUri('mongodb://127.0.0.1:27017/runoob');
// var User = new mongoose.Schema({
//     name: String,
//     url: String
// });
// var myModel = conn.model('sites', User);


// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";
//  var datas  = new Array();
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("runoob");
//     dbo.collection("site"). find({}).toArray(function(err, result) { // 返回集合中所有数据
//         if (err) throw err;
//         console.log(result);
//         datas.push(result);
//         console.log(datas);
//         db.close();
//     });
// });




// 创建数据库，表，及表格数据
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";
 
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("runoob");
//     var myobj = { name: "菜鸟教程", url: "www.runoob" };
//     dbo.collection("sites").insertOne(myobj, function(err, res) {
//         if (err) throw err;
//         console.log("文档插入成功");
//         db.close();
//     });
// });

var redis = require("redis"),
client  = redis.createClient('6379', '127.0.0.1',{});

// redis 链接错误
client.on("error", function(error) {
    console.log(error);
});



//写入JavaScript(JSON)对象
client.hmset('sessionid', { username: 'kris', password: 'password' }, function(err, data) {
  if (err) throw err;
})

//读取JavaScript(JSON)对象
client.hgetall('sessionid', function(err, object) {
  console.log(object)
})

// exports.throw = function(bottle,callback){
//     bottle.time = bottle.time || Date.now();
//     var bottleId = Math.random().toString(16);
//     var type = {male:0,female:1};
//     console.log(type[bottle.type]);
//     /*client.SELECT选择数据库编号*/
//     client.SELECT(type[bottle.type],function(){
//         /*client.HMSET 保存哈希键值*/
//         client.HMSET(bottleId,bottle,function(err,result){
//             if(err){
//                 return callback({code:0,msg:"过会儿再来试试吧！"});
//             }
//             callback({code:1,msg:result});
//             /*设置过期时间为1天*/
//             client.EXPIRE(bottleId,86400);
//         });
//     });
// }

// exports.pick = function(info,callback){
//     var type = {all:Math.round(Math.random()),male:0,female:1};
//     info.type = info.type || 'all';
//     client.SELECT(type[info.type],function(){
//         /*随机返回当前数据库的一个键*/
//         client.RANDOMKEY(function(err,bottleId){
//             if(!bottleId){
//                 return callback({code:0,msg:"大海空空如也..."});
//             }
//             /*根据key返回哈希对象*/
//             client.HGETALL(bottleId,function(err,bottle){
//                 if(err){
//                     return callback({code:0,msg:"漂流瓶破损了..."});
//                 }
//                 callback({code:1,msg:bottle});
//                 /*根据key删除键值*/
//                 client.DEL(bottleId);
//             });
//         });
//     });
// }

module.exports = router;

// 详解
//----req.query ： 处理 get 请求，获取 get 请求参数
// ----req.params ： 处理 /:xxx 形式的 get 或 post 请求，获取请求参数
// ----req.body ： 处理 post 请求，获取 post 请求体
// ----req.param() ： 处理 get 和 post 请求，但查找优先级由高到低为 req.params→req.body→req.query