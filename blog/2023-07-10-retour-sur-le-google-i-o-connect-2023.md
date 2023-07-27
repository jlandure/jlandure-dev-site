Published in [Zenika](https://medium.com/zenika)

Jul 10, 2023

7 min read

# Retour sur le Google I/O Connect 2023

J’ai eu la chance de participer au Google I/O Connect 2023 à Amsterdam aux Pays-Bas. Cet article a pour but de vous partager les grandes annonces et l’ambiance de cette conférence.

Après le Google I/O du mois de Mai à Mountain View ([retrouvez les annonces ici](https://developers.googleblog.com/2023/05/io23-developer-keynote-recap.html)), Google a tout mis en place pour amener ce Festival de Développeurs en créant des Google I/O Connect dans plusieurs villes :

*   🇺🇸 Miami, USA
*   🇳🇱 Amsterdam, Pays-Bas
*   🇮🇳 Bangalore, Inde
*   🇨🇳 Shanghai, Chine

[Toutes les vidéos du I/O 2023 sont déjà sur YouTube sur cette chaîne.](https://www.youtube.com/playlist?list=PL590L5WQmH8dAqv03RCMbZrbzxqCn6W3O) Il existe aussi [un site web dédié](https://io.google/2023/program/intl/fr/?q=technical-session%2Cworkshop).

## Keynote du Google I/O

Commençons par le keynote du Google I/O qui a eu lieu le 10 Mai dernier.

[Sundar Pichai](https://twitter.com/sundarpichai), CEO of Alphabet and Google, a pris la parole en premier et annonce la couleur avec la phrase “AI is having a very busy year” que l’on peut traduire en “l’actualité de l’IA est très dense cette année”.

![](https://miro.medium.com/v2/resize:fit:1400/0*-8ls_F3Nlop0iRKD)

Avec la sortie de ChatGPT au monde entier, Google se devait de montrer son savoir-faire en proposant de l’IA générative dans pas mal de leurs produits grand public : Gmail, Google Photos.

Google va en effet proposer différents niveaux pour utiliser son IA :

*   [Bard](https://bard.google.com/) pour le grand public façon ChatGPT avec un prompt pour faire la conversation.
*   [PaLM 2](https://blog.google/technology/ai/google-palm-2-ai-large-language-model/) : des modèles fondamentaux de dernière génération de type LLM (Large Language Model) pour travailler sur l’IA avec la possibilité de les étendre à des domaines précis comme le médical avec [Med-PaLM2](https://blog.google/technology/ai/google-palm-2-ai-large-language-model/)
*   [Vertex AI](https://cloud.google.com/blog/products/ai-machine-learning/generative-ai-support-on-vertexai) : créer ses propres modèles à partir des modèles fondamentaux en utilisant la puissance de Google Cloud

Très important aussi : Google souhaite créer une IA de confiance et éthique. L’idée est de ne pas répondre avec des “fakes”, des informations erronées ou d’ajouter des métadonnées (watermark par exemple) pour indiquer ce qui est généré (image, texte, vidéo) par les AI génératives. Le but est de vraiment créer des AI responsables, [ce lien est intéressant : il donne des informations pertinentes et des bonnes pratiques.](https://ai.google/responsibility/responsible-ai-practices/)

Ensuite, il y a eu les annonces autour de Android 14 et la sortie de 2 nouveaux devices

*   Pixel Fold : une téléphone pliable conçu par Google
*   Pixel Tablet : une tablette pensée pour être déposée sur son dock.

![](https://miro.medium.com/v2/resize:fit:1400/0*8lFE2j2CfQLlTKMH)

Pour conclure, Sundar a tellement insisté sur le thème de “AI” dans les différentes présentations lors de cette keynote que nous avons une vidéo “[Sundar Pichai AI AI AI AI AI AI AI Meme](https://www.youtube.com/watch?v=-P-ein58laA)” qui a fait le buzz dernièrement.

## Avant le I/O Connect Amsterdam

La veille au soir du Google I/O Connect Amsterdam, 500 personnes ont été invitées à l’événement “Community Mixer” organisé par les équipes [DevRel Google](https://devrel.co/about/). L’idée était de réunir les personnes impliquées dans les communautés Google en Europe, Afrique et Moyen-Orient. Nous avons pu échanger avec différents profils :

*   GDG pour “Google Developer Groups” : organisation de meetup et de DevFest
*   GDE pour “Google Developer Experts” : création de contenu (talk, blog, video, opensource)
*   WTM pour “WomenTech Makers” : promotion de la diversité, de l’inclusion
*   GDSC pour “Google Developer Student Clubs” : animation d’événements dans les écoles

De mon côté j’y étais en tant que GDE Cloud (depuis 2018) et GDG Nantes (depuis 2011) avec 3 autres personnes de l’association qui organise le [DevFest Nantes.](https://devfest.gdgnantes.com/)

Lors de la soirée, il y a eu des awards (à l’américaine comme les Oscars) avec 15 catégories et la France était bien représentée ! 🇫🇷 Cocorico : au final, 4️⃣ initiatives françaises ont été nominées dans des catégories :

👉 Social Impact Award : GDG Lille avec le DevFest Lille

👉 Event of the Year Award : GDG Nantes avec le DevFest Nantes

👉 Community Most Active Mentor Award : Aurélie Vache (GDE Cloud)

👉 Collaborative Effort Award : moi-même Julien Landuré (GDE Cloud / GDG Nantes) avec un “Road to Certifications francophone” avec 9 associations GDGs de 4 pays différents 🇫🇷🇧🇪 🇨🇮 🇧🇯

⭐️ …Et le DevFest Nantes a GAGNÉ l’award “Event of the Year” ⭐️

Un grand bravo à toute l’équipe du GDG Nantes pour cette belle récompense ! 10 éditions et un impact important sur l’écosystème Tech ! 🎉

Bref, les ingrédients nécessaires pour réussir une soirée sympa et simple étaient là : apéro, networking et awards. 🏆

## La journée du I/O Connect

Le I/O Connect avait lieu à SugarFactory, un lieu très grand et très beau de style industriel. Il y avait une partie à l’intérieur de l’ancienne usine et également une partie extérieure !

![](https://miro.medium.com/v2/resize:fit:1060/0*rAdb9BTuhPCFsBkf)

Comme vous pouvez le voir sur la photo, la décoration était réellement soignée : on retrouvait vraiment l’ambiance du Google I/O à Mountain View. Très réussie, la conférence ne vend rien : aucun stand sponsor. A la place, il y a des alcôves pour les conférences, des espaces pour le fun : mini golf, espace plage avec du sable, tour en bateau et également des endroits plus sérieux pour les Codelabs ou les Offices Hours pour échanger avec un expert Google sur un sujet précis. Cerise sur le gâteau, il faisait très beau ! ☀️

Le matin a commencé par une keynote et ensuite nous avions 4 salles disponibles pour les talks :

*   Mobile stage
*   Web stage
*   AI stage
*   Cloud stage

L’ensemble du programme est disponible ici : [Google I/O Connect | Amsterdam](https://rsvp.withgoogle.com/events/ioconnect-amsterdam)

J’ai suivi 3 talks et 1 codelab durant cette journée. En voici un résumé.

## What’s new in Web?

par Paul Kinlan

![](https://miro.medium.com/v2/resize:fit:1400/0*Zf0dz9a5XOkTk-yR)

Durant la conférence, Paul a parcouru les dernières nouveautés web. C’était très intéressant de voir des nouvelles APIs arrivées comme la View Transitions API et le WebGPU ecosystem ou une nouvelle mesure des [Core Web Vitals](https://web.dev/vitals/): [INP](https://web.dev/inp/) (pour “Interaction to Next Paint”).

Google continue son ouverture sur l’écosystème web avec le support dans Chrome de plusieurs technologies : next.js, nuxt ou encore Angular

[Plus d’informations ici.](https://io.google/2023/program/cafbe05a-c19e-4fe5-9e25-61c5c0c2f6cf/intl/fr/)

## Codelab GenAI

Ce codelab avait pour objectif de faire une première manipulation des modèles PaLM 2 disponibles sur Google Cloud. À l’aide d’un notebook jupyter dans Vertex AI Workbench, nous avons pu “jouer” avec les modèles (bison, gecko) et leurs paramètres notamment la “température” (plus elle est basse, plus c’est déterministe).

[Plus d’informations : allez sur ce notebook](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/language/intro_palm_api.ipynb) ou [faire le codelab sur cloudskillsboost](https://www.cloudskillsboost.google/focuses/63250)

## Cloud Workstations and modern IDEs

par Alexis Moussine-Pouchkine

![](https://miro.medium.com/v2/resize:fit:1400/0*zmkdsi2Zxp01Q3GK)

Workstation a été annoncé lors du dernier Cloud Next. L’idée est de pouvoir travailler dans un environnement pour développeurs qui est dans le Cloud.

L’intérêt est de pouvoir paramétrer, dupliquer, instancier des environnements de développeurs facilement.

Pour cela, plusieurs possibilités : le SDK gcloud, les APIs, la console cloud et maintenant Terraform.

Une démo a été faite en utilisant Jetbrains Gateway.

[Plus d’informations sur cette page.](https://cloud.google.com/workstations/docs/develop-code-using-local-jetbrains-ides)

## Duet AI with Google Cloud

Par Joe Shirey & Turan Bulmus

![](https://miro.medium.com/v2/resize:fit:1400/0*I7Ptvze4Ye90xG5i)

“Duet AI for Google Cloud” est un nouvel outil propulsé par la GenAI qui permet d’avoir un compagnon sur Google Cloud. L’idée est de pouvoir lui demander des commandes spécifiques, l’interroger sur les bonnes pratiques que vous soyez développeur, devops ou sre.

J’aime bien la philosophie ! Avec le serverless, l’objectif est de passer moins de temps à effectuer des tâches de “server management” et de se concentrer sur les fonctionnalités produit. Avec le Cloud et cet assistant Duet, l’objectif est similaire : passer moins de temps à effectuer des tâches de “cloud management”.

## Conclusion

Le Google I/O Connect 2023 à Amsterdam a été une magnifique expérience, mettant en lumière les dernières avancées technologiques et l’engagement de Google envers l’IA et l’innovation. Cet événement a démontré la volonté de Google de rendre l’IA accessible à tous, en proposant des solutions génératives puissantes tout en mettant l’accent sur la confiance et l’éthique.

Cela fait vraiment du bien de revivre un événement en présentiel de cette ampleur organisé par Google, avec plus de 1000 personnes dans un environnement agréable et très dev-friendly. Le I/O Connect Amsterdam a réuni des experts, des développeurs et des passionnés du monde entier au sein de la communauté Google, favorisant le partage avec des moments de networking.

La journée est passée très vite ! J’ai pu rencontrer quelques googlers, des personnes de la communauté notamment certaines personnes que je n’avais jamais vu en vrai…

tweet: https://twitter.com/EzekiasBokove/status/1676279047762878464

Vivement les prochaines conférences ! D’ailleurs, je serai présent au Google Cloud Next fin Août avec Zenika et le GDG Cloud Nantes. N’hésitez pas à me contacter si vous voulez qu’on se rencontre là-bas ! 👋

tweet: https://twitter.com/jlandure/status/1671512302317625345