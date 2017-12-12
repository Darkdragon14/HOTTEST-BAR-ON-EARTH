//Require
var express = require('express');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var port = 3000;
var hostname = 'localhost'; 
var app = express();
var myRouter = express.Router(); 



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/nightadvisor') ;

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
myRouter.route('/')
.all(function(req,res){
      res.json({message : "Bienvenue sur la base de donnée de Night Advisor"});
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
>>>>>>> c7866c56e00269c4be81d74a2ac12b231fdcc4ad
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
      dataLive.IDBar = req.body.idBar;
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



app.use(myRouter);
app.listen(port, function(){
  console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port);
});
