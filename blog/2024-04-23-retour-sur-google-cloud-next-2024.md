Published in [Zenika](https://blog.zenika.com/2024/04/23/retour-sur-google-cloud-next-2024/)

Mar 25, 2024

6 min read

[Linkedin](https://www.linkedin.com/posts/zenika_google-cloudnext24-by-zenika-ugcPost-7195806297038962689-c4z-)

# Retour sur Google Cloud Next 2024

Du 09 au 11 avril, Google a organisé sa grande conférence sur Google Cloud en présentiel dans un nouveau lieu : Las Vegas. Google Cloud a pu organiser un événement gigantesque avec près de 30 000 participants à Las Vegas après avoir été plusieurs années à San Francisco où [nous étions l’année dernière](https://blog.zenika.com/2023/09/13/retour-sur-google-cloud-next-2023/).

Cette année encore, Zenika était présent sur place en tant que [partenaire Premier](https://cloud.google.com/find-a-partner/partner/zenika) avec des [formateurs officiels](https://googlecloudcertified.credential.net/?1=zenika).

Nous avons profité de Vegas pendant 4 jours : 1 journée dédiée [pour les formateurs officiels Google Cloud](https://training.zenika.com/fr-fr/officials/gcp) le lundi et 3 journées de conférences du mardi au jeudi.

![](https://lh7-eu.googleusercontent.com/5TbkaQgzHTIEWvdsN8CAtP8HESV0GHGi_PKqfZmeQ7OTa0DP_bP66xDCK8pTizzC_fGXVX8He142EV9ogQReTzSwuo4Tvb0pKMC7FLd2q6yegaqp5klcYrp-9VJKyLgN9NqqF6aWlmfUSzgvWeMwpNo)

Disclaimer : Ce retour est notre vision de ce qui a été annoncé lors de la conférence Cloud Next, il est donc basé sur notre ressenti et nos centres d’intérêts. Il n’est donc pas représentatif de toutes les annonces faites lors de cette conférence. Il y a eu pas moins de 218 annonces que vous pouvez retrouver en entier avec cet article de blog : [Google Cloud Next 2024 wrap up](https://cloud.google.com/blog/topics/google-cloud-next/google-cloud-next-2024-wrap-up).

## 🚀 Keynote d’ouverture

Il fallait être à l’heure pour avoir une place dans le grand auditorium de la keynote : au moins 8000 personnes étaient réunies pour partager ce moment. 

![](https://lh7-eu.googleusercontent.com/tD5rLjjZcCt7soyi1dm6PJLUNqrFMfSFqQZUAU_q2WwiEKhsX9oeeplOXmjDtAmT_EqCQmxm8obLO-ayhBmBANHw29UFpzHB9qV6K2_16Jcm5Akuly_2Pow0yAv3myH6En1mmfR_7917ayg0k9t44uI)

Une fois le compte à rebours terminé, Thomas Kurian, CEO Google Cloud, a débuté la keynote d’ouverture avec quelques faits marquants : 

*   Google Cloud est le Cloud Provider avec la plus grande croissance sur le marché grâce aux sujets AI
*   L’infrastructure s’agrandit encore avec 2 nouvelles régions : Dammam en Arabie Saoudite et Johannesburg en Afrique du Sud ainsi que 6 nouveaux câbles sous-marins

Ensuite, Sundar Pichai, CEO Google a pris la main pour ré-introduire comment la GenAI est un “momentum” dans le business avec un marché grandissant pour Google Cloud à 36 Milliards de part de marché grâce à ses clients et partenaires. 

Nous comprenons vite le slogan “the new way to cloud” avec l’idée qu’une réelle transformation a lieu en ce moment avec cette vague GenAI. Google annonce que 60% des startups GenAI et même 90% des licornes AI sont des clients Google Cloud.

## ⭐️ L’omniprésence de la GenAI

Lors de la keynote d’ouverture, la partie GenAI a été omniprésente : porté par le nom “Gemini” qui remplace Duet et autre Bard, nous avons eu la grosse annonce : la sortie en “preview” du modèle Gemini 1.5 Pro qui propose jusqu’à 1 millions de tokens en entrée soit 1 heure de vidéo, 11 heures d’audio, 30 000 lignes de code ou encore 700 000 mots…

![](https://lh7-eu.googleusercontent.com/e2pyDgn_N1_Snk0B4bcDXOl3G85cC9trx4O6n1e9RwRdJIPXluzHBBObqtdx7cMM_OirVkf5yEG3_FUpo4mnPe5oWN0F2oH1YoZywrOxPlDdtBVyWhd4iMIwZFQwScLrb46LW93a3ZKQp-DJJARvt9o)

## 📣 Nouveautés et innovations

Avant de passer à l’utilisation de l’IA dans différents domaines, Google Cloud a rappelé à quel point il mise sur une infrastructure puissante pour accueillir et optimiser les charges de travail IA avec l’arrivée de différents processeurs : A3 Mega VMs, Nvidia GB200 NVL72, les [TPU v5p](https://cloud.google.com/blog/products/ai-machine-learning/introducing-cloud-tpu-v5p-and-ai-hypercomputer). Cela s’accompagne d’outils pour optimiser l’accès et donc le prix des ressources GPU comme la sortie en GA de [Dynamic Workload Scheduler](https://cloud.google.com/blog/products/compute/introducing-dynamic-workload-scheduler).

Autre fait notable, l’affichage de GDC (Google Distributed Cloud) permettant d’avoir accès à une partie de la puissance de Google Cloud “OnPrem” c’est-à-dire chez soi ou pour faire du “Edge Computing”.

L’autre annonce côté “infra” a été la sortie d’un [processeur concurrent ARM appelé “Google Axion”](https://cloud.google.com/blog/products/compute/introducing-googles-new-arm-based-cpu), optimisé pour les datacenters. Celui-ci arrivera en preview prochainement.

Google Cloud a aussi démontré le support d’autres modèles avec le support de 

*   Anthropic Claude 3 en GA (“General Availability”, c’est-à-dire disponible pour tout le monde)
*   un nouveau modèle CodeGemma, un modèle open dédié au code
*   et évidemment tout plein d’autres modèles déjà présents 

![](https://lh7-eu.googleusercontent.com/2lxOTukxys9PmTtH_KJlUuszWID7VKv36V5mJMf0RuTptztlg_o-7XGHgAatvljJiPVcjMbIwTdutTsP04fuhzjygrqQjdV8XGOYCkZ-5ARKtzGRostI714y3G8_gtqf5k00L7AkjYLhvC3aidDkRbw)

Un autre sujet intéressant est la sortie d’un outil de “Prompt Management” en preview pour collaborer au sein d’une même équipe : comparer les prompts, la qualité des résultats associés avec un affichage “side by side”.

## ⚡️ Les agents : l’IA au service de tous

Nous avons pu retrouver Gemini dans Google Cloud sous différentes formes représentées par des “agents” : 

![](https://lh7-eu.googleusercontent.com/vdi-uDI23k3NgkqUOk9Jjp6nrliiJWHGJrDmiKacZkvMGxrS6G40lIgUFzrdHhu2cYKPa9f_VrSyNCtWOWraEEFGFyhk59veY4J8lkr9oGSdWO8aDE6E6AQFKdB4395Qm8Lo1ndOW-xW_h7yFuBJfXg)

*   Customer Agents : des IA orientés utilisateurs finaux avec l’exemple de rendre les voitures autonomes comme l’a montré Mercedes Benz ou donner des expériences clients pertinentes.  

    La sortie de “[Vertex AI Agent Builder](https://cloud.google.com/blog/products/ai-machine-learning/build-generative-ai-experiences-with-vertex-ai-agent-builder)” permet de rendre cela possible avec des conversations naturelles et des résultats en lien avec vos données d’entreprise.

*   Employee Agents : rendre ces salariés plus performants en entreprise grâce à l’IA avec l’exemple de Uber et l’utilisation de Workspace.  

    Le “Gemini for Workspace” permet d’être plus productifs avec des suppléments (“add-on” en anglais). Nous avons la capacité de poser des questions sur nos documents de notre drive ou encore des vidéos dans des emails avec des réponses indiquant un lien vers la source de la réponse.  
    Le produit “[AI Meetings & Messaging Add-on](https://workspaceupdates.googleblog.com/2024/04/google-workspace-ai-meetings-and-messaging-add-on.html)” est affiché à $10 par mois par utilisateur et permet de rester concentré sur sa réunion tout en ayant un compte-rendu ensuite.  

*   Creative Agents : utiliser l’IA pour le marketing en créant des campagnes marketing dynamiques.  

    Par exemple, l’idée est de pouvoir créer des publicités avec l’IA ciblant spécifiquement certaines audiences.  
    Pour cela, Google sort un nouvel outi “[Google Vids](https://workspace.google.com/products/vids/)” pour créer des vidéos à partir d’un prompt générant une premier script et permettant d’ajouter des images tout cela de façon collaborative façon Workspace !  
    Google a aussi sorti « Imagen » en version 2.0 pour générer des images ou des photos ainsi que le “Text-to-Live Image” (en preview) pour créer des images animées de quelques secondes.  
    Tout cela supporte le Digital Watermarking sur lequel Google DeepMind travaille pour pouvoir reconnaître ce qui est généré par l’IA.  

*   Data Agents : donner l’accès à l’IA depuis les outils Data de Google Cloud mais également avoir de l’IA pour supporter au mieux ces outils comme “Gemini in BigQuery” ou “Gemini in Looker” en preview, “BigQuery Data Canvas” pour faire des notebooks, “Vector Indexing in BigQuery and AlloyDB”.  

*   Code Agents : la sortie de “[Gemini Code Assist](https://cloud.google.com/products/gemini/code-assist)” boosté grâce à Gemini Pro 1.5 pour augmenter les équipes de développement et également “Gemini Cloud Assist” en preview pour aider à opérer sur la plateforme Google Cloud (avec des bonnes pratiques devops, finops et sécurité).  

*   Security Agents : protéger les données et l’encryption avec la sortie de “Gemini in Threat Intelligence”, “Gemini in Security Operations” et “Gemini in Security Command Center” en preview pour l’analyse de logs ou encore faire de la remédiation.

L’aspect Marketing avec la partie “Creative Agents” est clairement un avantage de la plateforme pour permettre de créer des campagnes marketing de qualité. Durant une démo, ils ont montré la création de photo, de storyboard, la création d’un script pour un podcast pour mettre en avant un produit pour une audience spécifique etc.

L’autre aspect intéressant de tout ça du point de vue développeur est le gain apporté par tous ces “assistants”. Voici le gain en productivité affiché dans les équipes de développement : 

*   “Wayfair” indique 55% 
*   “Goldman Sachs” indique 40%
*   “Turing” & “Quantiphi” indique 30%
*   Tant dis que Commerzbank indique plutôt une aide sur la partie sécurité en scannant leur codebase.


## ☀️ L’ambiance

La conférence a eu lieu pendant  3 jours dans un nouveau lieu : Las Vegas, et Zenika comme d’autres partenaires Google Cloud étaient présents ! En amont de la conférence, [nous avons planifié ce que l’on souhaitait visiter (cf cet article)](https://medium.com/googledeveloperseurope/google-cloud-next-2024-new-location-new-guide-ec6e7fc9ead3)  et nous avons pu profiter du weekend pour effectuer un road trip jusqu’au Grand Canyon en visitant différents lieux touristiques notamment la fameuse « Route 66 » ou encore la « [Sphere](https://www.thespherevegas.com/)« .

![](https://lh7-eu.googleusercontent.com/qnRBlGecPni7CSDVFhUpK5Qhmg0VIQGl9yC1IJU8-xp02L4o4wkLX1hmgED7TMdpq-_y9-TR0qFmrEs8WBQu1DO6OYK7b2saRhJfMdOHVxhpioQuo0nt26EjgfdZJnFbm4qoknrKEnsRDf_ctvZhSik)

Nous avons pu profiter des différents moments proposés : la keynote orientée produit, la keynote orientée développeur, plus de 500 sessions, une partie dédiée au Partenaire ainsi que différentes zones de stands.

Pas moins de 400 sponsors étaient présents pour montrer leurs savoir-faire – souvent en rapport avec le GenAI. 
Côté Google, il y avait aussi un lounge réservé pour les personnes certifiées (ainsi que les GDE Cloud / [Champion Innovators](https://cloud.google.com/innovators/champions)) permettant d’avoir à tout moment un rafraîchissement ou un café.

Et il faut parler des soirées : celle officielle de Google Cloud avec Kings of Leon en concert dans le fameux stade des Raiders “[Allegiant Stadium](https://www.allegiantstadium.com/)”, et la vingtaine de soirées plus ou moins officielles qui nous ont permis de découvrir différents rooftops de Las Vegas.

[![](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2024/04/image-4.png?resize=800%2C450&ssl=1)](https://www.linkedin.com/posts/bodo-razakalalao-49197b231_googlecloudnext-zenika-activity-7185827330538250240-zndr)

## 📝 Conclusion

Ce fut un moment unique de découvrir un Cloud Next plus grand dans un nouveau lieu. La part de GenAI est toujours importante avec néanmoins l’avantage d’être disponible et implémentée là où c’était encore que des ”idées” lors de [Cloud Next 2023](https://blog.zenika.com/2023/09/13/retour-sur-google-cloud-next-2023/).  
A noter également une grosse présence des 400 sponsors et pas moins de  300 retours clients et partenaires sur des utilisations de l’IA.

[![](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2024/04/image-3.png?resize=800%2C600&ssl=1)](https://www.linkedin.com/posts/nbouron_googlecloudnext-zenika-next24-activity-7183485984162955265-07fd)

Richard Siroter, Lead Developer Relations chez Google Cloud le résume très bien à la fin de la “keynote developer” : que ce soit pour “build, run, operate” tout cela est plus facile grâce à Gemini 1.5 Pro. 

“From coding to running platforms to operations, software simply better with Gemini” – [Richard Seroter](https://www.linkedin.com/in/seroter)

L’événement a réuni 30 000 participants et le rendez-vous est déjà pris pour l’année prochaine du [9 au 11 Avril 2025 toujours à Las Vegas](https://cloud.withgoogle.com/next#25_updates).

![](https://lh7-eu.googleusercontent.com/1yqzH-F_SNMuP2NlUI5zHopx2HvHVZ_mLQ9NKKuVkV4Ackwe3okz0dUvcLlmQGOXeGMNUBV6MU_GdGIc1KfsodHBQQ7tS3T6UlLfHbL7no_T68wrf59OXPHz4GzDLhhj4n4x-HVfB0kbWTIvJ6Dyzv0)

A noter que [toutes les sessions sont déjà en ligne](https://www.youtube.com/@googlecloud/videos).