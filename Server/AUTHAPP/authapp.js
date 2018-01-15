// content of index.js
const port = 8080

const app = require('express')()
const server = require('http').createServer(app)
var request = require("request");
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var connected = []

app.use(passport.initialize());

passport.use(new LocalStrategy({
    usernameField: 'user_id',
    passwordField: 'passwd'
  },
  function(username, password, done) {
      console.log('Users: ' + username)
      console.log('Passwd: ' + password)
      if (username != "Fred") {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (password != "pwd") {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, username);
  }
));

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

/**app.post('/login/', function(req, res){
  connected.push(req.query.user_id)
  console.log('Users: ' + connected)
  console.log(req.query)
  if(req.query.user_id == "Fred"){
    res.status(200).send("Users : " + connected)
  }else{
    res.status(403).send("Users : " + connected)
  }
  passport.authenticate('local', { successRedirect: '/getDashBoard',
                                   failureRedirect: '/login',
                                   failureFlash: true })
})*/

app.get('/login', function(req, res){
  res.send(form.html);
})

app.post('/login',
  passport.authenticate('local', { successRedirect: '/getDashBoard',
                                   failureRedirect: '/login',
                                   session: false
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
