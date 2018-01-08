//var WebSocket = require('ws');
//var socket = new WebSocket("ws://www.example.com/socketserver");
//var socket=io.connect('http://localhost:8082');


var bdd_bar=require("../BDD-BAR/app.js");
var sensor=require("node-dht-sensor");
const request = require('request');					/////////////http ok, recuperer la bonne temperature avec la bdd

// Set the headers
var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
};


setTimeout(function(){calculMoyenneTemp();}, 2000);
setTimeout(function(){conversion();}, 2000);




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

var somme;
var i;

function calculSommeTemp(res,callback){
	res.forEach(function(obj){
 		somme=somme+obj.temperature;
 		i++;
	});
	callback();
}


function calculMoyenneTemp (){
	somme=0;
	i=0;
	var temperature;
	bdd_bar.getData("TemperatureCollection")
		.then(function(res){
			calculSomme(res,function(){
				var moyenne = somme/i;
				sendToServer(moyenne,"temperature");
				// bdd_bar.clean("TemperatureCollection");
			})
		});
/*
	var data=JSON.parse(db.getData(PersonneCollection)
      .then(function(res){
        res.forEach(function(obj){
          console.log(obj.nbPersonne + "à " + obj.date);
        });
      }););
	var somme;
	data.forEach(function(object){
		somme=somme+object.temperature;			//vérifier que temperature n'est pas une string
	})*/
	
	//var moyenne = somme/i;
	//console.log("La moyenne est "+moyenne);
	//sendToServer(moyenne,"temperature");
	//cleandb.clean();
//	return Math.round(moyenne);
}
/*
function calculMoyennedB (){
	var data=JSON.parse(get30Sound());
	var somme;
	for(var i in data.datas[]){							//si le tableau a un nom
		somme=somme+data.datas[i].son;			//sinon data[i].temperarure
	}
	var moyenne = somme/i;
	sendToServer(moyenne,"son");
	//return Math.round(moyenne);
}

function calculMoyennePersonne (){
	var data=JSON.parse(getNbPersonne());
	var somme;
	for(var i in data.datas[]){							//si le tableau a un nom
		somme=somme+data.datas[i].personne;			//sinon data[i].temperarure
	}
	var moyenne = somme/i;
	sendToServer(moyenne,"presence");
	//return Math.round(moyenne);
}
*/

function sendToServer (moyenne, data){
	/*var msg={
		moyenne : Math.round(moyenne),
		data : data
	};*/

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


