/** config */
var PORT = 8080;

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/send', (req, res) => {
    res.sendFile(__dirname + '/send.html');
});
io.on('connection', (socket) => {
    socket.on('video', (msg) => {
        socket.broadcast.emit('video', msg);
    });
});

server.on('listening', () => {
    console.log('listening on ' + PORT);
})

server.listen(PORT);
