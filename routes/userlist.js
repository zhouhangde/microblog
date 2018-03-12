var express = require('express');
var query = require('./query');
var router = express.Router();
//加入markdown依赖,express 并不直接支持markdown语法
var markdown = require('markdown-js');
// module.exports.userlist = function(req, res) {    
//             res.render('list',{    
//                 items:[1988,'David','birthday','HelloWorld'],  
//                 layout:'userlistLayout'  //调用到userlistLayout.ejs模板    
//             });    
//         };

router.get('/userlist', function (req, res) {
  res.render('list', {
    items:[1988,'David','birthday','HelloWorld'],  
    layout:'userlistLayout'  //调用到userlistLayout.ejs模板   
  });    
});


module.exports = router;

