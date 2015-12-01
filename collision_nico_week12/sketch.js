var back;
var r,g,b;
var ax = 1;
var ay = 1;
var aax = 1;
var aay = 1;
var distx = 1;
var disty = 2;


var dist2x = 1;
var dist2y = 2;
var xx, yy;


  var socket = io('http://192.168.1.14:8800');
  socket.on('connect', function(){});
  socket.on('serialdata', function(data){


   //console.log("final destination: "+data.dee);

    var reading = data.dee.split("y");
     xx = parseInt(reading[0].substring(1, 4));
    //console.log(xx);
     yy = parseInt(reading[1]);
    //console.log(yy);



  });
  socket.on('disconnect', function(){});
//var io = require('socket.io-client');
//var io = require("socket.io").listen(server);

/*
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var sport = new SerialPort("/dev/ttyAMA0", { // create SerialPort instance called sport
  baudrate: 9600,// give baudrate
  parser: serialport.parsers.readline("\n") //parse data when end of line present
}, false);
*/

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


dist2x += aax;
dist2y += aay;
	//xx += aax;
	//yy += aay;
	//left 102
	//right 1
	//up 1
	// down 1021

	if (xx && yy){
		console.log(xx + " " + yy);

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

		if(xx > 101 && xx < 105 ){
			aax = 1;
		}

		if (xx > 0 && xx < 2){
			aax = -1;
		}
		if(yy > 0 && yy < 5){
			aay = 1;
		}

		if (yy > 808 && yy < 1050){
			aay = -1;
		}


		if (xx > 500 && xx < 600){
aax = 0;

		}

		if (yy > 500 && yy < 600){
aay = 0;

		}

		ellipse(distx, disty, 50, 50);
		//console.log(distx, disty);

		ellipse(dist2x, dist2y, 50, 50);
		distance = dist(distx, disty, dist2x, dist2y);
	//print (distance);
	//console.log('fsfs');
	if(distance<=50){

		r = random(200,255);
		g = random(160,255);
		b = random(180,255);
		//console.log('dsfsdfsd');
	}else{
	}

}

}










