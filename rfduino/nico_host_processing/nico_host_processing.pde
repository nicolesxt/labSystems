import processing.serial.*;

String inBuffer;
int bufferLength;

Serial myPort;  // Create object from Serial class

String buttonVal, flexVal;     // Data received from the serial port
int button, flex;

void setup(){
// I know that the first port in the serial list on my mac
// is Serial.list()[0].
// On Windows machines, this generally opens COM1.
// Open whatever port is the one you're using.
String portName = Serial.list()[5]; //change the 0 to a 1 or 2 etc. to match your port
myPort = new Serial(this, portName, 9600); 
size(400,400);
  
}

void draw()
{
  background(255);
  
  if (myPort.available() > 0) {
      inBuffer = myPort.readString();
      if (inBuffer != null) {
      }
      bufferLength = inBuffer.length();
  }

  
  
  if (bufferLength <= 4 && bufferLength >=2){
    ImReading();
    
    ImDrawing();
  }

}

void ImReading(){
      
      //debug
      int timer = 0;
      int new_button = 0;
      int new_flex = 0;
  
      buttonVal = inBuffer.substring(0,1);
      flexVal = inBuffer.substring(1);
      button = parseInt(buttonVal)*100;
      flex = parseInt(flexVal);
      
      if (button != new_button || flex != new_flex){
        
        
        new_button = button;
        new_flex = flex;
        timer ++;
        
        if(timer<20){
          button = new_button;
          flex = new_flex;
        }
        else{
          timer=0;
        }
        
      }
      print("this is timer");
      println(timer);
      //println(buttonVal);
      //println(flexVal);
    
print("this is button reading: ");
println(button); //print it out in the console
print("this is flex: ");
println(flex);
}

void ImDrawing(){
  
  //both button and flex controls the color of background
  float color1 = map(button, 0, 2, 200, 255);
  float color2 = map(flex, 0, 500, 200, 255);
  background(200, color1, color2);
  
  println("Drawing function is running");
  
  //button controls the existance of the ellipse
  noStroke();
  fill(0,0,255);
  ellipse(200, 200, button, button);
  
  //flex sensor controls the size of the green square
  float flex2 = map(flex, 0, 400, 50, 350);
  fill(200,255,0);
  rect(200-flex/2, flex2-flex/2,flex, flex);
  //and there are some uncontrolable flickering
  
}