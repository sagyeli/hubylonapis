var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var Widget = require('./widget');

io.on('connection', function(socket) {
  var query = socket.handshake.query.uuid;
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});