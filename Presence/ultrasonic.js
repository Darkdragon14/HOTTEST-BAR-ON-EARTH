var bdd_bar=require("../BDD-BAR/app.js");

var Gpio = require('pigpio').Gpio,
  trigger1 = new Gpio(23, {mode: Gpio.OUTPUT}),
  echo1 = new Gpio(24, {mode: Gpio.INPUT, alert: true});
  trigger2 = new Gpio(17, {mode: Gpio.OUTPUT}),
  echo2 = new Gpio(27, {mode: Gpio.INPUT, alert: true});

// The number of microseconds it takes sound to travel 1cm at 20 degrees celcius
var MICROSECDONDS_PER_CM = 1e6/34321;
var distance1;
var distance2;
var numberOfPerson = 0;

trigger1.digitalWrite(0); // Make sure trigger is low
trigger2.digitalWrite(0);

(function () {
  var startTick1;
  var startTick2;
  
  echo1.on('alert', function (level, tick) {
    var endTick1,
      diff1;
    if (level == 1) {
      startTick1 = tick;
    } else {
      endTick1 = tick;
      diff1 = (endTick1 >> 0) - (startTick1 >> 0); // Unsigned 32 bit arithmetic
      distance1 = diff1 / 2 / MICROSECDONDS_PER_CM;
      console.log("distance1 vaut = " + distance1 + "cm");
      if(distance1 < 80){
		  numberOfPerson++;
		  console.log("number of personne = " + numberOfPerson);
	  }
    }
  });
  
  echo2.on('alert', function (level, tick) {
    var endTick2,
      diff2;
    if (level == 1) {
      startTick2 = tick;
    } else {
      endTick2 = tick;
      diff2 = (endTick2 >> 0) - (startTick2 >> 0); // Unsigned 32 bit arithmetic
      distance2 = diff2 / 2 / MICROSECDONDS_PER_CM;
      console.log("distance2 vaut = " + distance1 + "cm");
      if(distance2 < 80){
		  numberOfPerson--;
		  console.log("number of personne = " + numberOfPerson);
	  }
    }
  });

  
}());

function writePersonDB(){
	bdd_bar.writePersonne(numberOfPerson);
}

// Trigger a distance measurement once per second
setInterval(function () {
  trigger1.trigger(10, 1); // Set trigger high for 10 microseconds
  trigger2.trigger(10,1);
}, 1000);

setInterval(writePersonDB, 1000);

