var mysql = require('mysql');
var pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'blogBase'
})

exports.query = function (selectSql, params, callback){
  pool.getConnection( function(err, con){
    if( err ){
      //do something
      return;
    }
    con.query(selectSql, params, function(cerr, rsl, fields){
      if( cerr ){
        //do something
        return;
      }
      if( typeof callback === 'function' ){
        callback(rsl);
      }
    });
  } )
}

var callback = function( rsl ){
  console.log(rsl);
}

//增
var addSql = 'INSERT INTO blog(id,title,content,date) VALUE(?,?,?,?)';
var addParams = [001, '关于nodejs操作mysql的示例', '代码如下...', '2018-05-05'];
// query( addSql, addParams, callback );

//改
var updateSql = 'UPDATE blog Set title = ?, content = ?, date = ? WHERE id = ?';
var updateParams = ['重新设置一下标题', '内容还是不变', '2018-05-05', 1];
// query( updateSql, updateParams, callback );

//查
var selectSql = 'SELECT * FROM blog';
// query( selectSql, null, callback );

//删
var deleteSql = 'DELETE FROM blog WHERE id = 1';
// query( deleteSql, null, callback )
