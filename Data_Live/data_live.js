const address_server = "192.168.0.0";
var socket = io('http://'+address_serveur);
var bdd_bar=require("../BDD-BAR/app.js");

socker.on('request',function(){
	var temperature;
	var nbPersonne;
	bdd_bar.getData("TemperatureCollection")
	.then(function(res){
		temperature=res[res.length-1].temperature);
	});
	bdd_bar.getData("PersonneCollection")
	.then(function(res){
		nbPersonne=res[res.length-1].nbPersonne);
	});

	var data = {
		temperature : temperature,
		nbPersonne : nbPersonne
	};

	socket.emit('response_data',data);	
});