// content of index.js
const port = 8082

const app = require('express')()
const server = require('http').createServer(app)
var io = require('socket.io')(server)

io.on('connection', function(client){
  client.on('event', function(data){
    client.emit('response', "Hey would you come with me in the sauna ?")
  })
  client.on('disconnect', function(){})
})

app.get('/connectBar/', function(req, res){
  res.send("connectBar : " + req.query.user_id)
})

app.listen(port, function(){
  console.log('listening on : ' + port)
})
