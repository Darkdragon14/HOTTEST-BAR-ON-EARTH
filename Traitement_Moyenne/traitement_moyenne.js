//var WebSocket = require('ws');
//var socket = new WebSocket("ws://www.example.com/socketserver");
//var socket=io.connect('http://localhost:8082');

const address_server = "192.168.43.193" ;

var bdd_bar=require("../BDD-BAR/app.js");
//var sensor=require("node-dht-sensor");
const request = require('request');				

// Set the headers
var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
};


setTimeout(function(){calculMoyenneTemp();calculMoyennePersonne();}, 2000);



setInterval(function(){
				calculMoyenneTemp();
				calculMoyennePersonne();
			}, 120000);			//toute les minute pour la demo

var now = new Date();
var millisTill7 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 7, 00, 0, 0) - now;
if (millisTill7 < 0) {
     millisTill7 += 86400000; // it's after 7am, try 7am tomorrow.
}

setTimeout(function(){
				console.log("il est 7 heure");
				bdd_bar.clean("TemperatureCollection");
				bdd_bar.clean("PersonneCollection");
			}, millisTill7);		//!!!!!!!!!!!!!!!!!!!moyenne une fois par jour

var sommeTemp, sommePers;
var i, j;

function calculSommeTemp(res,callback){
	/*res.forEach(function(obj){
		console.log("Temperature valeur "+i+" : "+obj.temperature);
 		sommeTemp=sommeTemp+parseFloat(obj.temperature);
 		//console.log("somme Temperature apres ajout : "+sommeTemp);
 		i++;
	});*/
	if(!(res.length < 4)){		
		for (i; i<4; i++) {
			console.log("i" + i);
			console.log("Temperature valeur "+i+" : "+res[res.length-(i+1)].temperature);
			sommeTemp=sommeTemp+parseFloat(res[res.length-(i+1)].temperature);
		}
	}
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
				console.log("moyenne  de temperature : "+moyenne);
				sendToServer(moyenne,"temperature");
				// bdd_bar.clean("TemperatureCollection");		//supprimer les donnees car sinon la fonction prendra fera une moyenne de toute les donnees au lieu de faire sur les 30 derniere min
			})
		});
}

function calculSommePers(res,callback){
	/*res.forEach(function(obj){
		console.log("Personne valeur "+j+" : "+obj.nbPersonne);
 		sommePers=sommePers+parseInt(obj.nbPersonne);
 		//console.log("somme Personne apres ajout : "+sommePers);
 		j++;
	});*/

	for (j; j<2; j++) {
		console.log("Personne valeur "+j+" : "+res[res.length-(j+1)].nbPersonne);
 		sommePers=sommePers+parseFloat(res[res.length-(j+1)].nbPersonne);
	}

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
				console.log("moyenne nombre de personnes : "+moyenne);
			})
		});
}

function sendToServer (moyenne, data){
	// Configure the request
	var options = {
	    url: 'https://'+address_server+'/updateData/',
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


