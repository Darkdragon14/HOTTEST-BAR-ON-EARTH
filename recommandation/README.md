# Recommandation

Attention pour le moment ne fonctionne pas encore, on peu juste faire des requête dessus mais il crash lors du calcul !!!

Permet de faire de la recommendation pour cela nous utilisons :
* [nearest-neighbor](https://www.npmjs.com/package/nearest-neighbor)
* [likely](https://www.npmjs.com/package/likely)

remplacer le hostanme et le port dans dataLive et dataRecoWithLive selon votre besoin.
Pour l'utiliser avec Docker il suffit d'utiliser le ficheir Dockerfile pour cela il faut lancer la commande dans le dossier recommendation :
```
docker build . --tag nameImage
docker run -d -p 8080:8080 --name nameImage
```

Pour installer les modules utilisés en dehors de Docker :
```
npm install
```

Pour lancer l'application :
```
npm start
```

Une fois après que l'application soit lancé, si vous voulez tester, il faut faire :
```
npm test
```
