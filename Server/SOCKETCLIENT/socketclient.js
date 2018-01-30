var io = require('socket.io').listen(8083);

io.sockets.on('connection', function (socket) {
  console.log('User connected !!!')
  socket.emit('request')

  socket.on('response_data', function(data){
    console.log(data)
  })
});
