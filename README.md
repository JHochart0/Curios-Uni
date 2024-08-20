# Site web type petites annonces "Curios'Uni"

Ce site web est un site de petites annonces qui permet aux utilisateurs de poster des annonces d'échange d'objets de collections de toutes sortes (exemple : timbres, cartes à collectionner, vieux CDs ...).

Ce site web n'est en aucun cas un site officiel, il ne sert qu'à mettre en oeuvre mes compétences acquises en Node.Js, EJS et MongoDB.

Il n'est évidemment pas terminé puisque je le mets à jour durant mon temps libre et quand l'envie m'y prend.

Si vous voulez tout-de-même le tester de votre côté, vous pouvez cloner ce projet et suivre les étapes suivantes pour le lancer :

1. Remplir les informations nécessaires dans le fichier `.env` en suivant les variables dans le `example.env` (en sachant que la base de données utilisée fonctionne avec MongoDB Atlas, rien ne vous empêche de le modifier vous-même si vous voulez utiliser MongoDB en local)

2. Ouvrir un terminal dans le dossier "backend" et installer les dépendances en saisissant `npm install`

3. Allumer le site web en saisissant `nodemon server.js` dans le dossier backend

4. L'addresse URL du site est celle qui correspond à la variable "CLIENT_URL" dans le fichier `.env`
