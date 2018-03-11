var mysql = require('mysql') ;                                                                                      
  //connection config
  var connection = mysql.createConnection({
    host : 'localhost' ,
    user : 'root' ,
    password : '123456' ,
    database : 'my_box'
 });
 function User(user){
   this.username = user.username ;
   this.password = user.password ;
 }
 User.getUserbyUsername = function(username,callback){
   var selectSql = 'select * from user_info where username = ?' ;
   connection.query(selectSql,[username],function(err,res){
     if(err){
       console.log('getUserbyUsername err:' + err) ;
       return ;
     }
     console.log('Get name success') ;
     callback(err,res) ;
   }) ;
 } ;
 module.exports = User ;
