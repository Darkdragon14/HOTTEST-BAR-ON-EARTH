// content of index.js
const port = 8080

const app = require('express')()
const server = require('http').createServer(app)
var request = require("request");

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
  // Appel reco
  var options = { method: 'GET',
  url: 'http://reco:8000/newClient/Bob&pop&biere&10&20'};

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });
  res.json({token : true})
})

app.listen(port, function(){
  console.log('listening on : ' + port)
})
