/*
This sketch demonstrates how to coordinate data
between 3 devices in a Gazell network.

The host collects RSSI samples from the Devices,
and determines which device has the strongest
average RSSI (ie: the Device that is closest
to the Host).  The Green led is set on the
closest Device.

Since the Device must initiate communication, the
device "polls" the Host evey 200ms.
*/

#include <RFduinoGZLL.h> // include rfduino library
device_t role = DEVICE2; // set Device name... DEVICE2 to DEVICE7 / HOST

int xpin = 2;
int xval = 0;
int xvall = 0;

String inputString = "";         // a string to hold incoming data
boolean stringComplete = false;  // whether the string is complete

void setup()
{
  Serial.begin(9600); // begin serial communications
  pinMode(xpin, INPUT);
  inputString.reserve(200);
  RFduinoGZLL.txPowerLevel = 0;
  // start the GZLL stack
  RFduinoGZLL.begin(role); // begin BLE communications
}

void loop()
{
  char xdata[2];   //declaring character array -- 3 characters plus a nill charachter as terminator
  char sdata[2];
  char mydata[4]; // declare mydata array

  String xstr;//declaring string
  String mystr;
  String sstr;

   serialEvent(); //call the function
  // print the string when a newline arrives:
  if (stringComplete) {
//    Serial.println(inputString);
    sstr=inputString;
    // clear the string:
    inputString = "";
    stringComplete = false;
  }

  xvall = analogRead(xpin); // read pin sensor values and place into variavles


  if(xvall>1015){
    xval = 5;
  }else if(xvall<=1015 && xvall>1005){
    xval=4;
  }else if(xvall<=1005 && xvall>995){
    xval=3;
  }else if(xvall<=995 && xvall> 970){
    xval=3;
  }else if(xvall<=970 && xvall> 100){
    xval=2;
  }else if(xvall<=100 && xvall> 10){
    xval=1;
  }else if(xvall<=10){
    xval=0;
  }
  
  xstr = String(xval);
  mystr = "c,"+xstr;
  mystr.toCharArray(mydata, 4); // place mystr data into character buffer

  Serial.println(mystr); // print buffer to serial

  RFduinoGZLL.sendToHost(mydata, 4); // send buffer to host other rfduino
  delay(250);
}

// if data is recived from another rfduino
void RFduinoGZLL_onReceive(device_t device, int rssi, char *data, int len)
{
  // ignore acknowledgement without payload
  if (len > 0)
  {
    // set the Green led if this device is the closest device
    device_t closest_device = (device_t)data[0];
  }
}

//event handler to get data from serial when newline is presented
void serialEvent() {
  while (Serial.available()) {
    // get the new byte:
    char inChar = (char)Serial.read();
    // add it to the inputString:
    inputString += inChar;
    // if the incoming character is a newline, set a flag
    // so the main loop can do something about it:
    if (inChar == '\n') {
      stringComplete = true;
    }
  }
}
