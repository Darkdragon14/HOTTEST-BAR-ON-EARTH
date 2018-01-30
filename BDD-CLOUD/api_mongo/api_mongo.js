//Require
var express = require('express');
var http = require("http");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var port = 3000;
var app = express();
var myRouter = express.Router();



app.use(bodyParser.urlencoded({ extended: false }));
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

var dataBar = mongoose.Schema({
    IDBar: String,
    temperature: Number,
    bar: String,
    musique: String,
    occupation: Number,
    date: String
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
var DataBar = mongoose.model('DataBar', dataBar);



//ROUTES

//Principale
myRouter.route('/')
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

myRouter.route('/gatDashboard/:IDUser')
.get(function(req,res){
  Recommandations.find(req.params.IDUser).then(function(err, recommandations){
        if (err){
            res.send(err);
        }
        res.json(recommandations);
    });
})

app.get('/sendRecommandations/:IDUser', function(req, res){
  Recommandations.find(req.params.IDUser).then(function(err, recommandations){
    if (err){
      res.send(err);
    }
    res.json(recommandations);
  })
})


myRouter.route('/dataBar')
.get(function(req,res){
  DataBar.find(function(err, dataBar){
        if (err){
            res.send(err);
        }
        res.json(dataBar);
    });
})
.post(function(req,res){
      var dataBar = new DataBar();
      dataBar.IDBar = req.body.IDBar;
      dataBar.temperature = req.body.temperature;
      dataBar.bar = req.body.bar;
      dataBar.musique = req.body.musique;
      dataBar.occupation = req.body.occupation;
      dataBar.date = req.body.date;
      dataBar.save(function(err){
        if(err){
          res.send(err);
        }
        res.json({message : "Données enregistrées"});
      });
});



//_______________________________________________________________________________________________
//    Serveur express
//_______________________________________________________________________________________________
app.use(myRouter);
app.listen(port, function(){
  console.log("Mon API MONGODB fonctionne sur http://localhost:"+port);
});
