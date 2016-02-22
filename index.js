var app = require('express')();
var http = require ('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req,res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/index.css', function(req,res) {
  res.sendFile(__dirname + '/index.css');
});

io.on('connection', function(socket) {
  io.emit('chat message', 'user connected');
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg.author + ": " + msg.message);
  });
  socket.on('disconnect', function() {
    io.emit('chat message', 'user disconnected');
  });
});

http.listen(8080, function() {
  console.log('listening on *:8080');
});
