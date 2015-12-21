// //express shit
// var express = require('express');
// var app = express();

// var server = app.listen(port);
// app.use(express.static(__dirname + '/'));//serve diectory this file is in
// console.log('Simple static server listening at '+url+':'+port);

var port= 7700;
var url = 'scriptmanship.com';
//socket io shit

var dataport = 8800;//port for socket communication
var controlport = 9999;
var ioClient = require("socket.io-client");
//serial stuff
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var sport = new SerialPort("/dev/ttyAMA0", { // create SerialPort instance called sport
  baudrate: 9600,// give baudrate
  parser: serialport.parsers.readline("\n") //parse data when end of line present
}, false);

//socket.io inside serial port

   var socket = ioClient.connect("http://scriptmanship.com:"+controlport);
   

sport.open(function(error){
  if(error){
    console.log('failed' + error);
  }else{

    console.log('serial opened');

    sport.on('data', function(data){
      //console.log('here is the stupid test');
      console.log(data);

      if(socket){
      socket.emit('serialdata', {'dee': data});
      }
    });
  }

});

