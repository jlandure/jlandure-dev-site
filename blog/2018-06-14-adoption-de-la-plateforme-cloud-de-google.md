[![](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2018/06/EN-tete-blog-OK-1.png?resize=702%2C336&ssl=1)](https://blog.zenika.com/wp-content/uploads/2018/06/EN-tete-blog-OK-1.png)[Événements](https://blog.zenika.com/category/evenements/) 

# Adoption de la plateforme Cloud de Google

[14 juin 2018](https://blog.zenika.com/2018/06/14/adoption-de-la-plateforme-cloud-de-google/ "9 h 20 min") [Julien Landuré](https://blog.zenika.com/author/jlandure2/ "Julien Landuré")

[Hugo Wood](https://twitter.com/mercury_wood) et [moi-même](https://twitter.com/jlandure) avons eu l’opportunité d’aller au Cloud Summit Paris 2018 : 2500 personnes étaient présentes lors de ce summit, une opération “séduction” pour les entreprises.  
Google a investi 30 milliards de dollars ces dernières années sur sa plateforme Cloud pour devenir leader et cela paie : la plateforme a obtenu ce titre dans le “[Gartner 2018 Magic Quadrant for Cloud IaaS](https://www.gartner.com/doc/3875999/magic-quadrant-cloud-infrastructure-service)”.  
Cet article a pour but de vous faire un résumé de ce summit, vous donner mon ressenti sur l’adoption de la plateforme Cloud de Google en France ainsi qu’en profiter pour donner quelques pointeurs techniques.  

## Nouveaux clients et nouveaux partenariats

Pendant la keynote d’ouverture, Google expose les grands clients français de sa plateforme Cloud comme Atos, Airbus ou Total. Un résumé de ces partenariats est disponible sur [BFM Business ici](https://twitter.com/GoogleCloud_FR/status/1005105922832658432).  
Au-delà du débat du Cloud Provider à choisir, il y a des points qu’il est important de noter :

*   Il n’y a pas que des startups qui utilisent le Cloud : Google a mentionné une quinzaine de grands groupes utilisateurs de sa plate-forme.
*   Malgré leurs contraintes (taille, répartition géographique, culture d’entreprise, cadre juridique), ces sociétés ont fait le choix du Cloud pour leurs activités.
*   Elles ont réussi cette transformation numérique et s’attaquent maintenant à créer de la valeur en utilisant l’Intelligence Artificielle ou de nouvelles formes de collaboration.

[![](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2018/06/Photo-1-1.png?resize=750%2C318&ssl=1)](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2018/06/Photo-1-1.png?ssl=1)

## Décryptage de la keynote

Se sont succédées différentes annonces lors de la keynote :

*   Eric Haddad, Managing Director France, Google Cloud : “Grâce à la technologie des conteneurs et à l’orchestrateur Kubernetes, Google lance en moyenne 4 milliards de conteneurs par semaine.” [Kubernetes](https://kubernetes.io), projet initié par Google est aujourd’hui l’un des projets les plus populaires sur GitHub.
*   [Thierry Breton](https://twitter.com/ThierryBreton), CEO, Atos : “L’Europe est plus sensible à la question des données. Les clients européens souhaitent avoir leurs données stockées en Europe, selon la seule législation européenne. C’est ce qu’offre Atos grâce à ce partenariat mondial”
*   [Ulku Rowe](https://twitter.com/UlkuRowe), CTO Office Google Cloud et [Lucie Vannier](https://twitter.com/lu_vannier) ont fait des démos du produit [“AutoML”](https://cloud.google.com/blog/big-data/2018/03/automl-vision-in-action-from-ramen-to-branded-goods) et de [“Smart Compose”](https://www.blog.google/products/gmail/subject-write-emails-faster-smart-compose-gmail/) : ces avancées technologies ont impressionné le public.
*   [Greg DeMichillie](https://twitter.com/gregde), Director of Product, Google Cloud : “Unleash developers”. Un seul principe à retenir : une entreprise doit pouvoir laisser les développeurs “jouer” avec les données et les dernières technologies pour pouvoir créer de l’innovation et de la valeur pour l’entreprise.

[![](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2018/06/image-blog-4-1.png?resize=728%2C204&ssl=1)](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2018/06/image-blog-4-1.png?ssl=1)  
En termes de discours, c’était intéressant d’étudier la stratégie du passage au Cloud d’une entreprise d’aujourd’hui :

*   Soit vous êtes une startup et il faut absolument “disrupter” pour créer un nouveau marché. La plateforme Cloud peut vous aider à être rapidement sur le marché et suivre la montée en puissance de votre produit (la Scalabilité).
*   Soit vous êtes une entreprise existante et il faut profiter de votre passé, de la donnée accumulée (le Big Data) pour créer des services à forte valeur ajoutée. Vous avez aussi l’avantage d’une relation privilégiée avec bon nombre de clients pour essayer d’innover (le Machine Learning).

## “The Path To Productivity”

Le Cloud dispose de différents niveaux avec chacun son vocabulaire.

*   IaaS (Infrastructure As A Service – [GCE](https://cloud.google.com/compute/)) : l’unité de déploiement est une VM
*   CaaS (Containers As A Service – [GKE](https://cloud.google.com/kubernetes-engine/)) : l’unité de déploiement est un conteneur
*   PaaS (Platform As A Service – [GAE](https://cloud.google.com/appengine/)) : l’unité de déploiement est une application
*   FaaS (Functions As A Service – [GCF](https://cloud.google.com/functions/)) : l’unité de déploiement est une fonction

[Greg DeMichillie](https://twitter.com/gregde)[ a expliqué sa vision des choses avec ce schéma :](https://blog.zenika.com/wp-content/uploads/2018/06/image-blog-4-1.png)  
[![](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2018/06/image5-2.png?resize=748%2C294&ssl=1)](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2018/06/image5-2.png?ssl=1)  
The path to productivity” est en adéquation avec ma philosophie en tant que développeur : **plus de flexibilité, plus de simplicité, plus de services managés.**[  
](https://blog.zenika.com/wp-content/uploads/2018/06/image5-2.png)  
Aujourd’hui, beaucoup d’entreprises indiquent être passées sur le Cloud : elles ont remplacé leurs VMs présentes dans un datacenter par des VMs hébergées chez Google. C’est un premier pas, mais cela ne change en rien la capacité de l’entreprise à déployer, automatiser, devenir une plateforme ouverte et finalement innover.[  
](https://blog.zenika.com/wp-content/uploads/2018/06/image5-2.png)  
Le Gartner illustre très bien cet aspect dans le “[Cloud Spectrum](https://www.gartner.com/smarterwithgartner/understand-the-cloud-spectrum/)” :  

[![](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2018/06/image6-2.png?resize=672%2C487&ssl=1)](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2018/06/image6-2.png?ssl=1)  
Pour aller plus loin, je vous invite à lire le billet de blog suivant : [“Time to “Hello, World”: VMs vs. containers vs. PaaS vs. FaaS”](https://cloudplatform.googleblog.com/2018/06/Time-to-Hello-World-VMs-vs-containers-vs-PaaS-vs-FaaS.html)

## AutoML : rendre abordable le Machine Learning

Le Machine Learning semble un acquis tellement Google semble déployer des outils pour faciliter sa prise en main, son adoption et son utilisation. C’est le cas notamment avec [AutoML “Vision”](https://cloud.google.com/automl/).  
[![](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2018/06/image7-2.png?resize=746%2C359&ssl=1)](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2018/06/image7-2.png?ssl=1)  
[Ulku Rowe](https://twitter.com/UlkuRowe) explique comment une entreprise peut choisir la façon d’utiliser du Machine Learning avec la plateforme de Google :

1.  Elle peut tout faire soi-même en utilisant ses données et son modèle (en utilisant TensorFlow par exemple).  
    Cela nécessite beaucoup de temps et des compétences élevées en Machine Learning. [Cloud ML Engine](https://cloud.google.com/ml-engine/) se charge de l’exécution.
2.  Elle peut uniquement utiliser les produits & APIs disponibles sur GCP. Nous pouvons alors reconnaître des images avec [Vision API](https://cloud.google.com/vision/), traduire avec [Translation API](https://cloud.google.com/translate/), repérer des éléments dans une vidéo avec [Video Intelligence API](https://cloud.google.com/video-intelligence/) ou encore comprendre du texte ou retranscrire un dialogue avec [Natural Language API](https://cloud.google.com/natural-language/) et [Speech API](https://cloud.google.com/speech-to-text/).  
    Très efficace, cette manière d’ajouter de l’intelligence dans un produit existant permet une mise en place en quelques jours pour un PoC et de démontrer son réel intérêt. L’inconvénient est de ne pas pouvoir customiser cette intelligence en prenant en compte plus finement les spécificités et le contexte de notre métier.
3.  L’entreprise a des données et un contexte particulier, mais pas forcément de Data Scientist, ni d’experts du Machine Learning… Comment faire ? Là intervient [AutoML](https://cloud.google.com/automl/) et la possibilité d’utiliser nos données et de générer un modèle cohérent, contextualisé pour nos besoins. Le tout sera disponible sous forme d’une API donc facilement utilisable par les développeurs.  
    La démonstration faite pendant le summit est l’exemple de nuages que l’on souhaiterait classifier. De base, l’API “Vision API” nous renvoie un “label” de l’image où il est sûr à 97% que c’est un nuage. Mais nous voulons connaître quel type de nuage c’est : cumulus, stratus, cirrus, cumulonimbus…  Dans l’exemple, après avoir ajouté des images et leur type associé, AutoML génère un modèle qui va nous aider à les reconnaître ! Plutôt magique et très abordable d’un point de vue technique !

À noter que AutoML est encore en Alpha et devrait prochainement être disponible pour tous les utilisateurs. Plus de lecture sur le but de AutoML [ici](https://www.blog.google/topics/google-cloud/cloud-automl-making-ai-accessible-every-business/)[.](https://blog.zenika.com/wp-content/uploads/2018/06/image7-2.png)

## Stratégie Open Source gagnante

Le Cloud de Google revendique un principe fondamental dans sa conception : “Open Source First”. Il est remarquable que deux projets issus de Google fassent la Une de GitHub :

*   [Kubernetes](https://github.com/kubernetes/kubernetes), un orchestrateur de conteurs avec 37 000+ étoiles et plus de 35 000 PR en seulement 4 ans
*   [TensorFlow](https://github.com/tensorflow/tensorflow), une solution d’apprentissage automatique avec 100 000+ étoiles

Aujourd’hui, nous avons une ouverture à plusieurs niveaux :

*   Open Design : le design même et l’architecture des produits sont discutés de façon ouverte
*   Open Source : le code est OpenSource, accessible sur GitHub
*   Open API : tout est API et tout peut se piloter par API
*   Open Community : il faut supporter des communautés inclusives

Clairement, Google veut à la fois aider les développeurs mais aussi supporter les outils populaires sur leurs plateformes. À une époque, AppEngine était boudé par les entreprises car il y avait un aspect “lock-in”. Là, en utilisant et en supportant des projets Open Source, Google se met à l’abri de potentielles critiques tout en augmentant le capital “sympathie” envers la communauté de développeurs.  
D’un autre côté, [Redmonk indique que 54% des entreprises utilisent Kubernetes](http://redmonk.com/sogrady/2018/03/02/the-kubernetes-lesson/) donc cela facilitera la transition vers le Cloud pour ces entreprises ou cela permettra de faire du Cloud hybride (une partie chez Google, une partie chez soi)  
[![](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2018/06/image8-1.png?resize=483%2C566&ssl=1)](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2018/06/image8-1.png?ssl=1)  
À noter que Kubernetes n’est plus piloté par Google mais a rejoint la [CNCF](https://www.cncf.io/) (Cloud Native Computing Foundation). Google reste cependant le principal contributeur.  
Google a aussi créé des communautés de développeurs appelés [GDG (Google Developer Group)](https://developers.google.com/programs/community/gdg/) mais s’ouvre aussi à toutes les [communautés](https://developers.google.com/programs/community/) pour les aider. Il y avait un [stand “Community”](https://twitter.com/startupvillage/status/1004064005877633024) durant cet évènement pour échanger avec d’autres développeurs.  
À noter que des évènements comme le Summit en plus technique sur la Cloud Platform existent : [DevFest Lille](https://devfest.gdglille.org/), [DevFest Nantes](https://devfest.gdgnantes.com/), [DevFest Toulouse](https://devfesttoulouse.fr/). Voici les GDGs présents en France :  
[![](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2018/06/image9-1.png?resize=422%2C389&ssl=1)](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2018/06/image9-1.png?ssl=1)  
Pour finir, il est intéressant de noter que côté hardware, Google investit beaucoup sur du propriétaire comme les [TPUs](https://cloud.google.com/tpu/), processeurs dédiés au traitement de Machine Learning. Et pour le moment, ils n’ont pas prévu d’open source ces nouvelles architectures.

## L’adoption

Côté client européen, nous retrouvons des sociétés connues comme Spotify ou Shazam mais aussi (par domaine) :

*   *   Retail : Philips, Ferrero Rocher, Gant
    *   Finance : HSBC, ING, BNP Paribas
    *   Media : Sky, BBC, theguardian
    *   Gaming : Ubisoft, Rovio
    *   Transport : KLM, Airbus
    *   Manufacturing : Barilla…

_Vous pouvez trouver des témoignages clients sur cette _[_page_](https://cloud.google.com/customers/)_._  
Globalement, de plus en plus d’entreprises vont se pencher vers le Cloud et vont étudier la plateforme de Google. L’écosystème et les partenaires Google Cloud sont clairement identifiés : pas moins de 30 sponsors étaient présents lors de cet évènement, chacun présentant leurs compétences et des démos technologiques.  
Au final, lors de summit, j’ai trouvé très agréable de discuter avec des clients soucieux de ne pas avoir un train de retard et, pour certains, vouloir garder un temps d’avance.  
Google continue d’investir sur sa plateforme avec plus de 15 régions disponibles (46 zones), gère 25% du trafic internet américain, 12 000+ “Software Engineers” et 5000 “Site Reliability Engineers”.

## La suite ?

Google Cloud donne rendez-vous à tous les passionnés de leur plateforme les 24, 25 et 26 Juillet à San Francisco pour [Cloud Next’18](https://cloud.withgoogle.com/next18/sf/) qui réunira pas moins de 12 000 participants. Il devrait y avoir de grosses annonces !  
[![](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2018/06/image10-1.png?resize=749%2C290&ssl=1)](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2018/06/image10-1.png?ssl=1)  
Si vous voulez avoir plus d’informations sur les dernières nouveautés “Made in Google”, je vous invite à lire l’article co-écrit avec [Benjamin](https://twitter.com/bpetetot) et [Emmanuel](https://twitter.com/EmmanuelDemey?lang=en) intitulé [“Retour sur le Google I/O 2018”](https://blog.zenika.com/2018/05/25/retour-sur-le-google-i-o-2018/).