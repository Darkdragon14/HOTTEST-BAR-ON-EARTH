//var WebSocket = require('ws');
//var socket = new WebSocket("ws://www.example.com/socketserver");
//var socket=io.connect('http://localhost:8082');


var bdd_bar=require("../BDD-BAR/app.js");
//var sensor=require("node-dht-sensor");
const request = require('request');					/////////////http ok, recuperer la bonne temperature avec la bdd

// Set the headers
var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
};


setTimeout(function(){calculMoyenneTemp();}, 2000);

//////////////////////////////a deplacer dans le fichier de mouna////////
/*
//temperature toute les 5 minutes
var temp = setInterval(conversion, 500*60);

function conversion(){
        sensor.read(22, 4, function(err, temperature) {
                if (!err) {
                	console.log('temp: ' + temperature.toFixed(1) + '°C');
               	 	bdd_bar.writeTemperature(temperature.toFixed(1));
                	
                }
        });
}
*/
//////////////////////////////////////////////////////////////////////////

setInterval(function(){
				calculMoyenneTemp();
			//	calculMoyennedB();
			}, 60000);			//toute les minute pour la demo

var now = new Date();
var millisTill7 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 22, 0, 0) - now;
if (millisTill7 < 0) {
     millisTill7 += 86400000; // it's after 7am, try 7am tomorrow.
}
console.log("test : "+millisTill7);
setTimeout(function(){console.log("il est 7 heure");}, millisTill7);

var sommeTemp, sommePers;
var i, j;

function calculSommeTemp(res,callback){
	res.forEach(function(obj){
 		sommeTemp=sommeTemp+obj.temperature;
 		i++;
	});
	callback();
}


function calculMoyenneTemp (){
	sommeTemp=0;
	i=0;
	var temperature;
	bdd_bar.getData("TemperatureCollection")
		.then(function(res){
			calculSommeTemp(res,function(){
				var moyenne = sommeTemp/i;
				sendToServer(moyenne,"temperature");
				// bdd_bar.clean("TemperatureCollection");
			})
		});
}

function calculSommePers(res,callback){
	res.forEach(function(obj){
 		sommePers=sommePers+obj.nbPersonne;
 		j++;
	});
	callback();
}

function calculMoyennePersonne (){
	sommePers=0;
	j=0;
	var personne;
	bdd_bar.getData("PersonneCollection")
		.then(function(res){
			calculSommePers(res,function(){
				var moyenne = sommePers/j;
				sendToServer(moyenne,"nbPersonne");
				// bdd_bar.clean("TemperatureCollection");
			})
		});
}


function sendToServer (moyenne, data){
	// Configure the request
	var options = {
	    url: 'http://172.20.10.3/updateData/',
	    //url: 'http://localhost:8082/updateData/',
        method: 'POST',
	    headers: headers,
	    //form: {'bar_id': '12'}
	    form : {
			moyenne : Math.round(moyenne*100)/100,
			data : data
		}
	};
	
	console.log("send temp " + moyenne);
	// Start the request
	request(options, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        // Print out the response body
	        console.log(body)
	    }else{
		console.log("error" + error +  response.statusCode);
		}
	});
}


