const http = require('http');
const toMysql = require('./toMysql.js');


http.createServer( (req, res)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.writeHead( 200, {'Content-Type': 'text/plain'});
  const method = req.method;
  if( method === 'POST' ){
    var postData = '';
    req.on('data', (chunk)=>{
      postData += chunk;
    })
    req.on('end', ()=>{
      var reqData = JSON.parse( postData );
      var item = [];
      item.push( reqData.id, reqData.title, reqData.content, reqData.date );
      var addSql = 'INSERT INTO blog(id,title,content,date) VALUE(?,?,?,?)';
      toMysql.query( addSql, item );
    })
  }
  res.end();
} ).listen( 8000, '127.0.0.2' );
console.log('server running in 127.0.0.2:8000');
