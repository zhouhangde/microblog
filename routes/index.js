
//下面为生成一个路由实例用来捕获访问主页的GET请求，导出这个路由并在app.js中通过app.use('/', routes); 加载。这样，当访问主页时，就会调用res.render('index', { title: 'Express' });渲染views/index.ejs模版并显示到浏览器中

// 以下代码实现了路由的功能，我们当然可以不要 routes/index.js 文件，把实现路由功能的代码都放在 app.js 里，但随着时间的推移 app.js 会变得臃肿难以维护，这也违背了代码模块化的思想，所以我们把实现路由功能的代码都放在 routes/index.js 里。官方给出的写法是在 app.js 中实现了简单的路由分配，然后再去 index.js 中找到对应的路由函数，最终实现路由功能。我们不妨把路由控制器和实现路由功能的函数都放到 index.js 里，app.js 中只有一个总的路由接口。


var express = require('express');
var query = require('./query');
var router = express.Router();
//加入markdown依赖,express 并不直接支持markdown语法
var markdown = require('markdown-js');

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


module.exports = router;

// 详解
//----req.query ： 处理 get 请求，获取 get 请求参数
// ----req.params ： 处理 /:xxx 形式的 get 或 post 请求，获取请求参数
// ----req.body ： 处理 post 请求，获取 post 请求体
// ----req.param() ： 处理 get 和 post 请求，但查找优先级由高到低为 req.params→req.body→req.query