// content of index.js

const port = 8082

//const app = require('express')()
const server = require('http').createServer(app)
var io = require('socket.io')(server)

var express = require('express')
var bodyParser = require('body-parser');

var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

io.on('connection', function(client){
  console.log("A user is connected !")
  client.on('event', function(data){
    client.emit('response', "Hey would you")
  })
  client.on('disconnect', function(){})
})

app.post('/connectBar/', function(req, res){
	console.log(req.body.data+" = "+ req.body.moyenne);
  res.send(req.body.data+" = "+ req.body.moyenne);
})

app.post('/updateData/', function(req, res){
  console.log(req.body.data+" = "+ req.body.moyenne);
  res.send(req.body.data+" = "+ req.body.moyenne);
})

app.listen(port, function(){
  console.log('listening on : ' + port)
})
