//express shit
var express = require('express');
var app = express();
var port= 7700;
var url = "172.20.10.5"
var server = app.listen(port);
app.use(express.static(__dirname + '/'));//serve diectory this file is in
console.log('Simple static server listening at '+url+':'+port);


//socket io shit
var socket;
//socket io port
var dataport = 8800;//port for socket communication
var io = require("socket.io").listen(dataport);

//serial stuff
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var sport = new SerialPort("/dev/ttyAMA0", { // create SerialPort instance called sport
  baudrate: 9600,// give baudrate
  parser: serialport.parsers.readline("\n") //parse data when end of line present
}, false);


//socket.io stuff
sendMessage();
function sendMessage() {

  io.sockets.on('connection', function (socket) {
    sport.open(function(error) {
    if (error) {
      console.log('failed to open: ' + error);
    } else {
      console.log('Serial open'); 
      sport.on('data', function(data) {
        // client.send(message, 0, message.length, port, url, function(err, bytes) {
        //     if (err) throw err;
        //     sendMessage();
        // });
      if(socket){
        socket.emit('toScreen', { m: data });
      }
      console.log('here is data'+data);
      });
    }
    });
    });
}