//for the ellipses
var ellipseX_each, ellipseY_each;
var ellipse_array = [];//pile up the ellipse_count
var ellipse_count = 0;//++ with the frames until totalellipses
var totalellipses = 5;
var ellipseR = 5;
//for the barrier
var bool = new p5.Vector(0,0);
//movement
var speed = 6;

//getting all the ellipse pos
var ellipse_array_all = [];//an array that stores all the data

//if controller hit it or not?
var controllerR = 5;
var controller = new p5.Vector(250, 250);//position
var addx = new p5.Vector(7, 0);
var addy = new p5.Vector(0, 7);

//inner barrier (result of random)
var pointsX = [];//points for the barrier
var pointsY = [];//points for the barrier
var varr = 10;//var for the first square animation
var pointnum = 4;//how many points are there gonna be at first?


//different framerates / speeds / animations
var keyframe = 0;
var currentime = 0;
var updateRate = 16.66;
var smallellipse_rate = 333;//change this to change the framerate of random ellipses
var debug = 0.1;//theoretically this should work but it needs to be modified, smallellipse_rate is not supposed to be changed right now.

//physics engine = collision class
var direction = new p5.Vector(0,0);
var direction2 = new p5.Vector(0,0);//bet
var passme = []; //to pass the count during collision (to check which one is being hitting)
var passcount = 0; //adds up in the passme array
var passme_each = -1;//set this to -1 so the if statement wouldnt be initialized at first
var ellipse_vector = new p5.Vector(0,0);//v between ellipses and controller
var ellipse_vector2 = new p5.Vector(0,0);//v between ellipses and ellipses
var distEC = 0; //distance between ellipses and controller
var distEE = 0; //distance between ellipses and ellipses
var collisionTimeWindow = updateRate;//debug



function setup() {
  createCanvas(500,500);
}

function draw() {
  frameRate(80);
  //background(255);
  
  //update ellipse_array per frame(the drawing part not the calculation part)
  ellipseX_each = random(varr, 500 - varr);
  ellipseY_each = random(varr, 500 - varr);
  for(i = 0; i < totalellipses - 1; i ++){
      fill(255);
      stroke(0.4);
    if(ellipse_array[i]){
    ellipse(ellipse_array[i].x, ellipse_array[i].y, ellipseR, ellipseR);
    
       ellipse_array[i].x += ellipse_array[i].dx*speed;
       ellipse_array[i].y += ellipse_array[i].dy*speed;
      
    }
    
  }
  
  
  //for the ellipses (updated 5 fps)
  if(currentime >= smallellipse_rate*keyframe){
    if(keyframe > 1000/smallellipse_rate-debug){
      keyframe = 0;
    }else{
      smallellipse();
      keyframe ++;
    }
    //print(1000/smallellipse_rate);
  }
  
  //getting all the ellipse pos (updated 60 fps)
  gettingellipsepos_all(ellipseX_each, ellipseY_each);
  
  //controller class (updated 60 fps)
  controllerclass();
  
  //physics class (updated 60 fps)
  physicsclass();
  
  //split different classes in different framerates
  timeManager();
  
}


function timeManager(){
  currentime += updateRate;
  if(currentime >= 1000){
    currentime = 0;
  }
}

function smallellipse(){
  fill(0,0,255);
  ellipse_array[ellipse_count] = {"x": ellipseX_each, "y": ellipseY_each, "dx": 0, "dy": 0, "id": ellipse_count};//original speed has to be 0
  //ellipse_array[ellipse_count].d is a pvector that contains the collision speed
  if(ellipse_count < totalellipses){
  ellipse_count ++;
  }
}

function gettingellipsepos_all(xx, yy){
  for (i=0; i<ellipse_count; i++){
    ellipse_array_all[i] = { "x": xx, "y": yy};
  }
}

function keyPressed(){
  if (keyCode === 65) {//left
    //print("left");
    controller.sub(addx);
  } else if (keyCode === 68) {//right
    //print("right");
    controller.add(addx);
  }
  if (keyCode === 87) {//up
    controller.sub(addy);
    //print("up");
  } else if (keyCode === 83) {//down
    controller.add(addy);
    //print("down");
  }
}

function controllerclass(){
  fill(0);
  noStroke();
  ellipse(controller.x, controller.y, controllerR, controllerR);
  
  //moving barrier code goes here
    pointsX[0] = 5 + varr;
    pointsY[0] = 5 + varr;
    pointsX[1] = 495 - varr;
    pointsY[1] = 5 + varr;
    pointsX[2] = 495 - varr;
    pointsY[2] = 495 - varr;
    pointsX[3] = 5 + varr;
    pointsY[3] = 495 - varr;
    stroke(0);
    strokeWeight(0.6);
    line(pointsX[0],pointsY[0],pointsX[1],pointsY[1]);
    line(pointsX[1],pointsY[1],pointsX[2],pointsY[2]);
    line(pointsX[2],pointsY[2],pointsX[3],pointsY[3]);
    line(pointsX[3],pointsY[3],pointsX[0],pointsY[0]);
    // if(varr < 150){
    //   varr += 5;
    // }
    varr = 150;
    
}

function physicsclass(){
  if(ellipse_array){
    for(i=0; i< totalellipses - 1; i++){
      var hasCollided1 = false;
      if(ellipse_array[i]){
        //print(ellipse_array[i].x);//this is the data you ALWAYS need
        
      //distance checking
          // stroke(0);
          // strokeWeight(1);
          // line(ellipse_array[i].x, ellipse_array[i].y, controller.x, controller.y);
      distEC = int(dist(ellipse_array[i].x, ellipse_array[i].y, controller.x, controller.y));
      
        //collision between ellipses and controller
        if(distEC < (ellipseR + controllerR)/2){
          //print("collide");
        //for some reason this act weird if i put it outside of this if statement
        // so I have a complete different system outside, that repeats this step
        //at the same time don't fuck up this thing
          ellipse_vector.set(ellipse_array[i].x, ellipse_array[i].y);
          direction = ellipse_vector.sub(controller);
          direction.normalize();
          ellipse_array[i].dx = direction.x;
          ellipse_array[i].dy = direction.y;
        }
      

      
        //collision between ellipses and wall
        if (ellipse_array[i].x < 3 || ellipse_array[i].x > 497 ){
          //print("collide");
          ellipse_array[i].dx *= -1;
          hasCollided1 = true;
        }else{
          ellipse_array[i].dx *= 1;
        }
        
        if (ellipse_array[i].y < 3 || ellipse_array[i].y > 497 ){
          //print("collide");
          ellipse_array[i].dy *= -1;
          hasCollided1 = true;
        }else{
          ellipse_array[i].dy *= 1;
        }
        
        
      }
    }
  }
}