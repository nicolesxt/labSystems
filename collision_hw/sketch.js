var back;
var r,g,b;
var ax = 1;
var ay = 1;
var distx = 1;
var disty = 2;

var dgram = require('dgram');
//var message = new Buffer('My KungFu is Good!');
var prompt = require('prompt');
prompt.start();
var message;
var bool = 1
var client = dgram.createSocket('udp4');



function setup() {
  createCanvas(500, 500);
  back=0;
  strokeWeight(2);
  rectMode(CENTER);
}

function draw() {
	background(r, g, b);
	fill(250);
	strokeWeight(0);
	distx += ax;
	disty += ay;
	if(distx >= 500 || distx <= 0){
		ax *= -1;
	}else{
		ax *= 1;
	}
	if(disty >= 500 || disty <= 0){
		ay *= -1;
	}else{
		ay *= 1;
	}
	ellipse(distx, disty, 50, 50);
	console.log(distx, disty);

	ellipse(mouseX, mouseY, 50, 50);
	distance = dist(distx, disty, mouseX, mouseY);
	//print (distance);
	console.log('fsfs');
	if(distance<=50){

		r = random(200,255);
		g = random(160,255);
		b = random(180,255);
		console.log('dsfsdfsd');
	}else{
	}
}




sendMessage()
console.log('this is p5');
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







