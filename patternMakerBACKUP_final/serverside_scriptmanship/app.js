//express
var express = require('express');
var app = express();
var port= 7700;
var url = 'scriptmanship.com'
var server = app.listen(port);
app.use(express.static(__dirname + '/'));//serve diectory this file is in
console.log('Simple static server listening at '+url+':'+port);


//socket io
var socket = [];


var dataport = 8800;//port for socket communication

var controlsocket;
var controlport = 9999;
var io = require("socket.io");
var dataio = io.listen(dataport);
var controlio = io.listen(controlport);


var up,down,left,right;

dataio.on('connection', function(sock){
socket[socket.length] = sock;
 console.log('Web client connected ' + socket.length);




});

controlio.on('connection', function(sock){
controlsocket = sock;
 console.log('Web client connected ');

//for sending


  controlsocket.on('serialdata', function(data){
    
   //console.log("final destination: "+data.dee);
    var reading = data.dee.split("a");
    up = parseInt(reading[0]);
    left = parseInt(reading[1]);
    down = parseInt(reading[2]);
    right = parseInt(reading[3]);
    console.log('u'+up);
    console.log('l'+left);
    console.log('d'+down);
    console.log('r'+right);
    for (var i = 0; i<socket.length; i++){
      if (socket[i]){
      socket[i].emit('serialdata', {'u': up, 'l' : left, 'd' : down, 'r' : right});
    }

    }


  });


});