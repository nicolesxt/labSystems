var express = require('express');
var app = express();
var port= 7700;

var url = "192.168.1.14"
var server = app.listen(port);

var socket;


var dataport = 8800;
var io = require("socket.io").listen(dataport);


var dgram = require('dgram');
//var message = new Buffer('My KungFu is Good!');
var prompt = require('prompt');
prompt.start();
var message;
var bool = 1
var client = dgram.createSocket('udp4');


var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var sport = new SerialPort("/dev/ttyAMA0", { // create SerialPort instance called sport
  baudrate: 9600,// give baudrate
  parser: serialport.parsers.readline("\n") //parse data when end of line present
}, false);

app.use(express.static(__dirname + '/'));//serve diectory this file is in
console.log('Simple static server listening at '+url+':'+port);

sport.open(function(error) {

  if (error) {
    console.log('failed to open: ' + error);
  } else {
    console.log('Serial open');
    sport.on('data', function(data) {

    console.log(data);
    console.log('here is a stupid test booo');

 if (socket) //if socket has been created  
 socket.emit('serialdata', { dee: data })

    });




}
  
});


io.on('connection', function(sock){
socket = sock;
 console.log('Io port 8800 open');
//for sending

});

