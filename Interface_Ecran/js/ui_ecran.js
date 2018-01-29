var socket = io();

socket.on('refreshTemperature',function(temperature){
	temperatureElement = document.getElementById("temperature");
	temperatureElement.textContent=temperature;
});

socket.on('refreshNbPersonne',function(nbPersonne){
	nbPersonneElement = document.getElementById("nbPersonne");
	nbPersonneElement.textContent=nbPersonne;
});