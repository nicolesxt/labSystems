var back;
var r,g,b;
var ax = 1;
var ay = 1;
var aax = 0.5;
var aay = 0.5;
var distx = 1;
var disty = 1;


var dist2x = 1;
var dist2y = 1;


function setup() {
  createCanvas(500, 500);
  back=0;
  strokeWeight(2);
  rectMode(CENTER);
  	r = random(200,255);
		g = random(160,255);
		b = random(180,255);
}





function draw() {

console.log('is it working');

	background(r, g, b);
	fill(250);
	strokeWeight(0);
	distx += ax;
	disty += ay;


dist2x += aax;
dist2y += aay;

		if(distx >= 500 || distx <= 0){
			ax = -1;
		}else{
			ax = 1;
		}
		if(disty >= 500 || disty <= 0){
			ay = -1;
		}else{
			ay = 1;
		}
		
		if(distx >= 500){
		  distx --;
		}else if(distx <= 0){
		  distx ++;
		}else{
		//what should i put here??
		}
		if(disty >= 500){
		  disty --;
		}else if(disty <= 0){
		  disty ++;
		}
		

		// if(dist2x > 101 && dist2x < 105 ){
		// 	aax = 1;
		// }

		// if (dist2x > 0 && dist2x < 2){
		// 	aax = -1;
		// }
		// if(dist2y > 0 && dist2y < 5){
		// 	aay = 1;
		// }

		// if (dist2y > 808 && dist2y < 1050){
		// 	aay = -1;
		// }

		// if (dist2x > 500 && dist2x < 600){
  //     aax = 0;
		// }

		// if (dist2y > 500 && dist2y < 600){
  //     aay = 0;
		// }
		

		ellipse(distx, disty, 50, 50);
		ellipse(dist2x, dist2y, 50, 50);
		distance = dist(distx, disty, dist2x, dist2y);
	if(distance<=50){
		r = random(200,255);
		g = random(160,255);
		b = random(180,255);
	}else{
	}
	
}


