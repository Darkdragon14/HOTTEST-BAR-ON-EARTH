// content of index.js
const port = 8081

const app = require('express')()
const server = require('http').createServer(app)

var queryDb = function(json){
  //query the database with the requested features
}

//####  GET ####

app.get('/getDashBoard/', function(req, res){
  // Envoi de l'application web
  res.send("getDashBoard : " + req.query.user_id)
})

app.listen(port, function(){
  console.log('listening on : ' + port)
})
