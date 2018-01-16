//Require
var express = require('express');
var http = require("http");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var mysql = require("mysql");
var port = 3000;
var hostname = 'db_server';
var app = express();
var myRouter = express.Router();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//_______________________________________________________________________________________________
//    MONGO DB (NO SQL)
//_______________________________________________________________________________________________


mongoose.connect('mongodb://mongo/nightadvisor') ;

//Modèles Mongoose
var avisUsers = mongoose.Schema({
    idUser: String,
    idBar: String,
    note: Number,
});

var temperature = mongoose.Schema({
    moyenne: String,
    data: String
});

var dataLive = mongoose.Schema({
    IDBar: String,
    temperature: Number,
    bar: String,
    musique: String,
    occupation: Number
});

var recommandations = mongoose.Schema({
    IDUser: String,
    IDBar: String,
    Probability: Number
});

var Avis = mongoose.model('Avis', avisUsers);
var Temperature = mongoose.model('Temperature', temperature);
var DataLive = mongoose.model('DataLive', dataLive);
var Recommandations = mongoose.model('Recommandations', recommandations);


//ROUTES

//Principale
myRouter.route('/bdd_na')
.all(function(req,res){
      res.json({message : "Bienvenue sur le serveur rattaché aux différentes bases de données de l'application Night Advisor"});
});

//Avis
myRouter.route('/avis')
.get(function(req,res){
	Avis.find(function(err, avis){
        if (err){
            res.send(err);
        }
        res.json(avis);
    });
})
.post(function(req,res){
      var avis = new Avis();
      avis.idUser = req.body.idUser;
      avis.idBar = req.body.idBar;
      avis.note = req.body.note;
      avis.save(function(err){
        if(err){
          res.send(err);
        }
        res.json({message : "Avis enregistré"});
      });
});


myRouter.route('/avis/:avis_id')
.get(function(req,res){
            Avis.findById(req.params.avis_id, function(err, avis) {
            if (err)
                res.send(err);
            res.json(avis);
        });
})

/*
.put(function(req,res){
                Avis.findById(req.params.avis_id, function(err, avis) {
                if (err){
                    res.send(err);
                }
                        avis.idUser = req.body.idUser;
                        avis.idBar = req.body.idBar;
                        avis.note = req.body.note;
                        avis.save(function(err){
                          if(err){
                            res.send(err);
                          }
                          res.json({message : "Avis mis à jour"});
                        });
                });
})
.delete(function(req,res){
    Avis.remove({_id: req.params.avis_id}, function(err, avis){
        if (err){
            res.send(err);
        }
        res.json({message:"Avis supprimé"});
    });

});*/

//Température
myRouter.route('/updateData')
.get(function(req,res){
  Temperature.find(function(err, temperature){
        if (err){
            res.send(err);
        }
        res.json(temperature);
    });
})
.post(function(req,res){
      var temperature = new Temperature();
      temperature.moyenne = req.body.moyenne;
      temperature.data = req.body.data;
      temperature.save(function(err){
        if(err){
          res.send(err);
        }
        res.json({message : "Temperature enregistrée"});
      });
});


//Recherche température par bar (avec l'idBar)
/*myRouter.route('/temperature/:temperature.moyTemp')
.get(function(req,res){
            Temperature.find({ 'moyTemp': 'variable' }, function(err, temperature) {
            if (err)
                res.send(err);
            res.json(temperature);
        });
})*/


//DataLive
myRouter.route('/getDataLive')
.get(function(req,res){
  DataLive.find(function(err, dataLive){
        if (err){
            res.send(err);
        }
        res.json(dataLive);
    });
})
.post(function(req,res){
      var dataLive = new DataLive();
      dataLive.IDBar = req.body.IDBar;
      dataLive.temperature = req.body.temperature;
      dataLive.bar = req.body.bar;
      dataLive.musique = req.body.musique;
      dataLive.occupation = req.body.occupation;
      dataLive.save(function(err){
        if(err){
          res.send(err);
        }
        res.json({message : "Données enregistrées"});
      });
});

//Recommandations
myRouter.route('/sendRecommandations')
.get(function(req,res){
  Recommandations.find(function(err, recommandations){
        if (err){
            res.send(err);
        }
        res.json(recommandations);
    });
})
.post(function(req,res){
      var recommandations = new Recommandations();
      recommandations.IDUser = req.body.IDUser;
      recommandations.IDBar = req.body.IDBar;
      recommandations.Probability = req.body.Probability;
      recommandations.save(function(err){
        if(err){
          res.send(err);
        }
        res.json({message : "Recommandation enregistrée"});
      });
});


//_______________________________________________________________________________________________
//    MYSQL 
//_______________________________________________________________________________________________

//Database connection

/*var connection = mysql.createConnection({
  host     : 'mysql', //mysql database host name
  user     : 'user', //mysql database user name
  password : 'password', //mysql database password
  database : 'test' //mysql database name
});

connection.connect(function(err) {
  if (err) throw err
  console.log('Vous êtes maintenant connecté sur la BDD MySql NSOC')
})*/

app.get('/employees', function (req, res) {
   connection.query('select * from employee', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});


app.put('/employees/:employee_name', function (req, res) {
   connection.query('UPDATE `employee` SET `employee_salary`=?,`employee_age`=?,`id`=? where `employee_name`=?',[req.body.employee_salary, req.body.employee_age, req.body.id, req.params.employee_name], function (error, results, fields) {
   if (error) throw error;
   res.json({message : "Changement effectué"});
 });
});

app.get('/login', function (req, res) {
   connection.query('select * from login', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

app.post('/login', function (req, res) {
   var postData  = req.body;
   connection.query('INSERT INTO login SET ?', postData, function (error, results, fields) {
   if (error) throw error;
   res.json({message : "Login effectué"});
 });
});

app.post('/register', function (req, res) {
   var postData  = req.body;
   connection.query('INSERT INTO register SET ?', postData, function (error, results, fields) {
   if (error) throw error;
   res.json({message : "Enregistrement effectué"});
 });
});

app.get('/userProfil', function (req, res) {
   connection.query('select * from profilUser', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

app.post('/userProfil', function (req, res) {
   var postData  = req.body;
   connection.query('INSERT INTO profilUser SET ?', postData, function (error, results, fields) {
   if (error) throw error;
   res.json({message : "Données enregistrées"});
 });
});

app.put('/updateProfil', function (req, res) {
   connection.query('UPDATE `profilUser` SET `nom`=?,`prenom`=?,`pseudo`=?,`email`=?,`dateNaissance`=?,`langue`=?,`adresse`=?,`codePostal`=?,`ville`=?,`styleMusique`=?,`prefAmbiance`=?,`prefFrequentation`=?,`prefTemperature`=?,`barPref1`=?,`barPref2`=?,`barPref3`=? where `id`=?', [req.body.nom,req.body.prenom, req.body.pseudo, req.body.email, req.body.dateNaissance,req.body.langue, req.body.adresse, req.body.codePostal, req.body.styleMusique, req.body.prefAmbiance, req.body.prefFrequentation, req.body.prefTemperature, req.body.prefBar1, req.body.prefBar2, req.body.prefBar3], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

app.get('/userBar', function (req, res) {
   connection.query('select * from profilUser', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

app.post('/userBar', function (req, res) {
   var postData  = req.body;
   connection.query('INSERT INTO profilUser SET ?', postData, function (error, results, fields) {
   if (error) throw error;
   res.json({message : "Données enregistrées"});
 });
});

app.put('/updateBar', function (req, res) {
   connection.query('UPDATE `profilUser` SET `nom`=?,`prenom`=?,`pseudo`=?,`email`=?,`dateNaissance`=?,`langue`=?,`adresse`=?,`codePostal`=?,`ville`=?,`styleMusique`=?,`prefAmbiance`=?,`prefFrequentation`=?,`prefTemperature`=?,`barPref1`=?,`barPref2`=?,`barPref3`=? where `id`=?', [req.body.nom,req.body.prenom, req.body.pseudo, req.body.email, req.body.dateNaissance,req.body.langue, req.body.adresse, req.body.codePostal, req.body.styleMusique, req.body.prefAmbiance, req.body.prefFrequentation, req.body.prefTemperature, req.body.prefBar1, req.body.prefBar2, req.body.prefBar3], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});


/*myRouter.route('/employees')
.get(function (req,res) {
   connection.query('select * from employee', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
.post(function (req, res) {
     var postData  = req.body;
     connection.query('INSERT INTO employee SET ?', postData, function (err, results, fields) {
     if (err) throw err;
     res.end(JSON.stringify(results));
   });
});*/



//_______________________________________________________________________________________________
//    Serveur express
//_______________________________________________________________________________________________
app.use(myRouter);
app.listen(port, function(){
  console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port);
});
