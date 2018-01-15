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
  { IDUser: "John", temperature: 18, bar: "Biere", musique: "pop", occupation: 11},
  { IDUser: "Barbara", temperature: 25, bar: "Vin", musique: "rap", occupation: 15 },
  { IDUser: "Ted", temperature: 20, bar: "Biere", musique: "dance", occupation: 20 },
  { IDUser: "Barney", temperature: 22, bar: "Whisky", musique: "electro", occupation: 30 },
  { IDUser: "Lilly", temperature: 22, bar: "Vin", musique: "metal", occupation: 5 },
  { IDUser: "Marshall", temperature: 15, bar: "Biere", musique: "rap", occupation: 12 },
]

var avis = [
  { IDUser: "John", IDBar: "bar1", note: 4},
  { IDUser: "John", IDBar: "bar2", note: 2},
  { IDUser: "John", IDBar: "bar3", note: 3},
  { IDUser: "John", IDBar: "bar4", note: 3},
  { IDUser: "John", IDBar: "bar5", note: 1},
  { IDUser: "John", IDBar: "bar6", note: 3},
  { IDUser: "Barbara", IDBar: "bar1", note: 4},
  { IDUser: "Barbara", IDBar: "bar2", note: 3},
  { IDUser: "Barbara", IDBar: "bar3", note: 2},
  { IDUser: "Barbara", IDBar: "bar4", note: 3},
  { IDUser: "Barbara", IDBar: "bar5", note: 3},
  { IDUser: "Barbara", IDBar: "bar6", note: 3},
  { IDUser: "Ted", IDBar: "bar1", note: 2},
  { IDUser: "Ted", IDBar: "bar2", note: 3},
  { IDUser: "Ted", IDBar: "bar3", note: 3},
  { IDUser: "Ted", IDBar: "bar4", note: 4},
  { IDUser: "Ted", IDBar: "bar5", note: 3},
  { IDUser: "Ted", IDBar: "bar6", note: 3},
  { IDUser: "Barney", IDBar: "bar1", note: 3},
  { IDUser: "Barney", IDBar: "bar2", note: 4},
  { IDUser: "Barney", IDBar: "bar3", note: 4},
  { IDUser: "Barney", IDBar: "bar4", note: 3},
  { IDUser: "Barney", IDBar: "bar5", note: 3},
  { IDUser: "Barney", IDBar: "bar6", note: 4},
  { IDUser: "Lilly", IDBar: "bar1", note: 3},
  { IDUser: "Lilly", IDBar: "bar2", note: 3},
  { IDUser: "Lilly", IDBar: "bar3", note: 2},
  { IDUser: "Lilly", IDBar: "bar4", note: 2},
  { IDUser: "Lilly", IDBar: "bar5", note: 4},
  { IDUser: "Lilly", IDBar: "bar6", note: 3},
  { IDUser: "Marshall", IDBar: "bar1", note: 1}, 
  { IDUser: "Marshall", IDBar: "bar2", note: 4},
  { IDUser: "Marshall", IDBar: "bar3", note: 2},
  { IDUser: "Marshall", IDBar: "bar4", note: 2},
  { IDUser: "Marshall", IDBar: "bar5", note: 2},
  { IDUser: "Marshall", IDBar: "bar6", note: 2}
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
  console.log(req.body);
  res.send("ok");
})

app.get("/allView", function(req, res){
  res.send(avis);
})

app.get("/allUser", function(req, res){
  res.send(user);
})

server.listen(3000, function(){
    console.log("server running 3000")
});

