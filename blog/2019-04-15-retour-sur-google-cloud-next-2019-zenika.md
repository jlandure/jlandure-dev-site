[![Blog Zenika - Google cloud next](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2019/04/Blog-Zenika-Google-cloud-next-1.jpg?resize=800%2C445&ssl=1)](https://blog.zenika.com/wp-content/uploads/2019/04/Blog-Zenika-Google-cloud-next-1.jpg)[Événements](https://blog.zenika.com/category/evenements/) 

# Retour sur Google Cloud Next 2019 | Zenika

[15 avril 2019](https://blog.zenika.com/2019/04/15/retour-sur-google-cloud-next-2019-zenika/ "19 h 07 min") [Julien Landuré](https://blog.zenika.com/author/jlandure2/ "Julien Landuré")

Zenika, [nouveau partenaire Google Cloud Platform](https://cloud.withgoogle.com/partners/detail/?id=CIGAgICAgMCo4wE%3D&hl=fr-FR&language=en), a profité de la conférence Cloud Next 2019 pour emmener 5 consultants à San Francisco : [Gregory Rolland](https://twitter.com/kronanh) ([Zenika Bordeaux](https://bordeaux.zenika.com/)) [Rémi Briois](https://twitter.com/rbriois) ([Zenika Lille](https://www.zenika.com/agencies)), [Patrice De Saint Steban,](https://twitter.com/patoudss) [Charles-Henri Guérin](https://twitter.com/charlyx) et [moi-même](https://twitter.com/jlandure) ([Zenika Nantes](https://nantes.zenika.com/)) et booster notre initiative Cloud.  
Nous avons rédigé cet article pour résumer les principales annonces de cette conférence Cloud majeure qui a eu lieu du 9 au 11 avril en Californie.  

[![Blog Zenika - Groupe Cloud Next](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2019/04/Blog-Zenika-Groupe-Cloud-Next-1.png?resize=501%2C299&ssl=1)](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2019/04/Blog-Zenika-Groupe-Cloud-Next-1.png?ssl=1)

## Opening Keynote

La keynote d’ouverture introduite par [Sundar Pichai](https://twitter.com/sundarpichai) (CEO @ Google) et [Thomas Kurian](https://www.linkedin.com/in/thomas-kurian-469b6219/) (CEO @ Google Cloud) a permis de présenter les nouveautés :  
L’annonce de la sortie de [Anthos](https://cloud.google.com/anthos/) est sans conteste la plus importante de cette keynote :Anthos vous offre la possibilité de faire du “* Cloud” : private, hybrid, multi Cloud.  
Il sera également possible avec “[Anthos Migrate](https://cloud.google.com/blog/topics/hybrid-cloud/new-platform-for-managing-applications-in-todays-multi-cloud-world)” de déployer n’importe quelle solution sur le cloud.  
Durant la keynote, nous avons eu la démonstration d’une VM déployée sur un serveur On-Prem, transformée en un conteneur puis déployée sur le cloud Google mais aussi déployé sur AWS.  
Sous le capot, Anthos qui est le nouveau nom de la solution Cloud Service Platform (CSP) utilise [kubernetes](https://kubernetes.io/fr/), [istio](https://istio.io/), [knative](https://cloud.google.com/knative/), [velostrata](https://cloud.google.com/velostrata/), etc.  
[![Blog Zenika - Cloud next Opening Keynote](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2019/04/Blog-Zenika-Cloud-next-Opening-Keynote-1.png?resize=614%2C253&ssl=1)](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2019/04/Blog-Zenika-Cloud-next-Opening-Keynote-1.png?ssl=1)  
La deuxième annonce intéressante pour nous développeur est “[Database Managed Services](https://thenewstack.io/google-offers-7-popular-open-source-data-projects-as-managed-services/)”, le partenariat que Google a mis en place avec de grandes solutions Open Source : [MongoDB](https://www.mongodb.com/), [Redis](https://redis.io/), [Kafka](https://kafka.apache.org/), [Neo4J](https://neo4j.com/), [Elasticsearch](https://www.elastic.co/), [Cassandra](http://cassandra.apache.org/) et [InfluxDB](https://www.influxdata.com/).  
Nous pourrons les utiliser directement dans nos projets Google Cloud en profitant d’une intégration de l’administration et de la facturation : “Unified support, billing and experience”.  
Enfin, la dernière nouveauté annoncée à la keynote est le nouveau service [Cloud Run](https://cloud.google.com/run/), la possibilité de déployer des containers en serverless de façon managé par Google ou sur votre cluster GKE.

![Blog Zenika - Cloud Next Opening Keynote 2](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2019/04/Blog-Zenika-Cloud-Next-Opening-Keynote-2-1.png?resize=334%2C231&ssl=1)[Regarder la video](https://youtu.be/XGrlWVWlpgE)

## Innovative Keynote

La keynote du deuxième jour était plus orientée sur les innovations que Google a pu apporter dans le cloud.  
Tout d’abord, Google a rappelé l’importance de nos données sur Google Cloud : “You own your data”.  
[![Blog Zenika - Innovative Keynote cloud next](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2019/04/Blog-Zenika-Innovative-Keynote-cloud-next-1.png?resize=516%2C329&ssl=1)](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2019/04/Blog-Zenika-Innovative-Keynote-cloud-next-1.png?ssl=1)  
De nouveaux services managés sont disponibles en particulier les outils de Microsoft : [Manager Service for active directory](https://cloud.google.com/managed-microsoft-ad/) et [Cloud SQL for SQL Server](https://cloud.google.com/sql/?).  
Dans le domaine de la Data, plusieurs nouveautés ont également été annoncées :  
[![Blog Zenika - innovative keynote cloud next 2](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2019/04/Blog-Zenika-innovative-keynote-cloud-next-2-1.png?resize=336%2C190&ssl=1)](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2019/04/Blog-Zenika-innovative-keynote-cloud-next-2-1.png?ssl=1)

*   [Cloud Data fusion](https://cloud.google.com/data-fusion/), un service managé qui permet de gérer les pipelines de données dans les ETL avec une interface graphique, des connecteurs et des transformations prédéfinies.
*   [BigQuery BI Engine](https://cloud.google.com/bi-engine/docs/), un service permettant de faire de l’analyse à faible latence pour les besoins de la BI avec la possibilité d’utiliser Data Studio pour faire la restitution.
*   [Connected Sheets](https://cloud.google.com/blog/products/g-suite/connecting-bigquery-and-google-sheets-to-help-with-hefty-data-analysis) dans les Google SpreadSheets : il est maintenant possible d’intégrer directement dans nos feuilles de calculs des données venant de BigQuery ou d’autres sources de données.
*   [Data Catalog](https://cloud.google.com/data-catalog/) : Un répertoire de données utilisable

Mais c’est dans le domaine du Machine learning qu’il y a eu le plus de nouveautés :

*   [AI Platform](https://cloud.google.com/ai-platform/) : le regroupement des toutes les services proposés pour un cycle complet d’un développement de machine learning, de la récupération de la donnée, la préparation et la transformations, puis l’entraînement et le développement de modèle, jusqu’au déploiement du modèle.

[![Blog Zenika - Innovative Keynote Cloud Next 3](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2019/04/Blog-Zenika-Innovative-Keynote-Cloud-Next-3-1.png?resize=600%2C291&ssl=1)](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2019/04/Blog-Zenika-Innovative-Keynote-Cloud-Next-3-1.png?ssl=1)

*   [AI Hub](https://aihub.cloud.google.com/) : Un répertoire de données et de modèles prêt à l’emploi.
*   [Auto ML Video Intelligence](https://cloud.google.com/video-intelligence/automl/docs/) et [Auto ML Tables](https://cloud.google.com/automl-tables/docs/) : Après [AutoML](https://cloud.google.com/automl/) Vision, NLP et Traduction, Google étend encore son offre de modèle de machine learning personnalisable avec maintenant la fonctionnalité sur les vidéos et sur des données tabulaires.
*   [Document Understanding AI](https://cloud.google.com/solutions/document-understanding/) : La possibilité de reconnaître des documents, de les analyser et extraire les informations.

Et enfin quelques nouveautés dans G Suite :

*   Intégration du nouveau service de Chat dans Gmail permettant de réunir tout les outils de communications à un seul endroit.
*   Voice le service de téléphonie cloud est maintenant disponible pour tous.

[Regarder la vidéo](https://youtu.be/PZ1Lqxfs1yw)

## Developer keynote

La keynote la plus importante pour nous developpeur, cette keynote a été le moment d’entendre parler de toutes les nouveautés destinées aux développeurs, mais surtout “how to have fun with google cloud” ! C’est toujours agréable de voir écrit “Developers are the real star” : 900 “[Cloud Study Jam](https://events.withgoogle.com/cloud-studyjam/)” ont été joués dans le monde notamment [chez Zenika Lyon](https://www.meetup.com/GDG-Cloud-Lyon/events/lpnvdpyzcbnb/).  
La keynote s’articulait autour d’une application dédiée [https://www.gameoflife.dev/](https://www.gameoflife.dev/) pour présenter des fonctionnalités :

*   Modifier un code, commiter sur git, et lancer un build jenkins pour mettre en production.
*   Modifier le code et utiliser l’extension dans VS Code [Cloud Code](https://cloud.google.com/cloud-code/) pour deployer via Kubernetes
*   Utiliser une commande via slack pour déclencher via GitHub et [Cloud Build](https://cloud.google.com/cloud-build/) la modification du jeu.

[![Blog Zenika - Developer Keynote Cloud Next](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2019/04/Blog-Zenika-Developer-Keynote-Cloud-Next-1.png?resize=423%2C198&ssl=1)](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2019/04/Blog-Zenika-Developer-Keynote-Cloud-Next-1.png?ssl=1)  
Pour promouvoir les outils de Monitoring, Google a révélé que durant une semaine, ils font un exercice appelé DiRT (Disaster Recovery Test) qui simule la perte d’une partie du siège de Google, y compris de l’équipe. Cela pousse les équipes à penser toujours à gérer et prévoir les incidents qui peuvent survenir.  
Ensuite, la keynote est revenue sur le [World Record de PI](http://www.guinnessworldrecords.com/world-records/66179-most-accurate-value-of-pi) réussi par [Emma Haruka Iwao](https://twitter.com/Yuryu) avec 30 trillions de décimal calculés en 4 mois grâce à la puissance du Cloud en mixant “Scale Up” (scalabilité verticale) et “Scale out” (scalabilité horizontale).  
La keynote est passé sur la présentation du nouvel outil de “compute” : Cloud Run. En indiquant le nom d’une image docker, cela crée un nouveau service avec la possibilité d’ajouter un “custom domain”. L’avantage est de ne payer seulement le temps où la fonction est utilisée et non le temps où l’instance est démarrée. Cloud Run permet avec la même interface et “expérience utilisateur” de déployer nos containers dans un cluster K8S.  
Pour finir, nous avons eu le droit de voir un responsable des “[Golden State Warriors](https://www.nba.com/warriors/)”, l’équipe de basket de San Francisco pour améliorer la performance de l’équipe tout en présentant Cloud Dataflow pour analyser les résultats et BigQuery pour les requêter.

# Autres annonces Produit

Un récapitulatif des 122 annonces est disponible [ici](https://cloud.google.com/blog/topics/inside-google-cloud/100-plus-announcements-from-google-cloud-next19).  
Voici quelques autres annonces produit vues pendant les sessions :

*   [Nouveautés PubSub](https://twitter.com/ggarnotel/status/1115712389024899072) 
*   [Cloud Run](https://twitter.com/ahmetb/status/1115681406091313152)
*   [Cloud Code](https://twitter.com/digikin1/status/1115693229146423296)
*   [Stackdriver Sandbox](https://twitter.com/simon_zeltser/status/1115635095740641280)
*   [Anthos](https://twitter.com/GCPcloud/status/1115648299103604738)
*   [Postgresql 11](https://twitter.com/gabidavila/status/1115630804179116032)
*   [Firebase Hosting](https://twitter.com/_davideast/status/1115656935599165441)
*   [GKE Sandbox](https://twitter.com/davinkevin/status/1116103440227192832)
*   [Les nouveaux runtimes App Engine](https://twitter.com/ludoch/status/1116064206371975168) (Go 1.12, Java 11)

## Conclusion

Au delà de la conférence, cela a été l’occasion de découvrir ce berceau de l’IT qu’est San Francisco, une ville aux multiples facettes et d’un éclectisme incroyable.[![Blog Zenika - Zenikard Cloud Next](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2019/04/Blog-Zenika-Zenikard-Cloud-Next-1.png?resize=158%2C207&ssl=1)](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2019/04/Blog-Zenika-Zenikard-Cloud-Next-1.png?ssl=1)  
Pour trois d’entre nous, c’était la première fois que nous visitions San Francisco, l’occasion de se balader dans dans la ville et de s’imprégner de cette ambiance particulière.  
Le pont Golden Gates est vraiment impressionnant à découvrir en bateau, à pied ou lors d’un petit tour en vélo.  
Ce qui impressionne c’est la ville entièrement quadrillé, mais sur un ensemble de collines donnant des pentes vertigineuses que l’on grimpe avec un cable car.  
L’organisation de cette conférence Google est digne d’une montre Suisse !  
La récupération du badge afin de profiter de la conférence est extrêmement rapide.  
Une fois la sécurité de l’entrée du Moscone Center passée, des [Google Pixelbook](https://store.google.com/product/google_pixelbook) vous attendent. Il vous suffit alors de saisir l’e-mail utilisé pour vous enregistrer à la conférence et un écran vous affiche le numéro du point de retrait de votre badge.Ces points de retrait se situent à quelques mètres où des personnes s’occupent d’imprimer votre nom sur une carte NFC. C’est bon : vous pouvez profiter librement de ce tout ce que vous offre la conférence !  
Boissons et nourritures à volonté dans les restaurants partenaires de la conférence (petite mention pour SuperDuper !🍔😋

Cette conférence a aussi été l’occasion de rencontrer certains de nos partenaires : [Confluent](https://www.confluent.io/), [Elastic](https://www.elastic.co/), [Pivotal](https://pivotal.io/) et bien d’autres comme [Hashicorp](https://www.hashicorp.com/), [Sentry](https://sentry.io/), [GitLab](https://about.gitlab.com/), [CNCF](https://www.cncf.io/).  
Ce fut aussi l’occasion pour deux d’entre nous de passer et réussir 🎉 une certification Google Cloud Architect et Developer.  
Une petite dédicace aux copains de chez SFEIR et Google France qui avaient aussi fait le déplacement et avec qui nous avons pu échanger et partager.  
C’était top et cerise sur la gâteau, nous avons pu assister lors de l’Afterparty à un concert de [Gwen Stefani](https://twitter.com/gwenstefani/status/1116206384247271424) 🌉🎇😎

[![Blog Zenika - Gwen Stefani Cloud Next](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2019/04/Blog-Zenika-Gwen-Stefani-Cloud-Next-1.png?resize=610%2C283&ssl=1)](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2019/04/Blog-Zenika-Gwen-Stefani-Cloud-Next-1.png?ssl=1)
