var mongo = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

var TemperatureCollection = "TemperatureCollection";
var PersonneCollection = "PersonneCollection";
var SoundCollection = "SoundCollection";


var db;

MongoClient.connect(url, function(err, database) {
  if (err) throw err;

  		db=database;
  		
      /*
            ----   Exemple pour récupérer nombre de personne ----
      
      getData(PersonneCollection)
      .then(function(res){
        res.forEach(function(obj){
          console.log(obj.nbPersonne + "à " + obj.date);
        });
      });

            ----   Exemple pour écrire dans la bdd  -----
      
      writeTemperature(20.5);
      writeSound(12);
      writePersonne(21);
        

            ----    Exemple pour suppriemr toutes les données d'une collection :  ---
            
      clean(PersonneCollection);
     */
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

function getData (collection){
 
 return new Promise(function(resolve, reject) {
    var result = db.collection(collection).find().toArray();
    if (result) {
        resolve(result);
    } else {
        reject("Something went wrong: ");
      }
    });
}




function clean(collection) {

	db.collection(collection).drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    db.close();
  });
}