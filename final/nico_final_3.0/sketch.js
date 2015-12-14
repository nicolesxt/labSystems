var frames = 5;
var count = 0;
var neww = 0;

var arrayLength = 10000;
var xaxis, yaxis;

var arraydataX = [];
var arraydatangelX = 0;
var arraydataY = [];
var arraydatangelY = 0;

var xmo, ymo;

var currentcount;
var ellipsearray = [];

function setup() {
  createCanvas(1000, 2500);
  background(255);
  
   //frameRate(frames);
}

function draw() {
    fill(0,0,0);
  if(count <= arrayLength){
      count ++;
      frames ++;
      frameRate(frames);
      //print(count);
  }
  
  
  neww = Math.floor(random(100000));
  xaxis = random(0, 2500);
  yaxis = random(0, 1000);
  text(neww, xaxis, yaxis);
  arraydataclass(xaxis, yaxis);

  
}


function arraydataclass(xx, yy){
  arraydataX[arraydatangelX] = xx;
  arraydatangelX ++;
  arraydataY[arraydatangelY] = yy;
  arraydatangelY ++;
    fill(0,0,255);
  for (i = 0 ; i <= count ; i ++){
  if(arraydataX[i]){
    ellipsearray[i] = { "x" : arraydataX[i], "y" : arraydataY[i]};
  //ellipse(arraydataX[i],arraydataY[i], 10, 10);
 
  //print(ellipsearray[i].x);
  //DONT KNOW WHAT TO DO
  // print("dataX");
  // print(Math.floor(arraydataX[i]));
  // print("dataY");
  // print(Math.floor(arraydataY[i]));
  }
  
  }
  
}


var myVar = setInterval(myTimer, 0);

function myTimer() {
  mousefunk();
}


function mousefunk(){
    
  xmo = Math.floor(mouseX);
  ymo = Math.floor(mouseY);
  //print("x:" + xmo);
  //print("y:" + ymo);
  
  if(ellipsearray){
   for( i=0; i<= ellipsearray.length; i++ ){
      if (ellipsearray[i]){

        if(Math.floor(xmo/10) == Math.floor(ellipsearray[i].x/10) && Math.floor(ymo/10) == Math.floor(ellipsearray[i].y/10)){
          print("mouse hit!");
          fill(200,100,100);
          fill(0);
          ellipse(ellipsearray[i].x, ellipsearray[i].y, 10, 10);
          print(Math.floor(ellipsearray[i].x));
        }else{
          //background(255);
        }
      }
   }
  }
  
  
}
