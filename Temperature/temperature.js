var bdd_bar=require("../BDD-BAR/app.js");
var sensor=require("node-dht-sensor");

setTimeout(function(){conversion();}, 2000);

var temp = setInterval(conversion, 5000*60);

function conversion(){
        sensor.read(22, 4, function(err, temperature) {
                if (!err) {
                	console.log('temp: ' + temperature.toFixed(1) + '°C');
               	 	bdd_bar.writeTemperature(temperature.toFixed(1));
                	
                }
        });
}

