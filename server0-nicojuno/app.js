var bodyParser = require('body-parser');
var express = require("express");
var app = express();
var port = 8000;
var url='192.168.1.134'
var server = app.listen(port);
var io = require("socket.io").listen(server);


//open serial

var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var portt = new SerialPort("/dev/ttyAMA0", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
}, false); // this is the openImmediately flag [default is true]


var color1, color2, color3;



portt.open(function(error) {

  if (error) {
    console.log('failed to open: ' + error);
  } else {

    console.log('Serial open');
    portt.on('data', function(data) {
    //console.log('data length: ' + data.length);

   color1 = data.substr(5,3);

   color2 = data.substr(8,3);

   color3 = data.substr(11,3);
   console.log(color1 + color2 + color3);

//this is where the color data is received on the pi end

    });
  }
});

 app.use(express.static(__dirname + '/'));
 console.log('Simple static server listening at '+url+':'+port);



//socket.io stuff
io.sockets.on('connection', function (socket) {
    socket.emit('toScreen', { r: color1, g: color2, b: color3 });
});
