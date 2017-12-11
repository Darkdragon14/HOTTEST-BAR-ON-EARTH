//Require
var express = require('express');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var port = 3000;
var hostname = 'db_server';
var app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://mongo/nightadvisor') ;

var avisUsers = mongoose.Schema({
    idUser: String,
    idBar: String,
    note: Number,
});

var Avis = mongoose.model('Avis', avisUsers);
var myRouter = express.Router();

myRouter.route('/')
.all(function(req,res){
      res.json({message : "Bienvenue sur la base de donnée de Night Advisor"});
});

myRouter.route('/avis/')
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
        res.json({message : "L'avis est maintenant enregistré"});
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

});

app.use(myRouter);
app.listen(port, function(){
	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port);
});
