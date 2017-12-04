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
  hostname: 'BddNoSQL',
  port: 8080,
  path: '/getDataLive',
  method: 'GET',
};

var dataRecoWithLive = {
	hostname: 'BddNoSQL',
  	port: 8080,
 	path: '/sendRecommendation',
  	method: 'POST',
}


/****************************************************************
Lorsqu'un client se connect à l'application
****************************************************************/
app.get('/newClient/:IDUser&:musique&:bar&:occupation&:temperature', function(req, res){
    var query = {IDUser: req.params.IDUSer, musique: req.params.musique, bar: req.params.bar, occupation: req.params.occupation, temperature: req.params.temperature};
    //Pour un poid plus fort d'un valeur il faut répéter l'élément plusieurs fois
    var fields = [
	  	{ name: "occupation", measure: nn.comparisonMethods.number, max: 500 },
	  	{ name: "temperature", measure: nn.comparisonMethods.number, max: 50 },
	  	{ name: "bar", measure: nn.comparisonMethods.word }, 
	  	{ name: "musique", measure: nn.comparisonMethods.word },
	];
    res.send("Ok");
    http.get(dataLive, function(resp){
		resp.setEncoding('utf8');
		resp.on('data', function (chunk) {
		    nn.findMostSimilar(query, items, fields, function(nearestNeighbor, probability) {
			  	console.log(query);
			  	console.log(nearestNeighbor);
			  	console.log(probability);
			  	var dataRecoWithLive.json = [{IDUser: query.IDUser, IDBar: nearestNeighbor.IDBar, Probability: probability}];
				request(dataRecoWithLive, function (error, response, body) {
				  	if (!error && response.statusCode == 200) {
				    	console.log(body.id) // Print the shortened url.
				  	}
				});
			});
		});
	}).on("error", function(e){
  		console.log("Got error: " + e.message);
	});
});


/*
CalculRecommendation();
setInterval(CalculRecommendation(), 3600000);

function CalculRecommendation(){

}
*/



/****************************************************************
Ports d'écoute
****************************************************************/
server.listen(8080, function(){
    console.log("server running 8080")
});