//Require
var express = require('express');
var http = require("http");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var port = 3030;
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//_______________________________________________________________________________________________
//    MYSQL 
//_______________________________________________________________________________________________

//Database connection

var connection = mysql.createConnection({
  host     : 'mysql', // name process.env['MYSQL_PORT_3306_TCP_ADDR']
  user     : 'root', // process.env['MYSQL_ENV_MYSQL_USER']
  password : 'password', //process.env['MYSQL_ENV_MYSQL_PASSWORD']
  database : 'NightAdvisor'//process.env['MYSQL_ENV_MYSQL_DATABASE']

});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Vous êtes maintenant connecté sur la BDD MySql NSOC');
})


/*app.put('/employees/:employee_name', function (req, res) {
   connection.query('UPDATE `employee` SET `employee_salary`=?,`employee_age`=?,`id`=? where `employee_name`=?',[req.body.employee_salary, req.body.employee_age, req.body.id, req.params.employee_name], function (error, results, fields) {
   if (error) throw error;
   res.json({message : "Changement effectué"});
 });
});*/

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

    //var toto = {IDUser: results.name}, 
    console.log(results);
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

app.get('/profilBar', function (req, res) {
   connection.query('select * from profilBar', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

app.post('/profilBar', function (req, res) {
   var postData  = req.body;
   connection.query('INSERT INTO profilBar SET ?', postData, function (error, results, fields) {
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

app.get('/getBarList', function (req, res) {
   connection.query('select name from profilBar', function (error, results, fields) {
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
app.listen(port, function(){
  console.log("Mon API MYSQL fontionne sur://localhost:"+port);
});
