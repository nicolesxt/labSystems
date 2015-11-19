var express = require('express');
var app = express();
var port= 7700;
var url = "192.168.1.2"
var server = app.listen(port);


var dgram = require('dgram');
//var message = new Buffer('My KungFu is Good!');
var prompt = require('prompt');
prompt.start();
var message;
var bool = 1
var client = dgram.createSocket('udp4');


app.use(express.static(__dirname + '/'));//serve diectory this file is in
console.log('Simple static server listening at '+url+':'+port);


sendMessage()
console.log('this is terminal');
function sendMessage() {
	
		//bool == 0;
		prompt.get(['newwwMessage'], function (err, result){
			message = new Buffer(result.newwwMessage);

			
				client.send(message, 0, message.length, port, url, function(err, bytes) {
				    if (err) throw err;
				    console.log('UDP message sent to ' + url +':'+ port);
				    //bool == 1;
				    //client.close();
				    sendMessage();
				});
			
		});
	
}