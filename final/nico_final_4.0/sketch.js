var frames = 2;
var count = 0;
var neww = 0;

var arrayLength = 1000;
var xaxis, yaxis;

var arraydataX = [];
var arraydatangelX = 0;
var arraydataY = [];
var arraydatangelY = 0;

var xmo, ymo;

var currentcount;
var rectarray = [];

var size = 500;

//for drawrect
var ww = 5;
var www = size - ww;
var p1 = new p5.Vector(ww, ww);
var p2 = new p5.Vector(www, ww);
var p3 = new p5.Vector(ww, www);
var p4 = new p5.Vector(www, www);

//for controller
var cpos = new p5.Vector(0,0);
var cup, cdown, cleft, cright;
var bktimer = 0;

//layersystem
var check1 = 60;
var check2 = 1;
var check3;


function setup() {
  createCanvas(500,500);
  //background(255);
   //frameRate(frames);
}

function draw() {
  background(255);
    fill(0,0,0);
    //print(count);
  if(count <= arrayLength){
      count ++;//counting the squares
      print(count);
  }
  frameRate(3);
  xaxis = random(0, 500);
  yaxis = random(0, 500);
  
  arraydataclass(xaxis, yaxis); 
  cpos.set(mouseX, mouseY);
  controller(cpos.x, cpos.y);
  drawrect();
  //
  //layerSystem();
  //print(rectarray[rectarray.length-1].x);
// squaredrawingclass();
  
}


var myVar1 = setInterval(myTimer1, 0);
function myTimer1() {
  mousefunk();

}

var myVar2 = setInterval(myTimer2, 0);
function myTimer2(){
  arraydataclass(xaxis, yaxis); 
}


function arraydataclass(xx, yy){
  // arraydataX[arraydatangelX] = xx;
  // arraydatangelX ++;
  // arraydataY[arraydatangelY] = yy;
  // arraydatangelY ++;
    //fill(0,0,255);
  for (i = 0 ; i < count ; i ++){
      //draw random boxes
    rectarray[i] = { "x" : xx, "y" : yy};
  
  }
  
  
   squaredrawingclass();
  
  
  
}


function squaredrawingclass(){
     stroke(0);
  strokeWeight(0.4);
  fill(255);
  for (i = 0 ; i < rectarray.length ; i ++){

 
  rect(rectarray[i].x, rectarray[i].y, 5, 5); 
  
  
}
}


function mousefunk(){
    
  xmo = Math.floor(mouseX);
  ymo = Math.floor(mouseY);
  //print("x:" + xmo);
  //print("y:" + ymo);
  
  //ellipse(xmo, ymo, 10, 10);
  
  if(rectarray){
  for( i=0; i<= rectarray.length; i++ ){
      if (rectarray[i]){

        if(Math.floor(xmo/10) == Math.floor(rectarray[i].x/10) && Math.floor(ymo/10) == Math.floor(rectarray[i].y/10)){
          //print("mouse hit!");
          fill(200,100,100);
          fill(0);
          ellipse(rectarray[i].x, rectarray[i].y, 10, 10);
          //print(Math.floor(rectarray[i].x));
        }else{
          //background(255);
        }
      }
  }
  }
}



function drawrect(){
   if(ww <= 200){
    //print("ww"+ww);
    //print("www"+www);
    ww +=10;
    www = 500 - ww;
    frames = 10;
  }else{
    frames = 2;
  }
  
  p1.set(ww, ww);
  p2.set(www, ww);
  p3.set(ww, www);
  p4.set(www, www);
  
  stroke(1);
  line(p1.x, p1.y, p2.x, p2.y);
  line(p2.x, p2.y, p4.x, p4.y);
  line(p3.x, p3.y, p4.x, p4.y);
  line(p3.x, p3.y, p1.x, p1.y);
  //print(p1.x, p1.y);
  
}

function controller(xx, yy){
  fill(0, 255, 0);
  ellipse(xx, yy, 10, 10);
}

function layerSystem(){
  print("fdf");
  
  
}






