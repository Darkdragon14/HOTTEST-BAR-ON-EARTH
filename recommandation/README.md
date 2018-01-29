# Recommandation

Pour faire de la recommendation, nous utilisons :
* [nearest-neighbor](https://github.com/aschuch/node-nearest-neighbor)
Autres paquets utilisés :
* [express](https://github.com/expressjs/express)
* [request](https://github.com/request/request)

Dans le fichier app.js, nous pouvons trouver deux calculs :
* Le calcul quotidien qui permet de faire des calculs avec les données de l'utilisateur par rapport aux autres. 
* Le calcul lors de la connexion qui permet d'utiliser les données en temps réel des bars et de proposer à l'utilisateur un bar qui pourrait l'intéresser. 

Remplacer le hostname et le port dans app.js.
Pour l'utiliser avec Docker il suffit d'utiliser le ficheir Dockerfile pour cela il faut lancer la commande dans le dossier recommendation :
```
docker build . --tag nameImage
docker run -d -p 8000:8000 --name nameImage
```

Pour installer les modules utilisés en dehors de Docker :
```
npm install
```

Pour lancer l'application :
```
npm start
```

Si vous voulez tester, il faut faire :
```
npm test
```
Vous aurez au bout de 5s une réponse sur le terminal ce dernier étant le calcul quotidien. Si vous voulez essayer avec un calcul lors d'une connexion vous pouvez utiliser un naviagateur web et l'url : [localhost:3000](http://localhost:3000). De même que pour le calcul quotidien le résultat apparaîtra dans le terminal 