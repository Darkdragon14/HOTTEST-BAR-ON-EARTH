const address_server = "172.20.10.3";
var io = require('socket.io');
var socket = io('http://'+address_server);
var bdd_bar=require("../BDD-BAR/app.js");

socker.on('request',function(){
	console.log("une requete du serveur !");
	var temperature;
	var nbPersonne;
	bdd_bar.getData("TemperatureCollection")
	.then(function(res){
		temperature=res[res.length-1].temperature;
	});
	bdd_bar.getData("PersonneCollection")
	.then(function(res){
		nbPersonne=res[res.length-1].nbPersonne;
	});

	var data = {
		temperature : temperature,
		nbPersonne : nbPersonne
	};

	socket.emit('response_data',data);	
});