# Étapes de création de projet Node.Js

1. Créer le dossier de projet

2. Créer un sous-dossier nommé "backend"

3. Aller dans ce sous-dossier dans le terminal, saisir `npm init` et juste remplacer la valeur de "entry point" par "server.js" (appuyer sur "entrée" pour le reste)

4. Créer le fichier "server.js" dans le dossier "backend"

5. Dans le dossier "backend", exécuter la commande `node server.js` (Cela permet de lancer le serveur web de s'y rendre avec le lien donné)

6. Pour exécuter un script que contient le fichier "package.json", saisir `npm run nom_du_script` (les scripts sont des commandes de terminaux saisies plus rapidement)

7. Pour installer un package, saisir `npm install nom_package` (exemple : `npm install nodemon`)

8. Créer le fichier "app.js" dans "backend" qui permet d'intégrer le package "Express"

9. Créer le dossier "public" dans "backend" pour y mettre les codes CSS, les images...

10. Créer le dossier "views" dans "backend" pour y mettre les vues "ejs" (équivalent pages html), les partials (morceaux de pages à inclure dans les pages principales comme un header par exemple) et les layouts (équivalent à un gabarit à utiliser plus-ou moins partout)

11. Si le site ne charge pas, il faut supprimer "node_modules" et "package-lock.json" dans backend, puis saisir `npm install`

12. Créer le dossier "routes" dans "backend" pour y mettre les différentes routes du site (exemple : "/teaching/web")

13. Créer le dossier "controllers" dans "backend" pour y mettre les différents controllers du site qui permettent de traiter les notions backend des pages

14. Pour utiliser MongoDB :</br>
-Ouvrir un terminal et saisir `mongod --dbpath <chemin>` pour démarrer le serveur MongoDB dans le dossier donné</br>
-Ouvrir un autre terminal et saisir `mongosh` pour manipuler le SGBD</br>
-Pour les différentes commandes, aller sur ce [lien](https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/Mongo_DB_Shell_Cheat_Sheet_1a0e3aa962.pdf)

15. Créer le dossier "models" dans "backend" pour insérer les fichiers JavaScript qui serviront à gérer les bases de données MongoDB grâce à mongoose