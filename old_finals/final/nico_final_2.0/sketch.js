//var frames = 5;
var count = 0;
var neww = 0;

var arrayLength = 10000;
var xaxis, yaxis;

var arraydataX = [];
var arraydatangelX = 0;
var arraydataY = [];
var arraydatangelY = 0;

function setup() {
  createCanvas(700, 700);
  background(255);
  
   //frameRate(frames);
}

function draw() {
    fill(0,0,0);
  if(count <= arrayLength){
      count ++;
      frameRate(2);
      //print(count);
  }
  
  
  neww = Math.floor(random(100000));
  xaxis = random(20, 480);
  yaxis = random(20, 480);
  text(neww, xaxis, yaxis);
  arraydataclass(xaxis, yaxis);

  fill(0,0,255);
  for (i = 0 ; i <= count ; i ++){
  ellipse(arraydataX[i],arraydataY[i], 10, 10);
  //DONT KNOW WHAT TO DO
  }
  
  
  function isBigEnough(element, index, array) {
  return element >= 10;
}
[12, 5, 8, 130, 44].every(isBigEnough);   // false
[12, 54, 18, 130, 44].every(isBigEnough); // true


  
}


function arraydataclass(xx, yy){
  arraydataX[arraydatangelX] = xx;
  arraydatangelX ++;
  arraydataY[arraydatangelY] = yy;
  arraydatangelY ++;
  
}


