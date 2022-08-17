[![](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2013/05/vignette_googleio2013-1.jpg?resize=702%2C274&ssl=1)](https://blog.zenika.com/wp-content/uploads/2013/05/vignette_googleio2013-1.jpg)[Événements](https://blog.zenika.com/category/evenements/) 

# Retour sur le Google I/O 2013

[27 mai 2013](https://blog.zenika.com/2013/05/27/after-io-resume-du-google-io/ "9 h 00 min") [Julien Landuré](https://blog.zenika.com/author/jlandure2/ "Julien Landuré")

Le Google I/O 2013 a eu lieu cette année du 15 au 17 Mai à San Francisco rassemblant 6000 développeurs. C’était ma troisième participation et, encore une fois, cela a été un moment assez intense et magique. Cet article a pour but de présenter les différentes sessions auxquelles j’ai participé ainsi que les tendances des technos Google : AppEngine, AngularJS, Dart, GWT, Glass…  

Je tiens évidemment à remercier Zenika qui m’a permis de participer à cet évènement. Outre le fait d’apprendre, de rencontrer de nouvelles personnes et de représenter Zenika, c’était important pour moi d’être présent car il y avait un évènement dédié aux organisateurs de GDG (Google Developer Group) avant I/O.

### Keynote

L’édition de cette année planifiait une keynote de 3h alors que l’année dernière il y avait deux keynotes le mercredi et le jeudi matin.  
Voici quelques photos :  
![](https://lh5.googleusercontent.com/-oLujpFUeBMo/UaJ3P_3_XJI/AAAAAAAAFSk/Tn6E3DL4sEg/w1153-h865-no?feat=embedwebsite)![](https://lh5.googleusercontent.com/-ZTPE3o1RmZA/UaJ4GurORDI/AAAAAAAAFRI/rCFVx1mEF0Y/w1153-h865-no?feat=embedwebsite)  
C’était donc une keynote intense avec plusieurs interlocuteurs, qui commença par l’impeccable showman “Vic Gundotra” (Senior Vice president) et finit avec un jeu de Q/R avec “Larry Page” (Co-fondateur et CEO).  
Côté keynote, quelques annonces que je qualifierais “utilisateur” comme :

*   la refonte UI de Google+ (avec ses “cards”) avec 41 nouvelles fonctionnalités comme le fait de rendre plus jolies les images (“enhance”)
*   le lancement de Hangouts qui correspond à l’uniformisation de l’ensemble des services de messagerie instantanée Google
*   la nouvelle version de Google Maps qui incorpore l’équivalent de Google Earth et la fameuse phrase de la keynote : _« Those Clouds…..are realtime! »_ lorsque l’on dézoome et que l’on voit la terre, les nuages puis le soleil !
*   la sortie d’un nouveau service de streaming de musique
*   la sortie d’un Samsung Galaxy S4 basé sur un Android « pur »

Quelques chiffres aussi pour resituer Google :

*   900 millions d’activations Android
*   750 millions d’utilisateurs Chrome

Côté développeurs, nous avons eu le droit à quelques annonces liées à Android :

*   Sortie d’Android Studio, nouvel IDE basé sur IntelliJ pour développer et tester sur Android
*   “Google Play Games” et le Cross platform SDK pour développeurs de jeux videos avec achievements, leaderboards et multiplayer.

Une fois la keynote passée, j’ai suivi majoritairement des sessions Web&Cloud dont vous trouverez un résumé.

### Sessions

## Session “Cloud Platform Track Kickoff: Ushering in the Next Generation of Cloud Computing”

[Lien de la vidéo](https://developers.google.com/events/io/sessions/333265959)  
Cette session correspond tout simplement à la keynote “Cloud” de Google. En effet, durant la keynote officielle, pas grand chose n’a filtré concernant le Cloud de Google.

*   Compute engine est ouvert à tous avec une facturation à la minute : _“Pay only for what you use on ComputeEngine”_
*   Google AppEngine va faire tourner en runtime le PHP
*   Google Cloud Datastore est offert en tant qu’API et est donc accessible en dehors d’AppEngine.
*   Côté AppEngine, il est possible de gérer plusieurs langages au runtime d’une même instance. C’est la notion de “modularized app”.
*   Jboss a mis en place une stack permettant d’avoir une “iso compatibilité” avec les API AppEngine : c’est le projet [Dwarf](http://www.jboss.org/capedwarf). Il existe une autre solution concurrente [Appscale](https://github.com/AppScale/appscale/wiki).
*   ComputeEngine possède une API de monitoring et tout est disponible en REST API.

![](https://i0.wp.com/lh5.googleusercontent.com/-Gk1S_PUoPZ4/UZPszlAnSkI/AAAAAAAAAVA/myE2BgYiZ-A/w506-h282-o/Screen+Shot+2013-05-15+at+1.14.23+PM.png?w=800&ssl=1)  
Google a rapidement publié un [billet](http://googlecloudplatform.blogspot.fr/2013/05/google-compute-engine-is-now-open-to-all.html) contenant l’ensemble des informations.

## Session “Autoscaling Java”

[Lien de la vidéo](https://developers.google.com/events/io/sessions/333276583)  
La session est intéressante et montre quelques limites dans l’utilisation de Java dans le Cloud comme on le ferait tourner dans un SI classique. Évidemment, les Spring+Hibernate sont à proscrire si l’on veut des performances et économiser son argent !  
Toutes les notions de « classpath scanning », d’aspects, de proxification, de gestion d’état sont à éviter pour pouvoir “scaler”. A voir donc pour ceux qui se posent des questions sur la manière d’utiliser Java+AppEngine.  
![](https://i0.wp.com/lh6.googleusercontent.com/-Cfv2n2l70w0/UaMkYdhZMUI/AAAAAAAAFS4/3urs_rNtdeQ/w597-h374-no/antipattern.png?w=800&ssl=1)

## Session “Design Decisions in AngularJS”

[Lien de la vidéo](https://developers.google.com/events/io/sessions/325881193)  
La session est à conseiller pour comprendre la philosophie et l’intérêt d’un tel framework.  
Elle constitue une très bonne introduction à AngularJS et montre bien que l’équipe veut rester « HTML compliant » au maximum (_« web component »_ surfe sur la vague que ce soit pour Dart ou AngularJS). On découvre aussi que c’est un très bon framework pour collaborer avec des webdesigners. Et voici le slide qui me semble le plus intéressant : Google sort un feedback qui montre qu’ils sont passés de 17000 LOC (Lines Of Code) à 1500 LOC.  
![](https://lh3.googleusercontent.com/-43cd-Y_qhSc/UaJ3J8WQ3WI/AAAAAAAAFMc/Ievu9JSqBJk/w649-h865-no?feat=embedwebsite)  
Un googler a modifié le code en 3 semaines pour faire ça (mais il faut considérer que c’est une brute…)  
Pour information, pour la partie Web Component, la team d’AngularJS pense utiliser le projet [Polymer](http://polymer-project.appspot.com/). Le code présenté est [ici](https://github.com/mhevery/ng-google-io/commits/master).  
La salle de la session était remplie, ce qui confirme qu’Angular a vraiment du succès.

## Session “What’s New and Cool with Google Compute Engine”

[Lien de la vidéo](https://developers.google.com/events/io/sessions/333117643)  
La session a commencé par un rappel sur les datacenters et du leitmotiv côté Google Cloud : _“Highly secure”_ et _“Consistently Fast”_ Premier slide sur la plateforme définie comme _“Open”_ :

*   CentOS & Debian
*   Tout en API REST
*   Mais aussi des web UI et des outils en ligne de commande
*   Un écosystème d’outils toujours plus importants (on ne peut pas encore parler de communauté mais peut-être qu’avec l’ouverture de GCE à tout le monde, cela viendra…)

Ensuite, on enchaîne sur la notion de _“Persistent disk”_ :

*   Passage à 10 To
*   Possibilité de manipuler directement /root
*   Hot attach et detach

Enfin, on finit sur la gestion du réseau et la possiblité de le contrôler de façon fine (_“Routing, Gateways and VPNs”_)  
Il y a eu aussi un témoigagne de la société Scalr [ici](http://www.scalr.com/supported-clouds/compute-engine/).

## Session “Intense Gaming”

[Lien de la vidéo](https://developers.google.com/events/io/sessions/333138979)  
Cette session est intéressante pour comprendre la façon dont on peut utiliser la plateforme Google Cloud pour réaliser des jeux. Le jeu « Grits » est [ici](http://gritsgame.appspot.com/#/UI_MainMenu) et on peut jeter un coup d’oeil au code source [par là](https://code.google.com/p/gritsgame/).  
« FreshPlanet » a aussi fait un témoignage de leur jeu « Song Pop » qui tenait la charge grâce à AppEngine : 300 M de requêtes utilisateurs par jour.

## Session “Web Components: A Tectonic Shift for Web Development”

[Lien de la vidéo](https://developers.google.com/events<br />/io/sessions/318907648)  
Voilà une des meilleures sessions du Google I/O : les “Web Components” vont être au coeur des frameworks Web de demain donc il est important de comprendre les concepts qui se cachent derrière. Au programme, 4 thèmes explorés :

*   “HTML template” : sans manipulation du DOM, non interprété
*   “Shadow DOM” : balise <content select= »h1.cool »> permet de redéfinir le fragment host
*   “Custom Element” : écrire soit même ces balises et créer des types (gestion de l’héritage)
*   “HTML Import” : pas encore disponible mais bientôt sur Chrome !

Comme vous l’avez compris, je recommande donc fortement cette session !

## Session “Broadcast Yourself!: Using the YouTube Live APIs to Stream to the World”

[Lien de la vidéo](https://developers.google.com/events/io/sessions/328361185)  
C’est une session découverte sur Youtube : on y voit comment créer du contenu en “streaming”. A noter que Google a ouvert “Youtube LIVE” et que Google convertit automatiquement le flux vidéo dans des formats plus petits pour téléphone (par exemple un upload en qualité HD). On peut aussi maintenant créer un évènement LIVE directement depuis une API disponible en Java (compatible Android).

## Session “The Freebase APIs: Tapping into Google’s Knowledge Graph”

[Lien de la vidéo](https://developers.google.com/events/io/sessions/351310959)  
C’est encore une session découverte : la “Freebase API” est un énorme graphe de connaissance qui recense pas mal d’informations. On peut facilement l’utiliser grâce à la sortie d’un plugin JQuery qui gère la notion de sémantique mais aussi les requêtes géolocalisées. Cette gigantesque base de données gère la notion de “Topical link” qui permet de se connecter à d’autres informations (wikipedia par exemple).

## Session “Develop for Glass”

[Lien de la vidéo](https://developers.google.com/events/io/sessions/332490621)  
Dernière session découverte mais pas des moindres : “Develop for Glass”. Cette session a l’avantage de présenter ce qu’on peut faire avec ces lunettes. J’ai eu la chance de les essayer mais il est intéressant de voir comment “Facebook”, “Twitter” et autres (“Elle”, « NYT »…) ont prévu leur UX (_User Experience_) sur ce device. La session donne de bons fondements pour aborder ce nouveau device :

*   Mirror API
*   GDK “Glass Developer Kit”
*   Gestion du texte, des images, des vidéos
*   Penser à designer pour Glass, à tester
*   Ne jamais forcer le regard : “Don’t get in the way”, il faut que l’utilisateur puisse garder contact avec le monde réel

## Session “High Performance Apps with Go on App Engine”

[Lien de la vidéo](https://developers.google.com/events/io/sessions/333519914)  
Go est une langage qui se porte bien ! Une version “1.1” est sortie le mois dernier et Google a montré dans cette conférence que “Go” pourrait bien être le langage de prédilection pour AppEngine ! Que ce soit en terme de performances (métriques données avec AppStat) ou en terme de design,  
Go permet d’optimiser les requêtes :

*   “Defer work” : essayer de décaler le plus possible le travail non utile pour l’utilisateur (exemple de l’envoi d’email)
*   “Batching” : faire des “multiGet”, “multiPut” etc.
*   “Catching” : utiliser le service « Memcache » ou directement la RAM
*   “Concurrency” : utiliser les “goroutines”

A noter que le langage va encore s’améliorer avec une meilleure gestion du multithreading et plus de tests sur le “core” du langage.  
Bref, la session est très intéressante pour découvrir Go mais aussi récupérer quelques bonnes pratiques à appliquer à tout projet AppEngine.

## Session “Dart: HTML of the Future, Today!”

[Lien de la vidéo](https://developers.google.com/events/io/sessions/325433525)  
Dart était incontournable au Google I/O et cette session est à recommander car elle présente quelques nouveautés dans Dart :

*   “Future” et “Stream”,
*   Changement de noms pour avoir de plus petits préfixes
*   “Named argument”
*   “Observable data”
*   “Custom Element”
*   “HTML Template with binding”

Bref, cette session a présenté plein de notions très intéressantes du langage. Je retiendrai une phrase : _“Where is my jquery? No need with dart”_. Google pousse beaucoup Dart, c’est compréhensible quand on voit que le javascript est aujourd’hui difficile à optimiser côté browser (les performances JS sont difficiles à améliorer sur le moteur V8)

## Session “GWT Roadmap for the Future”

[Lien de la vidéo](https://developers.google.com/events/io/sessions/327833110)  
GWT est-il mort ? Ayant manipulé pendant 6 ans ce framework, on me pose souvent la question et cette session a donné quelques éléments de réponse.  
Côté roadmap, voilà ce qui est prévu sur GWT :

*   “Full mavenization” avec séparation des librairies “core”, “i18n” etc.
*   Amélioration du compilateur et adaptation au dernier moteur JS (V8)
*   Support de Java 7&8
*   Meilleure interopérabilité avec le JS
*   Fin du support des vieux navigateurs (IE6/7/8?)
*   Gestion de la mobilité et du « offline »
*   Sortie d’un nouveau site : [http://www.gwtproject.org](http://www.gwtproject.org)

Ensuite Daniel Kurka a présenté [MGWT](http://www.m-gwt.com/), une librairie qui permet de créer des applications GWT pour mobiles (téléphones et tablettes). Je ne suis pas du tout convaincu dans le sens où l’on s’écarte des principes de « responsive design »…  
Ce qu’il faut retenir, c’est qu’une nouvelle version GWT 2.6 est prévu pour Q4 2013 et qu’une version GWT 3.0 est prévu pour le Google I/O 2014.

### Sandbox & GDG au Moscone Center

Il y avait plus de 120 partenaires invités à présenter leurs produits. L’étage Android et Chrome était très sympa mais il fallait aussi compter sur deux gros stands : Google+ et Glass (à l’inverse du stand Google TV très pauvre…) A noter aussi qu’il y avait quelques stands pour “Google for non profit” et “Google for education”.  
Par-ci, par-là des poufs pour se reposer et recharger ses devices. Très agréable. Un stand dédié à la découverte des GDG était présent : le “GDG Lounge”. On pouvait se faire tatouer le symbole des GDG et l’on pouvait suivre des retransmissions live de l’I/O.  
Côté GDG Nantes, nous avions organisé un Google I/O Extended : une retransmission en live de la keynote et de sessions. Depuis le GDG Lounge, certains googlers ont pu faire un hangout avec les différents GDG pour des réactions à chaud. En tout, c’est 1 million de personnes présent sur YouTube pendant la keynote !  
Comme souvent, le wifi du Moscone Center était pris d’assaut par les quelques 6000 personnes présentes : très difficile donc de publier des infos en direct sur Twitter et Google+.

### Conclusion

Voici les points importants que je retiens en tant que développeur :

*   Montée en gamme du Cloud de Google avec Cloud Datastore disponible en API, PHP sur AppEngine, ComputeEngine ouvert à tous
*   GWT 3.0 prévu au I/O 2014
*   Angular JS a vraiment du succès
*   Le projet Glass attire énormément les développeurs Android
*   Nouvel IDE pour Android basé sur IntelliJ : Android Studio
*   Utilisation de Gradle pour les dépendances Android
*   Dart a eu le droit à pas mal de c  
    onférences donc Google compte pas mal dessus.

Pour conclure, il est bon de noter que Google a publié très rapidement les vidéos du Google I/O. Aujourd’hui, plus de 200 sessions sont disponibles sur [Youtube](http://www.youtube.com/user/GoogleDevelopers/videos).