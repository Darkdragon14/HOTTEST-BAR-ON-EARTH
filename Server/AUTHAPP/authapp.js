// content of index.js
const port = 8080

const app = require('express')()
const server = require('http').createServer(app)

app.get('/login/', function(req, res){
  res.send("Parameters : " + req.query.user_id)
})

app.get('/register/', function(req, res){
  res.send("Parameters : " + req.query.user_id)
})

app.listen(port, function(){
  console.log('listening on : ' + port)
})
