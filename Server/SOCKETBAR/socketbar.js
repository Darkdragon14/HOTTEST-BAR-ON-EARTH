// content of index.js
const port = 8082

const app = require('express')()
const server = require('http').createServer(app)
var io = require('socket.io')(server)

io.on('connection', function(client){
  console.log("A user is connected !")
  client.on('event', function(data){
    client.emit('response', "Hey would you")
  })
  client.on('disconnect', function(){})
})

app.get('/connectBar/', function(req, res){
  res.send("connectBar : " + req.query.bar_id)
})

app.post('/updateData/', function(req, res){
  console.log(req)
  res.send("updateData : " + req.query.bar_id)
})

app.listen(port, function(){
  console.log('listening on : ' + port)
})
