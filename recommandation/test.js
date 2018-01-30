const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const bodyParser = require('body-parser');

var items = [
  { IDBar: "bar1", temperature: 18, bar: "Biere", musique: "pop", occupation: 11},
  { IDBar: "bar2", temperature: 25, bar: "Vin", musique: "rap", occupation: 15 },
  { IDBar: "bar3", temperature: 20, bar: "Whisky", musique: "dance", occupation: 20 },
  { IDBar: "bar4", temperature: 19, bar: "Biere", musique: "electro", occupation: 30 },
  { IDBar: "bar5", temperature: 22, bar: "Biere", musique: "rap", occupation: 5 },
  { IDBar: "bar6", temperature: 15, bar: "Whisky", musique: "classique", occupation: 12 },
];

var user = [
  { pseudo: "John", prefTemperature: 18, prefAmbiance: "Biere", styleMusique: "pop", prefFrequentation: 11},
  { pseudo: "Robin", prefTemperature: 25, prefAmbiance: "Vin", styleMusique: "rap", prefFrequentation: 15 },
  { pseudo: "Ted", prefTemperature: 20, prefAmbiance: "Biere", styleMusique: "dance", prefFrequentation: 20 },
  { pseudo: "Barney", prefTemperature: 22, prefAmbiance: "Whisky", styleMusique: "electro", prefFrequentation: 30 },
  { pseudo: "Lilly", prefTemperature: 22, prefAmbiance: "Vin", styleMusique: "metal", prefFrequentation: 5 },
  { pseudo: "Marshall", prefTemperature: 15, prefAmbiance: "Biere", styleMusique: "rap", prefFrequentation: 12 },
];

var soirBar = [
  { IDBar: "bar1", temperature: 18, bar: "Biere", musique: "pop", occupation: 11, date: "2017-10-28"},
  { IDBar: "bar2", temperature: 25, bar: "Vin", musique: "rap", occupation: 15, date: "2017-10-28"},
  { IDBar: "bar3", temperature: 20, bar: "Whisky", musique: "dance", occupation: 20, date: "2017-10-28"},
  { IDBar: "bar4", temperature: 19, bar: "Biere", musique: "electro", occupation: 30, date: "2017-10-28"},
  { IDBar: "bar5", temperature: 22, bar: "Biere", musique: "rap", occupation: 5, date: "2017-10-28"},
  { IDBar: "bar6", temperature: 15, bar: "Whisky", musique: "classique", occupation: 12, date: "2017-10-28"},
  { IDBar: "bar2", temperature: 18, bar: "Biere", musique: "pop", occupation: 11, date: "2017-11-25"},
  { IDBar: "bar4", temperature: 25, bar: "Vin", musique: "rap", occupation: 15, date: "2017-11-25"},
  { IDBar: "bar6", temperature: 20, bar: "Whisky", musique: "dance", occupation: 20, date: "2017-11-25"},
  { IDBar: "bar1", temperature: 19, bar: "Biere", musique: "electro", occupation: 30, date: "2017-11-25"},
  { IDBar: "bar3", temperature: 22, bar: "Biere", musique: "rap", occupation: 5, date: "2017-11-25"},
  { IDBar: "bar5", temperature: 15, bar: "Whisky", musique: "classique", occupation: 12, date: "2017-11-25"},
  { IDBar: "bar3", temperature: 18, bar: "Biere", musique: "pop", occupation: 11, date: "2017-12-01"},
  { IDBar: "bar5", temperature: 25, bar: "Vin", musique: "rap", occupation: 15, date: "2017-12-01"},
  { IDBar: "bar1", temperature: 20, bar: "Whisky", musique: "dance", occupation: 20, date: "2017-12-01"},
  { IDBar: "bar4", temperature: 19, bar: "Biere", musique: "electro", occupation: 30, date: "2017-12-01"},
  { IDBar: "bar6", temperature: 22, bar: "Biere", musique: "rap", occupation: 5, date: "2017-12-01"},
  { IDBar: "bar2", temperature: 15, bar: "Whisky", musique: "classique", occupation: 12, date: "2017-12-01"},
  { IDBar: "bar5", temperature: 18, bar: "Biere", musique: "pop", occupation: 11, date: "2017-12-03"},
  { IDBar: "bar1", temperature: 25, bar: "Vin", musique: "rap", occupation: 15, date: "2017-12-03"},
  { IDBar: "bar3", temperature: 20, bar: "Whisky", musique: "dance", occupation: 20, date: "2017-12-03"},
  { IDBar: "bar6", temperature: 19, bar: "Biere", musique: "electro", occupation: 30, date: "2017-12-03"},
  { IDBar: "bar2", temperature: 22, bar: "Biere", musique: "rap", occupation: 5, date: "2017-12-03"},
  { IDBar: "bar4", temperature: 15, bar: "Whisky", musique: "classique", occupation: 12, date: "2017-12-03"},
  { IDBar: "bar6", temperature: 18, bar: "Biere", musique: "pop", occupation: 11, date: "2017-12-08"},
  { IDBar: "bar4", temperature: 25, bar: "Vin", musique: "rap", occupation: 15, date: "2017-12-08"},
  { IDBar: "bar2", temperature: 20, bar: "Whisky", musique: "dance", occupation: 20, date: "2017-12-08"},
  { IDBar: "bar5", temperature: 19, bar: "Biere", musique: "electro", occupation: 30, date: "2017-12-08"},
  { IDBar: "bar3", temperature: 22, bar: "Biere", musique: "rap", occupation: 5, date: "2017-12-08"},
  { IDBar: "bar1", temperature: 15, bar: "Whisky", musique: "classique", occupation: 12, date: "2017-12-08"},
  { IDBar: "bar4", temperature: 18, bar: "Biere", musique: "pop", occupation: 11, date: "2017-12-16"},
  { IDBar: "bar6", temperature: 25, bar: "Vin", musique: "rap", occupation: 15, date: "2017-12-16"},
  { IDBar: "bar2", temperature: 20, bar: "Whisky", musique: "dance", occupation: 20, date: "2017-12-16"},
  { IDBar: "bar3", temperature: 19, bar: "Biere", musique: "electro", occupation: 30, date: "2017-12-16"},
  { IDBar: "bar1", temperature: 22, bar: "Biere", musique: "rap", occupation: 5, date: "2017-12-16"},
  { IDBar: "bar5", temperature: 15, bar: "Whisky", musique: "classique", occupation: 12, date: "2017-12-16"},
  { IDBar: "bar2", temperature: 18, bar: "Biere", musique: "pop", occupation: 11, date: "2017-12-03"},
  { IDBar: "bar1", temperature: 25, bar: "Vin", musique: "rap", occupation: 15, date: "2017-12-03"},
  { IDBar: "bar4", temperature: 20, bar: "Whisky", musique: "dance", occupation: 20, date: "2017-12-03"},
  { IDBar: "bar3", temperature: 19, bar: "Biere", musique: "electro", occupation: 30, date: "2017-12-03"},
  { IDBar: "bar6", temperature: 22, bar: "Biere", musique: "rap", occupation: 5, date: "2017-12-03"},
  { IDBar: "bar5", temperature: 15, bar: "Whisky", musique: "classique", occupation: 12, date: "2017-12-03"},
  { IDBar: "bar6", temperature: 18, bar: "Biere", musique: "pop", occupation: 11, date: "2017-10-06"},
  { IDBar: "bar5", temperature: 25, bar: "Vin", musique: "rap", occupation: 15, date: "2017-10-06"},
  { IDBar: "bar4", temperature: 20, bar: "Whisky", musique: "dance", occupation: 20, date: "2017-10-06"},
  { IDBar: "bar3", temperature: 19, bar: "Biere", musique: "electro", occupation: 30, date: "2017-10-06"},
  { IDBar: "bar2", temperature: 22, bar: "Biere", musique: "rap", occupation: 5, date: "2017-10-06"},
  { IDBar: "bar1", temperature: 15, bar: "Whisky", musique: "classique", occupation: 12, date: "2017-10-06"},
  { IDBar: "bar1", temperature: 18, bar: "Biere", musique: "pop", occupation: 11, date: "2017-10-24"},
  { IDBar: "bar2", temperature: 25, bar: "Vin", musique: "rap", occupation: 15, date: "2017-10-24"},
  { IDBar: "bar3", temperature: 20, bar: "Whisky", musique: "dance", occupation: 20, date: "2017-10-24"},
  { IDBar: "bar4", temperature: 19, bar: "Biere", musique: "electro", occupation: 30, date: "2017-10-24"},
  { IDBar: "bar5", temperature: 22, bar: "Biere", musique: "rap", occupation: 5, date: "2017-10-24"},
  { IDBar: "bar6", temperature: 15, bar: "Whisky", musique: "classique", occupation: 12, date: "2017-10-24"},
  { IDBar: "bar1", temperature: 18, bar: "Biere", musique: "pop", occupation: 11, date: "2017-10-25"},
  { IDBar: "bar2", temperature: 25, bar: "Vin", musique: "rap", occupation: 15, date: "2017-10-25"},
  { IDBar: "bar3", temperature: 20, bar: "Whisky", musique: "dance", occupation: 20, date: "2017-10-25"},
  { IDBar: "bar4", temperature: 19, bar: "Biere", musique: "electro", occupation: 30, date: "2017-10-25"},
  { IDBar: "bar5", temperature: 22, bar: "Biere", musique: "rap", occupation: 5, date: "2017-10-25"},
  { IDBar: "bar6", temperature: 15, bar: "Whisky", musique: "classique", occupation: 12, date: "2017-10-25"}
]

var avis = [
  { IDUser: "Ted", IDBar: "bar1", note: 2, date: "2017-10-28"},
  { IDUser: "Ted", IDBar: "bar2", note: 3, date: "2017-11-25"},
  { IDUser: "Ted", IDBar: "bar3", note: 3, date: "2017-12-01"},
  { IDUser: "Ted", IDBar: "bar4", note: 4, date: "2017-12-03"},
  { IDUser: "Ted", IDBar: "bar5", note: 3, date: "2017-12-08"},
  { IDUser: "Ted", IDBar: "bar6", note: 3, date: "2017-12-16"},
  { IDUser: "John", IDBar: "bar1", note: 4, date: "2017-10-06"},
  { IDUser: "John", IDBar: "bar2", note: 2, date: "2017-10-24"},
  { IDUser: "John", IDBar: "bar3", note: 3, date: "2017-10-25"},
  { IDUser: "John", IDBar: "bar4", note: 3, date: "2017-10-28"},
  { IDUser: "John", IDBar: "bar5", note: 1, date: "2017-11-25"},
  { IDUser: "John", IDBar: "bar6", note: 3, date: "2017-12-01"},
  { IDUser: "Robin", IDBar: "bar1", note: 4, date: "2017-12-03"},
  { IDUser: "Robin", IDBar: "bar2", note: 3, date: "2017-12-08"},
  { IDUser: "Robin", IDBar: "bar3", note: 2, date: "2017-12-16"},
  { IDUser: "Robin", IDBar: "bar4", note: 3, date: "2017-10-06"},
  { IDUser: "Robin", IDBar: "bar5", note: 3, date: "2017-10-24"},
  { IDUser: "Robin", IDBar: "bar6", note: 3, date: "2017-10-25"},
  { IDUser: "Lilly", IDBar: "bar1", note: 3, date: "2017-12-01"},
  { IDUser: "Lilly", IDBar: "bar2", note: 3, date: "2017-12-03"},
  { IDUser: "Lilly", IDBar: "bar3", note: 2, date: "2017-12-08"},
  { IDUser: "Lilly", IDBar: "bar4", note: 2, date: "2017-12-16"},
  { IDUser: "Lilly", IDBar: "bar5", note: 4, date: "2017-10-25"},
  { IDUser: "Lilly", IDBar: "bar6", note: 3, date: "2017-10-28"},
  { IDUser: "Barney", IDBar: "bar1", note: 3, date: "2017-10-25"},
  { IDUser: "Barney", IDBar: "bar2", note: 4, date: "2017-10-06"},
  { IDUser: "Barney", IDBar: "bar3", note: 4, date: "2017-10-24"},
  { IDUser: "Barney", IDBar: "bar4", note: 3, date: "2017-10-25"},
  { IDUser: "Barney", IDBar: "bar5", note: 3, date: "2017-10-28"},
  { IDUser: "Barney", IDBar: "bar6", note: 4, date: "2017-11-25"}, 
  { IDUser: "Marshall", IDBar: "bar1", note: 1, date: "2017-10-06"}, 
  { IDUser: "Marshall", IDBar: "bar2", note: 4, date: "2017-10-24"},
  { IDUser: "Marshall", IDBar: "bar3", note: 2, date: "2017-10-25"},
  { IDUser: "Marshall", IDBar: "bar4", note: 2, date: "2017-10-28"},
  { IDUser: "Marshall", IDBar: "bar5", note: 2, date: "2017-11-25"},
  { IDUser: "Marshall", IDBar: "bar6", note: 2, date: "2017-12-01"}
]

const testRequest = {
  hostname: 'localhost',
  port: 8000,
  path: '/newClient/Bob&pop&Biere&10&20',
  method: 'GET',
}

app.use(bodyParser.json());

app.get("/", function(req, res){
  http.get(testRequest, function(resp){
    resp.on('data', function (chunk) {
      res.send(chunk.toString());
      res.end();
    });
  });
})

app.get("/getDataLive", function(req, res){
  res.send(items);
})

app.post("/sendRecommandations", function(req, res){
  console.log('\ntest : ');
  console.log(req.body);
  res.send("ok");
})

app.get("/avis", function(req, res){
  res.send(avis);
})

app.get("/userProfil", function(req, res){
  res.send(user);
})

app.get("/dataBar", function(req, res){
  res.send(soirBar);
})

server.listen(3000, function(){
    console.log("server running 3000")
});

