(function() {
  var mysql = require('mysql');
  // var session = require('cookie-session');
  var query = (sql,key) => {
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root123',
      database: 'm_users'
    });
    connection.connect();
    var promise = new Promise((resolve,reject)=>{
      connection.query(sql,[key], function(error, results, fields) {
        if(error){
          reject(error)
        }else{
          resolve(results);
        }
      });
      connection.end();
    });
    return promise;
  }
  module.exports = query;
})()