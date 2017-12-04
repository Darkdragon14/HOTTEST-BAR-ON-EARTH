//var WebSocket = require('ws');
//var socket = new WebSocket("ws://www.example.com/socketserver");
var socket=io.connect('http://localhost:8082');

var xhr = new XMLHttpRequest();
xhr.open('POST', 'http://localhost:8082/updateData', true);
xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
xhr.onload = function () {
    // do something to response
    console.log(this.responseText);
};
var temperature=21;
xhr.send('bar_id=12&temperature=temperature');

setInterval(function(){ 
			//	calculMoyenneTemp();
			//	calculMoyennedB(); 
			}, 300000);
setInterval(function(){ 
			//	calculMoyennePersonne();
			sendToServer("21","temperature");
			}, 60000);


var now = new Date();
var millisTill7 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 22, 0, 0) - now;
if (millisTill7 < 0) {
     millisTill7 += 86400000; // it's after 10am, try 10am tomorrow.
}
console.log("test : "+millisTill7);
setTimeout(function(){console.log("il est 7 heure");}, millisTill7);


/*
function calculMoyenneTemp (){
	var data=JSON.parse(getTemperature());
	var somme;
	data.forEach(function(object){
		somme=somme+object.temperature;			//vérifier que temperature n'est pas une string
	})
	var moyenne = somme/i;
	sendToServer(moyenne,"temperature");
//	return Math.round(moyenne);
}

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


function sendToServer (moyenne, data){
	var msg={
		moyenne : Math.round(moyenne),
		data : data
	};
	socket.emit('event',msg);
}
*/

