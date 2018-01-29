/****************************************************************
Les dépendances
****************************************************************/
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const nn = require('nearest-neighbor');
const request = require('request');

//adresse à modifier si nécessaire 
const host = '148.60.36.28';
const portNoSQL = 3000;
const portSQL = 3030;

//les différentes requêtes
const dataLive = {
  hostname: host,
  port: portNoSQL,
  path: '/getDataLive',
  method: 'GET',
};

const recupAvis = {
	hostname: host,
	port: portNoSQL,
	path: '/avis',
	method: 'GET',
}

const recupUsers = {
	hostname: host,
	port: portSQL,
	path: '/userProfil',
	method: 'GET',
}

const recupDonneeBar = {
	hostname: host,
	port: portNoSQL,
	path: '/dataBar',
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
				  	url: "http://"+host+":"+port+"/sendRecommandations",
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
CalculRecommendationV2();
setInterval(CalculRecommendation, 3600000);

/****************************************************************
Prise en compte de ces préférences
****************************************************************/
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
						probability = probability * (bar.note * 0.2);
						var options = { 
					  		method: 'POST',
						  	url: "http://"+host+":"+port+"/sendRecommandations",
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
Système avec auto apprentissage des préférences utilisateur
par rapport aux notes qu'il a mises précédement.
****************************************************************/
function CalculRecommendationV2(){
	var avis = new Array();
	var donneeBar = new Array();
	http.get(recupAvis, function(resp){
	resp.setEncoding('utf8');
		resp.on('data', function (chunk) {
			avis = JSON.parse(chunk);
		});
	}).on("error", function(e){
  		console.log("Got error: " + e.message);
	});
	http.get(recupDonneeBar, function(resp){
	resp.setEncoding('utf8');
		resp.on('data', function (chunk) {
			donneeBar = JSON.parse(chunk);
		});
	}).on("error", function(e){
  		console.log("Got error: " + e.message);
	});	
	//attente pour être sur d'avoir toutes les données
	setTimeout(function(){
		var userFait = new Array();
		var avisTri = new Array();
		var paramUser = new Array();
		for(var i = 0; i < avis.length; i++){
			if(userFait.indexOf(avis[i].IDUser) == -1){
				userFait.push(avis[i].IDUser);
				avisTri[avisTri.length] = new Array();
			}
			avisTri[userFait.indexOf(avis[i].IDUser)].push({IDBar: avis[i].IDBar, note: avis[i].note, date: avis[i].date});
			if(i == avis.length - 1){
				var paramUser = new Array();
				for(var j = 0; j < userFait.length; j++){
					avisTri[j].sort(function(a,b){
						return a.note - b.note;
					});
					var valSup;
					var count = 0;
					for(var k = avisTri[j].length-1; k > -1; k--){
						if(k == avisTri[j].length-1){
							valSup = avisTri[j][k].note;
							count++;
						}
						else{
							if(valSup == avisTri[j][k].note){
								count++;
							}
						}
						if(k == 0){
							count = avisTri[j].length - count;
							avisTri[j] = avisTri[j].slice(count);
							for(var l = 0; l < avisTri[j].length; l++){
								var tmp = donneeBar.find(donneeBar => avisTri[j][l].IDBar == donneeBar.IDBar && avisTri[j][l].date == donneeBar.date);
								tmp.IDUser = userFait[j];
								tmp.note = avisTri[j][l].note;
								paramUser.push(tmp);
							}
							if(j == userFait.length-1){
								var x = 0;
								for(var m = 0; m < paramUser.length; m++){
									var query = paramUser[m];
									var items = paramUser.slice();
									items = items.filter(items => items.IDUser != paramUser[m].IDUser);
									nn.findMostSimilar(query, items, fields, function(nearestNeighbor, probability) {
										probability = probability * (nearestNeighbor.note * 0.2);
										var options = { 
									  		method: 'POST',
										  	url: "http://"+host+":"+port+"/sendRecommandations",
										  	headers: {'Content-Type': 'application/json'},
										  	body: { IDUser: query.IDUser, IDBar: nearestNeighbor.IDBar, Probability: probability },
										  	json: true 
										};
										request(options, function (error, response, body) {
										  	if (error) throw new Error(error);
										});
									});
								}
							}
						}
					}
				}
			}
		}
	}, 5000);
}

/****************************************************************
Ports d'écoute
****************************************************************/
server.listen(8000, function(){
    console.log("server running 8000")
});
