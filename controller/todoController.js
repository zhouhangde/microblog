//将todeController暴露给index.js,参数router，即index.js中router实例
module.exports =function(router){
    var mongoose = require('mongoose');
        //链接数据库
    mongoose.connect('mongodb://localhost:27017/runoob');
    //创建图表
    var todoSchema = new mongoose.Schema({
        item:String
    });
    //往数据库中存储数据
    //数据库会将Todo变成小写并且后面加上一个s
    var Todo =mongoose.model('Todo',todoSchema);
    // Todo({item:'Hello Every'}).save(function(err,data){
    //     if (err) throw err;
    //     console.log("插入成功");
    // })

    // var data = [
    //     {item:"欢迎大家进入蓝欧课堂"},
    //     {item:"希望大家加入蓝欧课堂"},
    //     {item:"在课本中能学到新知识"}
    //     ];

   //获取数据
   router.get('/todo',function(req,res){
    //    res.send(req.url);
    //    res.render('todo',{todos:data});
    //find为查询的方法，{}为查找的内容即找到所有数据库中信息，暂时设置为空  
            Todo.find({},function(err,data){
                if(err) throw err;
                res.render('todo',{todos:data})
        })
   })

   //传递数据
    //    由于app.js中app.use(bodyParser.urlencoded({ extended: false }));
    // var urlencoded =bodyParser.urlencoded({ extended: false });
    //因而不需要徐成router.post('/todo',urlencoded，function(req,res){
    //        console.log(req.body);
    //    })
   router.post('/todo',function(req,res){
    //    console.log(req.body);
      Todo(req.body).save(function(err,data){
          if(err) throw err;
          res.json(data);
      })
   })

   //删除数据
   router.delete('/todo/:item',function(req,res){
       //filter函数循环data数组里面的每一个值，如果存在就去掉，最后返回新的数组
       //remove为数据库的删除方法
       Todo.find({item:req.params.item}).remove(function(err,data){
           if(err) throw err;
           res.json(data);
       })
        //  data=data.filter(function(todo){
        //       return req.params.item !==todo.item;
        //  });
        //  //返回json数据
        //  res.json(data);
   });


}
