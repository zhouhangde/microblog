
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
//返回的是一个RedisClient的对象
PDS_PORT = 6379,
PDS_HOST = '127.0.0.1', 
//设置的密码--对应redis的密码，默认redis无密码
PDS_PWD = '123',
// PDS_OPTS = {auth_pass:PDS_PWD},
PDS_OPTS ={},
// 传参用于连接远程的redis服务器，或者利用第三个参数进行一些配置！
client  = redis.createClient(PDS_PORT, PDS_HOST,PDS_OPTS);

// ready是Connection事件之一，当与redis服务器连接成功后会触发这个事件，一切准备就绪后按顺序调用
client.on("ready", function(error) {
   if (error) {
     console.log('redis连接失败');
     return;
   };
});

client.on("end", function(error) {
   if (error) {
     console.log('redis连接关闭失败');
     return;
   };
});

client.on("connect", function() {
   var key = 'skills';
  //  集合操作，向集合key中添加N个元素，已存在元素的将忽略；redis2.4版本前只能添加一个值
   client.sadd(key,"c#");
   client.sadd(key,"nodejs");
   client.sadd(key,"MYSQL");
  //  client.multi([commands])：这个标记一个事务的开始，由Multi.exec原子性的执行；github上描述是可以理解为打包，把要执行的命令存放在队列中，redis服务器会原子性的执行所有命令，node_redis接口返回一个Multi对象
  // Multi.exec( callback )：执行事务内所有命令；github上描述是client.multi()返回一个Multi对象，它包含了所有命令，直到Multi.exec()被调用；
  // sismember(key,value,[callback])元素value是否存在于集合key中，存在返回1，不存在返回0
  // smembers(key,[callback])：返回集合 key 中的所有成员，不存在的集合key也不会报错，而是当作空集返回
   client.multi().sismember(key,"c#").smembers(key).exec(function(err,replies){
       console.log("muili get "+replies.length+" replies");
       replies.forEach(function(reply,index){
        //  分别输出两个回应的结果！
         console.log("reply "+index+":"+reply.toString());
       })
      //  与之对应的还有一个client.end()方法，相对比较暴力；client.quit方法会接收到所有响应后发送quit命令，而client.end则是直接关闭；都是触发end事件
       client.quit();
   });
});

client.auth(PDS_PWD, function(err){
   if (err) {
     console.log('redis密码不正确');
     return;
   };
});

// redis 链接错误
client.on("error", function(error) {
    console.log(error);
});



//写入JavaScript(JSON)对象
  // client.hmset('sessionid', { username: 'kris', password: 'password' }, function(err, data) {
  //   if (err) throw err;
  // })

//读取JavaScript(JSON)对象
// client.hgetall('sessionid', function(err, object) {
//   if (err) {
//      console.log('读取JavaScript(JSON)对象失败');
//      return;
//    };
// })

//不设置client.options.no_ready_check的情况下，客户端触发connect同时它会发出ready，如果设置了client.options.no_ready_check，当这个stream被连接时会触发connect，
// client.on("connect", function() {
//   //设置单个key和value，回调函数可选
//     client.set('author','wilson',redis.print);
//     //得到key得到value，回调函数可选
//     //redis.print：简便的回调函数，测试时显示返回值
//     client.get('author',redis.print);
// });

// client.on("connect", function() {
//   //设置单个key和value，回调函数可选
//     client.hmset('short',{'js':'javascript','c#':'c Sharp'},redis.print);
//     //得到key得到value，回调函数可选
//     //redis.print：简便的回调函数，测试时显示返回值
//     client.hmset('short','SQL','Strapt Query','HTML','Hypery',redis.print);
//     client.hgetall("short",function(err,res){
//         if(err){
//           console.log(err);
//           return;
//         }
//         //用于显示一个对象所有的属性和方法
//         console.dir(res);
//     });
// });

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

//1引入事件模块，系统自带的
var events = require('events');

//2创建EventEmitter对象
var myEmitter =new events.EventEmitter();

//3注册事件（下面为同步的）
// myEmitter.on('someEvent',function(msg){
//     console.log(msg);
// });

//3注册事件（下面为异步的，会先打印1，再执行msg）
// myEmitter.on('someEvent',function(msg){
//   //es6的箭头函数
//     setImmediate(()=>{
//        console.log(msg);
//     });
// });

//4触发事件
// myEmitter.emit('someEvent','我是传过去的参数，我可以不传，msg可以没有');
// console.log(1);

//文件系统
//1.引入文件系统模块
var fs = require('fs');
// // 2.通过对象调用方法(同步),默认读取的为buffer，一般需转化为utf8
var readMe = fs.readFileSync('read.txt','utf8');  //同步读取
console.log(readMe);


fs.writeFileSync('write.txt',readMe);





module.exports = router;

// 详解
//----req.query ： 处理 get 请求，获取 get 请求参数
// ----req.params ： 处理 /:xxx 形式的 get 或 post 请求，获取请求参数
// ----req.body ： 处理 post 请求，获取 post 请求体
// ----req.param() ： 处理 get 和 post 请求，但查找优先级由高到低为 req.params→req.body→req.query