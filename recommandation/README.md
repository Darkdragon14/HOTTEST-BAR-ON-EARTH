# Recommandation

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

Si vous voulez tester, il faut faire :
```
npm test
```
Ensuite aller sur un naviagateur wbe et faite [localhost:8000](http://localhost:8000). vous poouvez voir le résultat dans le terminal.