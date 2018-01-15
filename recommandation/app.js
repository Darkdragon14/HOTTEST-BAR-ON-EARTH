/****************************************************************
Les dépendances
****************************************************************/
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const nn = require('nearest-neighbor');
const request = require('request');

const host = 'localhost';
const port = 3000;

const dataLive = {
  hostname: host,
  port: port,
  path: '/getDataLive',
  method: 'GET',
};

const recupAvis = {
	hostname: host,
	port: port,
	path: '/allView',
	method: 'GET',
}

const recupUsers = {
	hostname: host,
	port: port,
	path: '/allUser',
	method: 'GET',
}

//Pour un poid plus fort d'une valeur il suffit répéter l'élément plusieurs fois ou de modifier l'ordre.
var fields = [
  	{ name: "temperature", measure: nn.comparisonMethods.number, max: 50 },
  	{ name: "bar", measure: nn.comparisonMethods.word }, 
  	{ name: "musique", measure: nn.comparisonMethods.word },
  	{ name: "occupation", measure: nn.comparisonMethods.number, max: 500 },
];

/****************************************************************
Lorsqu'un client se connect à l'application
****************************************************************/
app.get('/newClient/:IDUser&:musique&:bar&:occupation&:temperature', function(req, res){
    var query = {IDUser: req.params.IDUser, temperature: parseInt(req.params.temperature), bar: req.params.bar, musique: req.params.musique, occupation: parseInt(req.params.occupation)};    
    res.send("Ok");
    http.get(dataLive, function(resp){
		resp.setEncoding('utf8');
		resp.on('data', function (chunk) {
			var items = JSON.parse(chunk)
		    nn.findMostSimilar(query, items, fields, function(nearestNeighbor, probability) {
			  	var options = { 
			  		method: 'POST',
				  	url: 'http://localhost:port/sendRecommandations',
				  	headers: {'Content-Type': 'application/json'},
				  	body: { IDUser: query.IDUser, IDBar: nearestNeighbor.IDBar, Probability: probability },
				  	json: true 
				};
				request(options, function (error, response, body) {
				  	if (error) throw new Error(error);
				});
			});
		});
	}).on("error", function(e){
  		console.log("Got error: " + e.message);
	});
});

/****************************************************************
Calcul journalier
****************************************************************/
CalculRecommendation();
setInterval(CalculRecommendation, 3600000);

function CalculRecommendation(){
	var user = new Array();
	var avis = new Array();
	http.get(recupAvis, function(resp){
	resp.setEncoding('utf8');
		resp.on('data', function (chunk) {
			avis = JSON.parse(chunk);
		});
	}).on("error", function(e){
  		console.log("Got error: " + e.message);
	});
	http.get(recupUsers, function(resp){
	resp.setEncoding('utf8');
		resp.on('data', function (chunk) {
			user = JSON.parse(chunk);
		});
	}).on("error", function(e){
  		console.log("Got error: " + e.message);
	});	
	//Pour être sur d'avoir toutes les données
	setTimeout(function(){
		for(var j = 0; j < user.length; j++){
			var query = user[j];
			var items = user.slice();
			items.splice(j, 1);
			nn.findMostSimilar(query, items, fields, function(nearestNeighbor, probability) {
				var avisTri = avis.filter(avis =>  avis.IDUser === nearestNeighbor.IDUser);
				var bar = avisTri[0];
				for(var i = 1; i < avisTri.length; i++){
					if(avisTri[i].note > bar.note){
						bar = avisTri[i];
					}
					if(i == avisTri.length - 1){
						probability = probability * ((bar.note * 20)/100);
						var options = { 
					  		method: 'POST',
						  	url: 'http://localhost:port/sendRecommandations',
						  	headers: {'Content-Type': 'application/json'},
						  	body: { IDUser: query.IDUser, IDBar: bar.IDBar, Probability: probability },
						  	json: true 
						};
						request(options, function (error, response, body) {
						  	if (error) throw new Error(error);
						});
					}
				}
			});
		}
	}, 5000);
}

/****************************************************************
Ports d'écoute
****************************************************************/
server.listen(8000, function(){
    console.log("server running 8000")
});