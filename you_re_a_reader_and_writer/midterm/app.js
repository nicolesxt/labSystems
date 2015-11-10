var bodyParser = require('body-parser');
var express = require("express");
var app = express();
var port = 8000;
var url='192.168.1.125'
var server = app.listen(port);
var io = require("socket.io").listen(server);
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var sport = new SerialPort("/dev/ttyAMA0", { // create SerialPort instance called sport
  baudrate: 9600,// give baudrate
  parser: serialport.parsers.readline("\n") //parse data when end of line present
}, false);

app.use(express.static(__dirname + '/'));//serve diectory this file is in
console.log('Simple static server listening at '+url+':'+port);

var reading;

io.sockets.on('connection', function(socket){
	sport.open(function(error){
		if(error){
			console.log('failed to open: '+error);
		}else{
			console.log('Serial Open');
			sport.on('data', function(data){
			    reading = data.substr(2,2);
				var reading2 = data.substr(0,1);
				//console.log(reading2);
				if(reading2 === 'c'){
					console.log(reading);
				}

				socket.emit('toScreen', { r: reading });
			});
		}

	});
});














// //socket.io stuff
// io.sockets.on('connection', function (socket) {//open io connection
// 	sport.open(function(error) {//open serial connection
// 		  if (error) {
// 		    console.log('failed to open: ' + error);//if serial fails
// 		  } else {
// 		  	console.log('Serial open!');



// 			    sport.on('data', function(data){
// 			        socket.emit('toScreen', { d: data }); //emit to screen the data recived from socket io
// 			    });
// 		  }
// 	});
// });