//SERIAL PORT STUFF------------------------------
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var portt = new SerialPort("/dev/ttyAMA0", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
}, false); // this is the openImmediately flag [default is true]

//SOCKET IO STUFF------------------------------
var bodyParser = require('body-parser');
var express = require("express");
var app = express();
var port = 8000;
var url='localhost'
var server = app.listen(port);
var io = require("socket.io").listen(server);



//SOCKET IO STUFF------------------------------
app.use(express.static(__dirname + '/'));
console.log('Simple static server listening at '+url+':'+port);


io.sockets.on('connection', function (socket) {
//SERIAL PORT STUFF------------------------------
  portt.open(function(error) {
    if (error) {
      console.log('failed to open: ' + error);
    } else {
      console.log('Serial open');
      portt.on('data', function(data) {
      //console.log(data);
        socket.on('toPhysical', function (data) {
          console.log(data.a);
          console.log(data.l); //data.m refers to mimi 
          console.log(data.b);
        });

    });
  } 
  });
});
