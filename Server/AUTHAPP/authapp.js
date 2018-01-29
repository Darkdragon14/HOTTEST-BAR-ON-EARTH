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
      redisClient.exists(req.headers.cookie, function(err, reply) {
          if (reply === 1) {
              console.log('User exists');
              return done(null, username);
          } else {
              console.log('User doesn\'t exist');
              if (username == "Fred" && password == "pwd" || username == "Ben" && password == "pswd") {
                redisClient.set(req.headers.cookie, username, redis.print());
                return done(null, username);
              }else{
                return done(null, false, { message: 'Incorrect user.' });
              }
          }
      })
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  done(null, id);
});

app.post('/login/',
  passport.authenticate('local'),
  function(req, res){
    res.send({token: true, cookie: req.headers.cookie})
});

app.post('/logout/',
  function(req, res){
    redisClient.exists(req.headers.cookie, function(err, reply) {
        if (reply === 1) {
            console.log('User exists');
            redisClient.del(req.headers.cookie);
            res.send({token: true})
        } else {
            console.log('User not connected');
            res.send({token: false})
        }
    })
});

app.get('/register/',
  passport.authenticate('local', { successRedirect: '/getDashBoard',
                                   failureRedirect: '/register',
                                   session: true
                                 })
)

app.listen(port, function(){
  console.log('listening on : ' + port)
})
