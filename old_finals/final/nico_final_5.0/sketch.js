//for the ellipses
var ellipseX_each, ellipseY_each;
var ellipse_array = [];//pile up the ellipse_count
var ellipse_count = 0;//++ with the frames until totalellipses
var totalellipses = 20;
var ellipseR = 15;

//getting all the ellipse pos
var ellipse_array_all = [];//an array that stores all the data

//if controller hit it or not?
var controllerR = 15;
var controller = new p5.Vector(250, 250);//position
var addx = new p5.Vector(5, 0);
var addy = new p5.Vector(0, 5);

//different framerates / speeds / animations
var keyframe = 0;
var currentime = 0;
var updateRate = 16.66;
var smallellipse_rate = 333;//change this to change the framerate of random ellipses
var debug = 0.1;//theoretically this should work but it needs to be modified, smallellipse_rate is not supposed to be changed right now.

//physics engine = collision class
var distance = new p5.Vector(0,0);
var passme = []; //to pass the count during collision (to check which one is being hitting)
var passcount = 0; //adds up in the passme array
var passme_each = -1;//set this to -1 so the if statement wouldnt be initialized at first
var collision_check = 0;//check collision
var ellipse_vector = new p5.Vector(0,0);
var ellipse_detector = new p5.Vector(0,0);
var distance_detector = new p5.Vector(0,0);//detect collision outside of the if statement
var distt = 0; //to check length

function setup() {
  createCanvas(500,500);
}

function draw() {
  frameRate(60);
  background(255);
  
  
  //update ellipse_array per frame(the drawing part not the calculation part)
  ellipseX_each = random(5, 495);
  ellipseY_each = random(5, 495);
  for(i = 0; i <= ellipse_array.length; i ++){
      fill(255);
      stroke(0.4);
    if(ellipse_array[i])
    ellipse(ellipse_array[i].x, ellipse_array[i].y, ellipseR, ellipseR);
    
    //1. collision happens.  2. this function detects which one is colliding
    if(i == passme_each){
      ellipse_array[i].x += distance.x;
      ellipse_array[i].y += distance.y;
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
      // print("currentime");
      // print(currentime);
}

function smallellipse(){
  fill(0,0,255);
  ellipse_array[ellipse_count] = {"x": ellipseX_each, "y": ellipseY_each, "d": distance};
  //ellipse_array[ellipse_count].d is a pvector that contains the collision speed
  if(ellipse_count <= totalellipses){
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
  //print(controller.x, controller.y);
  ellipse(controller.x, controller.y, controllerR, controllerR);
  
}

function physicsclass(){
  
  
  
  
    if(ellipse_array){
    for(i=0; i<= ellipse_array.length; i++){
      if(ellipse_array[i]){
        //print(ellipse_array[i].x);//this is the data you ALWAYS need
        
      
      //distance checking (for perfect collisions)
      ellipse_detector.set(ellipse_array[i].x, ellipse_array[i].y);
      distance_detector = p5.Vector.dist(ellipse_detector, controller);
      stroke(0);
      strokeWeight(1);
      line(ellipse_array[i].x, ellipse_array[i].y, controller.x, controller.y);
      distt = int(dist(ellipse_array[i].x, ellipse_array[i].y, controller.x, controller.y));
        
      //local simplifier
      var cx = Math.floor(controller.x/10);
      var rx = Math.floor(ellipse_array[i].x/10);
      var cy = Math.floor(controller.y/10);
      var ry = Math.floor(ellipse_array[i].y/10);
      
      //if(cx == rx && cy == ry){//when the collision happens
      if(distt <= (ellipseR + controllerR)/2){

      //for some reason this act weird if i put it outside of this if statement
      // so I have a complete different system outside, that repeats this step
      //at the same time don't fuck up this thing
      ellipse_vector.set(ellipse_array[i].x, ellipse_array[i].y);
      distance = ellipse_vector.sub(controller);
      
      //print(distance);
      distance.normalize();
          //check the collision then assign a speed vector
          //distance.x and distance.y is the hitting_angle/speed of the cubes getting hit
          
          for(j=0; j <= ellipse_array.length; j++){
          passme[j] = i;//everytime collision happen, mark which cube is it hitting
            if(passme[j]){
            //print(passme[j]);
            passme_each = passme[j];
            }
          }
        }
        
      }
    }
  }
}
