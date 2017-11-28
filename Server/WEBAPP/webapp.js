// content of index.js
const port = 8081

const app = require('express')()
const server = require('http').createServer(app)

var queryDb = function(json){
  //query the database with the requested features
}

app.get('/getDashBoard/', function(req, res){
  res.send("getDashBoard : " + req.query.user_id)
})

app.get('/getBarList/', function(req, res){
  res.send("getBarList : " + req.query.user_id)
})

app.get('/getBarDetails/', function(req, res){
  res.send("getBarDetails : " + req.query.user_id)
})

app.get('/updateBarDetails/', function(req, res){
  res.send("updateBarDetails : " + req.query.user_id)
})

app.get('/story/', function(req, res){
  res.send("story : " + req.query.user_id)
})

app.get('/userProfile/', function(req, res){
  res.send("userProfile : " + req.query.user_id)
})

app.get('/updateProfile/', function(req, res){
  res.send("updateProfile : " + req.query.user_id)
})

app.get('/getBar/', function(req, res){
  res.send("getBar : " + req.query.user_id)
})

app.get('/updateBar/', function(req, res){
  res.send("updateBar : " + req.query.user_id)
})

app.listen(port, function(){
  console.log('listening on : ' + port)
})
