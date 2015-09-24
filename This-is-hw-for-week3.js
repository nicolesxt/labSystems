////////using a pack to check volts from pi//////
var volt = require("pi-volts");
volt.measure(function(volts)
{
    console.log("core volts: "+volts);
//////////GPIO/////////

var GPIO = require('onoff').Gpio,
 led1 = new GPIO(17, 'out');//red
 led2 = new GPIO(22, 'out');//yellow
 led3 = new GPIO(27, 'out');//green

console.log(volts+"!!!!!!!");

//////////////////define the flash callback function///////////////////

function yellow() {
  if(volts < 1){
  //yellow led is on
  led2.writeSync(1);
  }else{
  //yellow led is off
  led2.writeSync(0);
  }
}

function green(){
  if(volts>=1 && volts<=1.7) {
    // turn green LED on
    led3.writeSync(1);
  } else {
    // turn LED off
    led3.writeSync(0);
  }
}

function red(){
  if(volts>1.7){
  //turn red led on
  led1.writeSync(1);
  } else {
  //turn red led off
  led1.writeSync(0);
  }
}
  // call flash in interval
  setInterval(function(){
    green();
    red();
    yellow();
  }, 3000);


});
