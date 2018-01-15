const jsdom = require("jsdom");
const { JSDOM } = jsdom;

/////////////////probleme require (voir page html)
/////////////////impossible d'utiliser les fonction dans d'autres fichiers

exports.refreshTemperature =function (temperature){
	JSDOM.fromFile("/Users/hippolytelacassagne/Documents/ESIR/Technique/NSOC/Night-advisor/Interface_Ecran/html/ui_ecran.html").then(function(dom){
		temperatureElement = dom.window.document.getElementById("temperature");
		temperatureElement.textContent=temperature;
	});
}

exports.refreshNbPersonne =function (nbPersonne){
	JSDOM.fromFile("/Users/hippolytelacassagne/Documents/ESIR/Technique/NSOC/Night-advisor/Interface_Ecran/html/ui_ecran.html").then(function(dom){
		nbPersonneElement = dom.window.document.getElementById("nbPersonne");
		nbPersonneElement.textContent=nbPersonne;
	});
}
