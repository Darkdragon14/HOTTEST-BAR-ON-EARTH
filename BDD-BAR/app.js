var mongo = require('mongodb');
var sensor = require('node-dht-sensor');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

var TemperatureCollection = "TemperatureCollection";
var PersonneCollection = "PersonneCollection";
var SoundCollection = "SoundCollection";


var db;

MongoClient.connect(url, function(err, database) {

  if (err) throw err;


  		db=database;
      console.log("test db");
});



function writeTemperatureFct (temperatureBar){

  var myobj = { temperature: temperatureBar, date: new Date() };

  db.collection(TemperatureCollection).insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted" + res);

   // db.close();
  }); 

}

exports.writeTemperature=writeTemperatureFct;

function writeSoundFct(niveauDbBar){

  var myobj = { niveau: niveauDbBar, date: new Date() };

  db.collection(SoundCollection).insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted" + res);

    db.close();
  }); 

}

exports.writeSound=writeSoundFct;

function writePersonne (nbPersonneBar){

  var myobj = { nbPersonne: nbPersonneBar, date: new Date() };

  db.collection(PersonneCollection).insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted" + res);

    db.close();
  }); 

}

exports.writePersonne=writePersonneFct;

var getDataFct = function getData (collection,callback){
console.log("test ok");
 return new Promise(function(resolve, reject) {
    var result = db.collection(collection).find().toArray();
    if (result) {
        resolve(result);
    } else {
        reject("Something went wrong: ");
      }
    });
}

exports.getData=getDataFct;



var cleanFct= function clean(collection) {

	db.collection(collection).drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    db.close();
  });
}

exports.clean=cleanFct;
