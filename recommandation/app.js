/****************************************************************
Les dépendacnes
****************************************************************/
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const nn = require('nearest-neighbor');
const Recommender = require('likely');
const request = require('request');

const dataLive = {
  hostname: 'db_server',
  port: 3000,
  path: '/getDataLive',
  method: 'GET',
};

/* var dataRecoWithLive = {
	url: 'localhost:3000/sendRecommandations',
  	method: 'POST',
}*/

//Pour un poid plus fort d'un valeur il faut répéter l'élément plusieurs fois
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
			console.log(query);
			console.log(fields);
			console.log(items);
		    nn.findMostSimilar(query, items, fields, function(nearestNeighbor, probability) {
			  	//console.log(query);
			  	console.log(nearestNeighbor);
			  	console.log(probability);
			  	console.log([{IDUser: query.IDUser, IDBar: nearestNeighbor.IDBar, Probability: probability}]);
			  	//dataRecoWithLive.json = {"IDUser": query.IDUser, "IDBar": nearestNeighbor.IDBar, "Probability": probability};

			  	var options = {
			  		method: 'POST',
				  	url: 'http://db_server:3000/sendRecommandations',
				  	headers: {'Content-Type': 'application/json'},
				  	body: { IDUser: query.IDUser, IDBar: nearestNeighbor.IDBar, Probability: probability },
				  	json: true
				};

				request(options, function (error, response, body) {
				  if (error) throw new Error(error);

				  console.log(body);
				});
				/*request(dataRecoWithLive, function (error, response, body) {
				  	if (!error && response.statusCode == 200) {
				    	console.log(body.id) // Print the shortened url.
				  	}
				});*/
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

}

/****************************************************************
Ports d'écoute
****************************************************************/
server.listen(8000, function(){
    console.log("server running 8000")
});
