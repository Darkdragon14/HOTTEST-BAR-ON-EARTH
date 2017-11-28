// content of index.js
<<<<<<< HEAD
const port = 8080

const app = require('express')()
const server = require('http').createServer(app)

app.get('/login/', function(req, res){
  res.send("Parameters : " + req.query.user_id)
})

app.get('/register/', function(req, res){
  res.send("Parameters : " + req.query.user_id)
})

app.listen(port, function(){
  console.log('listening on : ' + port)
=======
const http = require('http')
const port = 8080

const requestHandler = (request, response) => {
  console.log(request.url)
  response.end('Hello AuthApp Server!')
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
>>>>>>> bc8d33cca25dd9e0beac3e9e4f6a319e1ca543b8
})
