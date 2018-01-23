// content of index.js
const port = 8080

const app = require('express')()
const server = require('http').createServer(app)
var request = require("request");
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var redis = require('redis');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var redisClient = redis.createClient('redis://redis:6379');
var bodyParser = require('body-parser');

var connected = []

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    store: new RedisStore({host: 'redis', port:6379, client:redisClient}),
    secret: 'nightAdvisor',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: 'user_id',
    passwordField: 'passwd',
    passReqToCallback: true
  },
  function(req, username, password, done) {
      console.log('Users: ' + username)
      console.log('Passwd: ' + password)
      if (username == "Fred" && password == "pwd" || username == "Ben" && password == "pswd") {
        redisClient.set(req.headers.cookie, username, redis.print());
        return done(null, username);
      }else{
        return done(null, false, { message: 'Incorrect user.' });
      }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  done(null, id);
});

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

app.get('/login', function(req, res){
  res.json({token : false});
})

app.post('/login',
  passport.authenticate('local', { successRedirect: '/getDashBoard',
                                   failureRedirect: '/login',
                                   session: true
                                 })
);

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
