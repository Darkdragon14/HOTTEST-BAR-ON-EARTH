//const jsdom = require("jsdom");
//const { JSDOM } = jsdom;


/////////////////probleme require (voir page html)
/////////////////impossible d'utiliser les fonction dans d'autres fichiers
/*
exports.refreshTemperature =function (temperature){
	require(['jsdom'], function (jsdom) {
	    const { JSDOM } = jsdom;
		JSDOM.fromFile("/Users/hippolytelacassagne/Documents/ESIR/Technique/NSOC/Night-advisor/Interface_Ecran/html/ui_ecran.html").then(function(dom){
			temperatureElement = dom.window.document.getElementById("temperature");
			temperatureElement.textContent=temperature;
		});
	});
}

exports.refreshNbPersonne =function (nbPersonne){
	require(['jsdom'], function (jsdom) {
	    const { JSDOM } = jsdom;
		JSDOM.fromFile("/Users/hippolytelacassagne/Documents/ESIR/Technique/NSOC/Night-advisor/Interface_Ecran/html/ui_ecran.html").then(function(dom){
			nbPersonneElement = dom.window.document.getElementById("nbPersonne");
			nbPersonneElement.textContent=nbPersonne;
		});
	});
}*/

var socket = io();

socket.on('refreshTemperature',function(temperature){
	temperatureElement = document.getElementById("temperature");
	temperatureElement.textContent=temperature;
});

socket.on('refreshNbPersonne',function(nbPersonne){
	nbPersonneElement = document.getElementById("nbPersonne");
	nbPersonneElement.textContent=nbPersonne;
});