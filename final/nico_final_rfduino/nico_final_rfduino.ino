#include <RFduinoGZLL.h> // include rfduino library
int print1, print2, print3, print4;

void setup() {
  Serial.begin(9600);
}

// the loop routine runs over and over again forever:
void loop() {

  int val1 = analogRead(2);//up
  int val2 = analogRead(3);//left
  int val3 = analogRead(4);//down
  int val4 = analogRead(5);//right
  // print out the value you read:
  if(val1 <10){
    print1 = 1;
  }else{
    print1 = 0;
  }
  if(val2 <10){
    print2 = 1;
  }else{
    print2 = 0;
  }
  if(val3 <10){
    print3 = 1;
  }else{
    print3 = 0;
  }
  if(val4 <10){
    print4 = 1;
  }else{
    print4 = 0;
  }
  Serial.print(print1);
  Serial.print("a");
  Serial.print(print2);
  Serial.print("a");
  Serial.print(print3);
  Serial.print("a");
  Serial.println(print4);
  //1--being pushed
  //100+ --not being pushed


  
  delay(400);        // delay in between reads for stability
}
