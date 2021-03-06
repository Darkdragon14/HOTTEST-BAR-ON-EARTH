var express =require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bdd_bar=require("../BDD-BAR/app.js");

app.use(express.static(__dirname +'/js'));
app.use(express.static(__dirname +'/css'));

//var ecran=require("/Users/hippolytelacassagne/Documents/ESIR/Technique/NSOC/Night-advisor/Interface_Ecran/js/ui_ecran.js");

app.get('/', function(req, res){
    res.sendfile('html/ui_ecran.html');
});

var sock;
io.on('connection', function(socket){
    sock=socket;

    //////////Refresh de la temperature////////////
    bdd_bar.getData("TemperatureCollection")
	.then(function(res){
		refreshTemperature(res[res.length-1].temperature);
	});
    setInterval(function(){
	    bdd_bar.getData("TemperatureCollection")
		.then(function(res){
			refreshTemperature(res[res.length-1].temperature);
		});
	}, 30000);			//toutes les 5 minutes

    //////////Refresh du nb de personne////////////
	bdd_bar.getData("PersonneCollection")
	.then(function(res){
		refreshNbPersonne(res[res.length-1].nbPersonne);
	});
	setInterval(function(){
	    bdd_bar.getData("PersonneCollection")
		.then(function(res){
			refreshNbPersonne(res[res.length-1].nbPersonne);
		});
	}, 60000);			//toutes les minutes

});


http.listen(8090, function(){
	console.log('listening on *:8090');
});

function refreshTemperature(temperature){
    sock.emit('refreshTemperature',temperature);
}

function refreshNbPersonne(nbPersonne){
    sock.emit('refreshNbPersonne',nbPersonne);
}
