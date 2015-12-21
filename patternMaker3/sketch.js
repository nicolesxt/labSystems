//socket io

var back;

  var socket = io.connect('http://localhost:7700');

  socket.on('connect', function(){});
  socket.on('serialdata', function(data){
    
   //console.log("final destination: "+data.dee);
    var reading = data.dee.split("a");
    console.log(reading[0]);
    console.log(reading[1]);
    console.log(reading[2]);
    console.log(reading[3]);
    console.log(reading);
    var up = parseInt(reading[0]);
    var left = parseInt(reading[1]);
    var down = parseInt(reading[2]);
    var right = parseInt(reading[3]);


    controllerMoving();

  });
  socket.on('disconnect', function(){});



var up = 0;
var left = 0;
var down = 0;
var right = 0;

//for the ellipses
var ellipseX_each, ellipseY_each;
var ellipse_array = [];//pile up the ellipse_count
var ellipse_count = 0;//++ with the frames until totalellipses
var totalellipses = 4;//always 1 less actually 3 ellipses
var ellipseR = 3;
//var xWidth = window.innerWidth;//window width
//var yHeight = window.innerHeight;//window height
var xWidth = 800;
var yHeight = 800;

//for the barrier
var bool = new p5.Vector(0,0);
//movement
var speed = 1;

//getting all the ellipse pos
var ellipse_array_all = [];//an array that stores all the data

//if controller hit it or not?
var controllerR = 70;
var controller = new p5.Vector(250, 250);//position
var controllerSpeed = 10;
var addx = new p5.Vector(controllerSpeed, 0);
var addy = new p5.Vector(0, controllerSpeed);

//inner barrier (result of random)
var pointsX = [];//points for the barrier
var pointsY = [];//points for the barrier
var varr = 140;//var for the first square animation
var pointnum = 4;//how many points are there gonna be at first?

//for controller to eject ellipses
var bools1, bools2, bools3, bools4;

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


var gradJson = {"r" : 255,"g" : 0, "b" : 125};// holds gradient rgb data
//color is increasing or decreasing
var rFlip = false;
var gFlip = true; 
var bFlip = false;


var wallAcceleration = 0.05; // higher number = more diffculty
var wallSizeIncrease = 1;

function setup() {
  createCanvas(800,800);
}


function undercontroller(xx, yy, rr){
  var ifundercontroller = false;
  var check1, check2, check3, check4;
  check1 = width/2 - rr;
  check2 = width/2 + rr;
  check3 = height/2 - rr;
  check4 = height/2 + rr;
  if(xx > check1 || xx < check2){
    if(yy > check3 || yy < check4){
      ifundercontroller = true;
      //when the spots are not in circle
      //when the spots are not in circle it should be drawn
    }
  }
  return ifundercontroller;
}

function gradient(gradspeed){



    if (!rFlip){
      if (gradJson.r > 0){
        gradJson.r -= gradspeed;
      }else{
        gradJson.r = 0;
        rFlip = true;
      }
    }else{
      if (gradJson.r < 255){
        gradJson.r += gradspeed;
      }else{
        gradJson.r = 255;
        rFlip = false;
        
      }
      
    }
    if (!gFlip){
      if (gradJson.g > 0){
        gradJson.g -= gradspeed;
      }else{
        gradJson.g = 0;
        gFlip = true;
      }
    }else{
      if (gradJson.g < 255){
        gradJson.g += gradspeed;
      }else{
        gradJson.g = 255;
        gFlip = false;
        
      }
      
    }
    if (!bFlip){
      if (gradJson.b > 0){
        gradJson.b -= gradspeed;
      }else{
        gradJson.b = 0;
        bFlip = true;
      }
    }else{
      if (gradJson.b < 255){
        gradJson.b += gradspeed;
      }else{
        gradJson.b = 255;
        bFlip = false;
        
      }
      
    }
    
  
    
  
  
}

function draw() {
  frameRate(80);
  //background(255);
  //stroke(255, 255, 153);
  stroke(200);
  gradient(1);
  rect(varr, varr, xWidth - varr*2, yHeight - varr*2);
  
  //update ellipse_array per frame(the drawing part not the calculation part)
  ellipseX_each = random(varr + 50, xWidth - varr - 50);
 ellipseY_each = random(varr + 50, yHeight - varr - 50);
  for(i = 0; i < totalellipses - 1; i ++){
      fill(gradJson.r, gradJson.g, gradJson.b);
      stroke(0.4);
      stroke(gradJson.g, gradJson.b, gradJson.r);
      gradient(1);
    if(ellipse_array[i]){

      ellipse(ellipse_array[i].x, ellipse_array[i].y, ellipse_array[i].size, ellipse_array[i].size);

       ellipse_array[i].x += ellipse_array[i].dx*ellipse_array[i].speed;
       ellipse_array[i].y += ellipse_array[i].dy*ellipse_array[i].speed;
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
  var xrandom = random(varr + 20, xWidth - varr - 20);
  var yrandom = random(varr + 20, yHeight - varr - 20);  
  


  ellipse_array[ellipse_count] = {"x": xrandom, "y": yrandom, "dx": 0, "dy": 0, "id": ellipse_count, "speed": speed, "size" : ellipseR};//original speed has to be 0
    

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

// function keyPressed(){
//   if (keyCode === 65) {//left
//     //print("left");
//     controller.sub(addx);
//     bools1 == false;
//     //
//     bools2 == true;
//     bools3 == true;
//     bools4 == true;
//   } else if (keyCode === 68) {//right
//     //print("right");
//     controller.add(addx);
//     bools1 == false;
//     //
//     bools2 == true;
//     bools3 == true;
//     bools4 == true;
//   }
//   if (keyCode === 87) {//up
//     controller.sub(addy);
//     //print("up");
//     bools1 == false;
//     //
//     bools2 == true;
//     bools3 == true;
//     bools4 == true;
//   } else if (keyCode === 83) {//down
//     controller.add(addy);
//     //print("down");
//     bools1 == false;
//     //
//     bools2 == true;
//     bools3 == true;
//     bools4 == true;
//   }else{
//     bools1 == true;
//     bools2 == true;
//     bools3 == true;
//     bools4 == true;
//   }
// }

function controllerclass(){
  fill(255, 102, 204);
  stroke(200);
  ellipse(controller.x, controller.y, controllerR, controllerR);

  if(controller.x < varr + controllerR/2+10){
    controller.add(addx);
  }
  if(controller.x > xWidth - varr - controllerR/2-10){
    controller.sub(addx);
  }
  if(controller.y < varr + controllerR/2+10){
    controller.add(addy);
  }
  if(controller.y > yHeight - varr - controllerR/2-10){
    controller.sub(addy);
  }
}

function controllerMoving(u, l, r, d){
  console.log(u, l, r, d);
  if (left > 0) {//left
    //print("left");
    controller.sub(addx);
    bools1 == false;
    //
    bools2 == true;
    bools3 == true;
    bools4 == true;
  } else if (right > 0) {//right
    //print("right");
    controller.add(addx);
    bools1 == false;
    //
    bools2 == true;
    bools3 == true;
    bools4 == true;
  }
  if (up > 0) {//up
    controller.sub(addy);
    //print("up");
    bools1 == false;
    //
    bools2 == true;
    bools3 == true;
    bools4 == true;
  } else if (down > 0) {//down
    controller.add(addy);
    //print("down");
    bools1 == false;
    //
    bools2 == true;
    bools3 == true;
    bools4 == true;
  }else{
    bools1 == true;
    bools2 == true;
    bools3 == true;
    bools4 == true;
  }
}


function physicsclass(){
  if(ellipse_array){
    for(i=0; i< totalellipses - 1; i++){

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
          ellipse_array[i].speed = speed;
          ellipse_array[i].size = ellipseR;
        }
      


      
        //collision between ellipses and wall
        if (ellipse_array[i].x < 3 || ellipse_array[i].x > xWidth-3 ){
          //print("collide");
          ellipse_array[i].dx *= -1;
          ellipse_array[i].speed += wallAcceleration;
          ellipse_array[i].size += wallSizeIncrease;
        }else{
          ellipse_array[i].dx *= 1;
        }
        
        if (ellipse_array[i].y < 3 || ellipse_array[i].y > yHeight-3 ){
          //print("collide");
          ellipse_array[i].dy *= -1;
          ellipse_array[i].speed += wallAcceleration;
          ellipse_array[i].size += wallSizeIncrease;
        }else{
          ellipse_array[i].dy *= 1;
        }
        
        
      }
    }
  }
}