var nn = require('nearest-neighbor');
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

var items = [
  { name: "bar1", temperature: 18, bar: "Biere", musique: "pop", occupation: 11},
  { name: "bar2", temperature: 25, bar: "Vin", musique: "rap", occupation: 15 },
  { name: "bar3", temperature: 20, bar: "Wisky", musique: "dance", occupation: 20 },
  { name: "bar4", temperature: 19, bar: "Biere", musique: "electro", occupation: 30 },
  { name: "bar5", temperature: 22, bar: "Biere", musique: "rap", occupation: 5 },
  { name: "bar6", temperature: 15, bar: "Wisky", musique: "classique", occupation: 12 },
];

var query = { IDUser: "Bob", temperature: 22.5, bar: "Bière", musique: "pop", occupation: 10};

var fields = [
  { name: "temperature", measure: nn.comparisonMethods.number, max: 50 },
  { name: "bar", measure: nn.comparisonMethods.word }, 
  { name: "musique", measure: nn.comparisonMethods.word },
  { name: "occupation", measure: nn.comparisonMethods.number, max: 500 },
];

nn.findMostSimilar(query, items, fields, function(nearestNeighbor, probability) {
  console.log([{IDUser: query.IDUser, IDBar: nearestNeighbor.name, Probability: probability}]);
});

const testRequest = {
  hostname: 'localhost',
  port: 8000,
  path: '/newClient/Bob&pop&Biere&10&20',
  method: 'GET',
}

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

/*app.post("/sendRecommandations", function(req, res){
  console.log(req.body);
  res.send("ok");
})*/

server.listen(8080, function(){
    console.log("server running 8080")
});

