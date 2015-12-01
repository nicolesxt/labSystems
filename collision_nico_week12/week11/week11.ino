#include <RFduinoGZLL.h> // include rfduino library

void setup() {
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);
}

// the loop routine runs over and over again forever:
void loop() {
  // read the input on analog pin 0:
  int yValue = analogRead(4);
  int xValue = analogRead(6);
  // print out the value you read:
  Serial.print("x");
  Serial.print(yValue);
  Serial.print("y");
  Serial.println(xValue);
  
  delay(400);        // delay in between reads for stability
}
