// content of index.js
const port = 8081

const app = require('express')()
const server = require('http').createServer(app)
var redis = require('redis');
var redisClient = redis.createClient('redis://redis:6379');
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var queryDb = function(json){
  //query the database with the requested features
}

//####  GET ####

app.get('/getDashBoard/', function(req, res){
  if(req.headers.cookie){
    redisClient.exists(req.headers.cookie, function(err, reply) {
        if (reply === 1) {
            console.log('User exists');
            res.send({token: true, cookie: req.headers.cookie})
        } else {
            console.log('User doesn\'t exist');
            res.send("No no no !")
        }
    });
  }else {
    res.send("No no no !")
  }
})

app.get('/temperature/', function(req, res){
  res.send({temp: 20})
})

app.listen(port, function(){
  console.log('listening on : ' + port)
})
