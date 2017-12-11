// content of index.js
const port = 8080

const app = require('express')()
const server = require('http').createServer(app)

var connected = []

app.get('/isConnected/', function(req, res){
  console.log('Users: ' + connected)
  res.send("isConnected: true")
  /**for(var i = 0; i<connected.length; i++){
    console.log('User: ' + connected[i])
    if(connected[i] == req.query.user_id){
      res.send("isConnected: true")
    }
  }*/
})

app.get('/login/', function(req, res){
  connected.push(req.query.user_id)
  console.log('Users: ' + connected)
  res.send("Users : " + connected)
})

app.get('/register/', function(req, res){
  res.send("Parameters : " + req.query.user_id)
})

app.listen(port, function(){
  console.log('listening on : ' + port)
})
