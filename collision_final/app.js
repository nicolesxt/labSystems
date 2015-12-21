var express = require('express');
var app = express();
var port= 7700;
var url = "192.168.1.141"
var server = app.listen(port);
app.use(express.static(__dirname + '/'));//serve diectory this file is in
console.log('[this is express] listening at '+url+':'+port);



var socket;
var dataport = 8800;
var io = require("socket.io").listen(dataport);

var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var sport = new SerialPort("/dev/ttyAMA0", { // create SerialPort instance called sport
  baudrate: 9600,// give baudrate
  parser: serialport.parsers.readline("\n") //parse data when end of line present
}, false);

sport.open(function(error){
	if(error){
		console.log('fucking failed' + error);
	}else{

		console.log('serial opened');

		sport.on('data', function(data){
			console.log('here is the stupid test');
			console.log(data);

			if(socket){
			socket.emit('serialdata', {dee: data});
			}
		});
	}

});

io.on('connection', function(sock){
socket = sock;
 console.log('Io port 8800 open');
//for sending

});