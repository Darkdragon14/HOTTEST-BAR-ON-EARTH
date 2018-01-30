var bdd_bar=require("../BDD-BAR/app.js");
var Gpio = require('pigpio').Gpio,
  trigger1 = new Gpio(23, {mode: Gpio.OUTPUT}),
  echo1 = new Gpio(24, {mode: Gpio.INPUT, alert: true});
  trigger2 = new Gpio(17, {mode: Gpio.OUTPUT}),
  echo2 = new Gpio(27, {mode: Gpio.INPUT, alert: true});

var distance1;
var distance2;
var numberOfPerson = 0;

trigger1.digitalWrite(0); // s'assurer que le trigger1 est à 0 V
trigger2.digitalWrite(0); // s'assurer que le trigger2 est à 0 V

setTimeout(function(){writePersonDB();}, 2000);

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
      diff1 = (endTick1 >> 0) - (startTick1 >> 0); 
      distance1 = diff1 / 58;
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
      diff2 = (endTick2 >> 0) - (startTick2 >> 0);
      distance2 = diff2 / 58;
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

// Mesure la distance toutes les 500 ms 
setInterval(function () {
  trigger1.trigger(10, 1); // Presenter une impulsion high "5V" sur le trigger1
  trigger2.trigger(10,1);  // Presenter une impulsion high "5V" sur le trigger2
}, 500);

setInterval(writePersonDB, 1000 *60);

