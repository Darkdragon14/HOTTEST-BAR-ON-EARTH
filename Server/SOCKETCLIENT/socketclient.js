// content of index.js
const port = 8083

const app = require('express')()
const server = require('http').createServer(app)
var io = require('socket.io')(server)

io.on('connection', function(client){
  app.get('/connectClient/', function(req, res){
    client.emit('request')
    client.on('response_data', function(data){
      res.send(data);
    })
  })
  client.on('disconnect', function(){})
})

app.listen(port, function(){
  console.log('listening on : ' + port)
})
