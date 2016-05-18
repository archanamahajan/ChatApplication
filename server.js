var express = require('express'),
    http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var messageArray = [];
var userArray = [];
var BASEURL = '10.55.24.188';
//server.listen(3000, 'localhost');

var s = server.listen(3000, BASEURL, function () {
    var host = s.address().address;
    var port = s.address().port;
    console.log('Group Poll app listening at http://%s:%s', host, port);
});

app.use(express.static(__dirname + '/ng'));essageArray = [];
io.on('connection', function (socket) {
    socket.on('chat message', function(msg){
        console.log('msg : ', msg);
        messageArray.push(msg);
        console.log('message: ' + messageArray);
        socket.broadcast.emit('message received', messageArray);
    });
    
    socket.emit('userConnected');
    
    socket.on('show status', function(uname) {
        console.log('uanem on user status : ', uname);
        userArray.push(uname);
        socket.broadcast.emit('connected users list', userArray);
    });
  
    socket.on('disconnect', function () {
        console.log('disconnect user');
        messageArray = [];
        userArray = [];
        io.emit('user disconnected');
    });
   
});