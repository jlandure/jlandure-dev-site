[![](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2019/10/Blog-Zenika-REX-firebase-summit-2019-1.png?resize=800%2C445&ssl=1)](https://blog.zenika.com/wp-content/uploads/2019/10/Blog-Zenika-REX-firebase-summit-2019-1.png)[Événements](https://blog.zenika.com/category/evenements/) 

# Retour sur le Firebase Summit 2019

[4 octobre 2019](https://blog.zenika.com/2019/10/04/retour-sur-le-firebase-summit-2019/ "9 h 50 min") [Julien Landuré](https://blog.zenika.com/author/jlandure2/ "Julien Landuré")

Le [Firebase Summit](https://firebase.google.com/summit) est l’événement annuel de présentation des nouveautés de cette brique Cloud de Google. Chaque année, la conférence a lieu dans une nouvelle capitale européenne. Après Londres, Amsterdam et Prague, c’est au tour de Madrid d’accueillir les dizaines de Googlers au T-shirt jaune pour annoncer et présenter les dernières nouveautés de la plateforme.

![](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2019/10/IMG_20190926_084236.jpg?resize=768%2C1024&ssl=1)

[Julien Landuré](https://twitter.com/jlandure) et [Benjamin Petetot](http://twitter.com/bpetetot) ont eu la chance de pouvoir assister à cette journée et ont partagé en direct les annonces dans [ce thread twitter](https://twitter.com/bpetetot/status/1177126385862811649). Voici un résumé des nouveautés de la plateforme.

## Keynote

[Firebase](https://firebase.google.com/) est un ensemble d’outils et services ayant pour objectif de faciliter le développement d’applications mobiles et web. Leur but est que les développeurs se concentrent sur les fonctionnalités essentielles de l’application.  
Firebase propose des services afin de créer rapidement des applications scalables sans avoir à gérer l’infrastructure tout en améliorant la qualité de votre application et devient une aide précieuse pour gérer la croissance de votre business.

Comme toute keynote elle commence avec des chiffres :

*   1,4 millions de lignes de code modifiées par la communauté sur les SDK open source de Firebase
*   2 millions d’applications actives utilisent Firebase tous les mois

![](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2019/10/IMG_20190926_101610.jpg?resize=800%2C600&ssl=1)

Les annonces de cette année sont très orientées autour du Web. Jusqu’à aujourd’hui, un bonne partie des services n’étaient disponibles que sur Android ou iOS. 

## Retour en force du Web

Le web revient en force dans la plateforme avec l’annonce du support Web des solutions suivantes :

[**Firebase Google Analytics**](https://firebase.google.com/products/analytics/)

Analyse le comportement de vos utilisateurs dans un seul et unique dashboard.  
Permet de visualiser ses données en temps réel, de créer des rapports et les exporter dans Big Query.

[**Remote config**](https://firebase.google.com/products/remote-config/)

Permet de customizer certaines fonctionnalités de notre application. En effet, nous avons vu sur scène une démo qui permettait d’activer le mode sombre (« Dark Mode ») à une population d’utilisateur en changeant une valeur dans le « Remote Config ».  
Permet donc de réaliser très facilement du « feature flipping » ou encore du « A/B Testing » car cela s’opère sans déploiement de nouvelles versions, ni interruption de services.  
Côté web, cela se traduit par une mise à jour au prochain « refresh » de votre site dans le navigateur.

[**Cloud messaging**](https://firebase.google.com/products/cloud-messaging/)

Permet d’envoyer des notifications à vos utilisateurs et cela de façon gratuite.  
Se base sur Firebase Cloud Messaging (FCM) pour envoyer des messages à une personne ou une population.  
Côté Web, cela utilise la norme [Web Push](https://developer.mozilla.org/fr/docs/Web/API/Push_API)

## De nouveaux services

De nouveaux services ont également été annoncés.

[**Firebase Emulator Suite**](https://firebase.google.com/docs/emulator-suite)

L’émulateur Firebase est maintenant complètement fonctionnel en local.  
Vous pouvez construire et tester les différents produits Firebase et ainsi gagner en productivité (notamment pour le monde Mobile).

[**Firebase app distribution**](https://firebase.google.com/products/app-distribution)

Cette annonce « Mobile » permet d’envoyer une version « pre-releases » directement à une base d’utilisateurs définis. Ainsi, directement depuis la console web et l’outil en ligne de commande, vous pouvez envoyer une nouvelle version de test sans attendre leurs mises à jour sur les stores.

[**Firebase extensions**](https://firebase.google.com/docs/extensions/)

Cette annonce est assez intéressante d’un point de vue « Développement ».  
L’idée est de fournir des solutions prêtes à l’emploi pour opérer des solutions « classiques » comme « Envoyer un email » ou encore « Redimensionner une image ». Ce sont des choses classiques dans le monde Web & Mobile et en quelques clics et avec Firebase Extensions, nous aurons une solution déployée en quelques minutes.  
A noter que les Firebase Extensions sont open source et disponibles [ici](https://github.com/firebase/extensions/).

![](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2019/10/firebase-extensions-1024x768.jpeg?resize=800%2C600&ssl=1)

## Conclusion

Ces annonces nous ont convaincu ! Vous pouvez d’ores et déjà tester des codelabs et des tutoriels dédiés à Firebase sur la nouvelle plateforme [google.dev](https://google.dev/topics/firebase).

![](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2019/10/IMG_20190926_101515.jpg?resize=800%2C600&ssl=1)

Chaque année Firebase complète de plus en plus sa plateforme et ses services afin de faciliter la vie des développeurs.  
Elle est unique dans son genre, on ne trouve pas l’équivalent de ce type de services « TOUT EN UN » chez les autres Cloud providers aujourd’hui. Firebase reste un outil idéal pour prototyper ou tester une nouvelle idée d’application et continue d’être une plateforme productive pour accueillir les applications réalisées au sein de Zenika.

Merci à Benjamin Petetot qui a co-écrit l’article.