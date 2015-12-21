var back1, back2, back3;
var pos1x, pos2x, pos1y, pos2y;
function setup() {
  createCanvas(500, 500);
  back1=0;
  back2=0;
  back3=0;
  
  pos1x = 200;
  pos2x = 300;
  pos1y = 250;
  pos2y = 250;
  strokeWeight(2);
  	rectMode(CENTER);
}

function draw() {
	background(back1, back2, back3);
	fill(255);
	ellipse(pos1x, pos1y, 60, 60);
	ellipse(pos2x, pos2y, 60, 60);
	distance = dist(150, 250, mouseX, mouseY);
	print (distance);
	if(distance<=50){
		back1=random(100, 255);
		back2=random(100, 255);
		back3=random(100, 255);
	}else{
		back1=0;
		back2=0;
		back3=0;
	}
}