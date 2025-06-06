# MongoDB-BiblioAPI

Ce projet a été réalisé par Brunic Feyou, Léora Chriqui et Aurore Dimech (GROUPE J), pour la matière Base de données - NoSQL

## Prérequis & Installation

Il est nécessaire d'avoir Postman ou un logiciel permettant d'éxécuter des actions sur des ressources.

Pour mettre en place ce projet, veuillez suivre les étapes suivantes :
1. Cloner le projet (`git clone git@github.com:Leoratz/MongoDB-BiblioAPI.git`)
2. Copier le .env.example et le renommer en .env, et remplir les informations nécessaires
3. Dans le dossier du projet, faire :
    - `npm i`
    - `npm run seed`
    - `npm run dev`

Vous aurez alors accès à notre api basée du MongoDB.

## Fonctionnement de l'API

Cette API sert à optimiser la gestion d'une librairie. Elle contient donc divers outils servant ce but.

### Gestion des livres

Il est possible de :
- consulter la liste des livres
- voir la fiche d'un livre en particulier
- créer des livres
- mettre à jour des livres
- supprimer des livres

### Gestion des librairies

Il est possible de :
- consulter la liste des librairies
- voir la fiche d'une librairie en particulier
- créer des librairies 
- mettre à jour des librairies
- supprimer des librairies

### Gestion des clients

Il est possible de :
- consulter la liste des clients
- voir la fiche d'une client en particulier
- créer des clients
- mettre à jour des clients
- supprimer des clients

### Affichage des statistiques

Vous pouvez trouver des statistiques sur :
- le nombre moyen de livres acheté par client
- le nombre de livre achetés d'un vendeur, et combien de ses livres sont sur le marché
- le nombre de livre existant pour chacun des formats

### Fonctionnalités supplémentaires :

Il est possible de :
- voir le nombre total de livres par librairie
- acheter un livre (il est alors placé dans la liste du client et retiré du stock de la librairie d'où il vient ; Si la librairie ne possède pas ce livre-ci ou qu'elle ne possède pas de stock)
- utiliser des filtres sur les clients, librairies et livres