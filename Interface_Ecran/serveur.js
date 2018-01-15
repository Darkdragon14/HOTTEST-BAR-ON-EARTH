var express =require('express');
var app = express();
var http = require('http').Server(app);
//var io = require('socket.io')(http);

app.use(express.static(__dirname +'/js'));
app.use(express.static(__dirname +'/css'));

var ecran=require("/Users/hippolytelacassagne/Documents/ESIR/Technique/NSOC/Night-advisor/Interface_Ecran/js/ui_ecran.js");

app.get('/', function(req, res){
    res.sendfile('html/ui_ecran.html');
});

http.listen(8080, function(){
	console.log('listening on *:8080');
});

ecran.refreshTemperature(20);
ecran.refreshNbPersonne(50);