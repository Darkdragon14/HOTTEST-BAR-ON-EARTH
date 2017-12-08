var mongo = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

var TemperatureCollection = "TemperatureCollection";
var PersonneCollection = "PersonneCollection";
var SoundCollection = "SoundCollection";

var collectionExisting = [];

var db;
MongoClient.connect(url, function(err, database) {
  if (err) throw err;

  		db=database;
  		var array = getTemperature();
      writeTemperature(22);
});



function writeTemperature (temperatureBar){

  var myobj = { temperature: temperatureBar, date: new Date() };

  db.collection(TemperatureCollection).insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted" + res);

    db.close();
  }); 

}

function writeSound(niveauDbBar){

  var myobj = { niveau: niveauDbBar, date: new Date() };

  db.collection(SoundCollection).insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted" + res);

    db.close();
  }); 

}

function writePersonne (nbPersonneBar){

  var myobj = { nbPersonne: nbPersonneBar, date: new Date() };

  db.collection(PersonneCollection).insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted" + res);

    db.close();
  }); 

}

function getTemperature (){
	var res=5;
	db.collection(TemperatureCollection).find().toArray(function(err, result) {
    	if (err) throw err;
    	console.log(result);
    	var res= result;
    	db.close();
   
    // result.forEach(function(objet){
    // 	console.log(objet.temperature);
    // });
    
  });
	console.log(res);
}


function getPersonne (){
	var res=5;
	db.collection(PersonneCollection).find().toArray(function(err, result) {
    	if (err) throw err;
    	console.log(result);
    	var res= result;
    	db.close();
  });
}

function getSound(){
	var res=5;
	db.collection(SoundCollection).find().toArray(function(err, result) {
    	if (err) throw err;
    	console.log(result);
    	var res= result;
    	db.close();
  });
}



function clean() {

	db.collection(TemperatureCollection).drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    db.close();
  });
}