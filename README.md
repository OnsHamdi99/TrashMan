# TrashMan
Jeu réalisé dans le cadre du concours [Games On Web 2023](https://www.cgi.com/france/fr-fr/event/games-on-web-2023)
ainsi que la [mineure DS4H](https://ds4h.univ-cotedazur.eu/education/minor-programming-3d-games-on-the-web) encadré
par le professeur **Michel Buffa**.

Lien du jeu en ligne : [Jouer TrashMan!](https://onshamdi99.github.io/TrashMan/)

Nous espérons que vous apprécierez jouer à TrashMan et que vous pourrez en apprendre davantage sur l'environnement en vous amusant !

# Description
TrashMan est un jeu 3D éducatif et amusant, conçu pour sensibiliser les joueurs aux enjeux environnementaux et leur apprendre comment trier les déchets. Dans ce jeu, vous incarnez un héros appelé TrashMan, dont la mission est de parcourir les rues pour ramasser les déchets qui y traînent.

L'inspiration pour ce jeu est venue du personnage de Batman et de son amour pour la ville de Gotham. En tant que les créateurs de TrashMan nous avons décidé de créer un jeu qui mettait en avant la protection de l'environnement et la lutte contre les déchets, tout en s'inspirant de l'univers de Batman.

# Screenshots

## Main page
![Menu](https://wmpics.space/di-XCRE.png)

## Levels page

L'idée principale est que le personnage principal doit courir et ramasser des déchets correspondants au niveau en cours (plastiques, organiques, verre, papier, etc.). S'il ramasse les bons déchets, il gagne des points, mais s'il ramasse les mauvais déchets, son score reste à zéro. Le jeu comporte également des obstacles que le joueur doit éviter en sautant ou en se déplaçant latéralement.

Un des niveaux est situé dans les rues de Paris, en référence aux grèves de poubelles qui ont eu lieu dans la ville en mars 2023.

![MenuLevel](https://wmpics.space/di-MTGF.png)

## Animations du personnage
### Idle
<div style="float:left; margin-right: 10px;"><img src="https://wmpics.space/di-CU3L.png" alt="PersoIdle" width="300px"></div>
Le personnage est immobile, attendant les instructions du joueur.

### Running
<div style="float:left; margin-right: 10px;"><img src="https://wmpics.space/di-SHHA.png" alt="PersoRunning" width="300px"></div>
Le personnage court pour ramasser les déchets.

### Jumping
<div style="float:left; margin-right: 10px;"><img src="https://wmpics.space/di-Q3J6.png" alt="PersoJumping" width="300px"></div>
Le personnage saute pour éviter les obstacles.

### Falling
<div style="float:left; margin-right: 10px;"><img src="https://wmpics.space/di-67Z2.png" alt="PersoFalling" width="300px"></div>
Le personnage tombe et c'est le game over.

## Difficultés rencontrées :

- Pour éviter la duplication de code, on a souhaité utiliser une classe abstraite et des classes héritées, mais a rencontré des difficultés techniques qui ont finalement conduit à la création de classes séparément.
- C'était la première fois que nous créons un jeu, ce qui a entraîné des difficultés dans l'apprentissage de la manipulation des mouvements.

## Problèmes notés :

- Les scènes prenaient du temps à charger, ce qui pouvait causer de l'impatience chez les joueurs.
- Il y avait beaucoup de duplication de code, ce qui rendait le code plus difficile à maintenir.
- Le déplacement du personnage n'était pas fluide, ce qui pouvait causer de la frustration chez les joueurs.
- La taille de l'écran ne s'adaptait pas aux changements, ce qui pouvait causer des problèmes de visibilité pour les joueurs.

## Ressources

Pour les modèles 3D Valeria Lapshina a réalisé le modèle du mesh à l'aide de Blender, les modèles de déchets et d'obstacles on a pris d'une [ressource](https://sketchfab.com/3d-models) libre.
Les [musiques](https://99sounds.org/free-sound-effects/) sont libre de droit.

Pour le code nous nous sommes appuyés sur le [cours](https://github.com/micbuffa/BabylonJS_course) 
de **Michel Buffa** et la documentation fournie par [Babylon.js](https://doc.babylonjs.com/).

## Auteurs

- [HAMDI Ons](https://github.com/OnsHamdi99)
- [LAPSHINA Valeria](https://github.com/hunnybunnyv)
- [SABAYO Alexandre](https://github.com/underblade)
