var back;

  var socket = io('http://192.168.1.141:8800');
  socket.on('connect', function(){});
  socket.on('serialdata', function(data){

   //console.log("final destination: "+data.dee);

    var reading = data.dee.split("a");
    console.log(reading[0]);
    console.log(reading[1]);
    console.log(reading[2]);
    console.log(reading[3]);



  });
  socket.on('disconnect', function(){});





function setup() {
  createCanvas(500, 500);
  back=0;
  strokeWeight(2);
  	rectMode(CENTER);
}

function draw() {
	background(back);
	fill(255);
	ellipse(250, 250, 50, 50);
	ellipse(mouseX, mouseY, 50, 50);
	distance = dist(250, 250, mouseX, mouseY);
	print (distance);
	if(distance<=50){
		back=150;
	}else{
		back=0;
	}
}


// function draw() {
// 	background(back);
// 	fill(255);
// 	rect(250, 250, 50, 50);
// 	rect(mouseX, mouseY, 50, 50);
// 	distance = dist(250, 250, mouseX, mouseY);
// 	print (distance);
// 	if(distance<=50){
// 		back=150;
// 	}else{
// 		back=0;
// 	}
// }


// function draw() {
// 	background(back);
// 	fill(255);
// 	rect(250, 250, 50, 50);
// 	rect(mouseX, mouseY, 50, 50);
// 	if(mouseX>(250-50)& mouseX<(250+50)&mouseY>(250-50)&mouseY<(250+50) ){
// 		back=150;
// 	}else{
// 		back=0;
// 	}
// }