Published in [Zenika](https://medium.com/zenika)

Mar 08, 2023

5 min read

# 🚀 Public Cloud & Move to Cloud : 5️ stratégies possibles !

Quand nous parlons de migration Cloud, nous parlons de transférer des applications d’un endroit connu : l’existant à un endroit plus ou moins connu : le Public Cloud.

![](https://miro.medium.com/v2/resize:fit:1400/1*vBTEQNmHtLYpCmMZU3iXnw.png)

“Move to Cloud” Journey: different paths are available — generated with Midjourney

Selon le Cloud Provider, la maturité des projets, il existe différentes stratégies pour faire votre migration “Move to Cloud”.

Voici les 5 termes que nous retrouvons communément dans le jargon Cloud :

*   Rehost
*   Replatform
*   Refactor
*   Rebuild
*   Replace

Le but de cet article est d’expliquer en 🇫🇷 en quoi consiste chacune de ses stratégies.

## Rehost

L’approche Rehost ou également appelée “Lift & Shift” est la première stratégie que les entreprises ont adoptée pour aller sur le Cloud.

En 2012, AWS a misé sur le IaaS, c’est-à-dire des VMs et Google Cloud plutôt sur PaaS avec le produit AppEngine. Rapidement nous avons pu observer les parts de marché que AWS a pu prendre sur ce sujet : les entreprises prenaient les workloads existants (VMware etc) et les passaient sur AWS sur des VMs d’où le terme “Rehost”.

Cet essor a amené à une première définition pour Rehost / “Lift & Shift” : refaire ce qu’on fait chez soi “On Premise” avec des compétences équivalentes en termes de compute, de stockage et de networking.

La promesse est de pouvoir migrer ces traitements et ces données sans changer le code ou l’architecture tout en profitant de certains éléments natifs au Cloud Public comme l’autoscaling.

L’avantage est d’avoir rapidement un résultat sans trop changer la façon de travailler et sans forcément optimiser son application pour le Cloud. On parle souvent des fameux Cloud Patterns (dont les “12-factor”)

📺 Youtube : [Vidéo sur les Cloud Patterns](https://www.youtube.com/watch?v=qlF378oDqW8)

L’inconvénient de cette stratégie est le risque de déployer quelque chose qui ne profite pas totalement des bénéfices du Cloud : élasticité, ressources à la demande et des tendances actuelles : conteneurisation, microservices…

## Replatform

Comparé au Rehost, l’approche Replatform a pour but de remplacer certaines briques techniques par des services proposés par le Cloud Provider.

Par exemple, nous allons peut-être conserver nos VMs existantes et les migrer sur le Cloud mais nous en profitons pour passer sur un service MySQL managé par la plateforme.

Ces changements d’infrastructure ou d’architecture ont pour objectif de tirer parti de la valeur ajoutée du Cloud.

Toujours sur le même exemple de la base de données MySQL managée, le Cloud Provider proposera sans doute en automatique des opérations récurrentes et nécessaires :

*   La mise à jour de patch de sécurité
*   La gestion du backup
*   La possibilité de passer en HA (High Availability / Haute Disponibilité)
*   La possibilité de faire du Scaling vertical en quelques minutes

L’avantage de cette stratégie est de commencer à profiter des bénéfices du Cloud tout en minimisant les changements applicatifs et par conséquent la charge de travail et les risques.

## Refactor

Également appelé “ReArchitecting”, cette démarche implique d’opérer des changements importants sur son application et l’architecture de son SI pour profiter pleinement des avantages du Cloud.

Par exemple, nous allons prendre nos VMs et en créer des conteneurs tout en utilisant un orchestrateur Kubernetes pour les accueillir.

Grâce à ces modifications, le chemin entrepris est celui de devenir “Cloud-Native”, c’est-à-dire adopter les principes inhérents à une bonne architecture Cloud : microservices, conteneurisation, démarche DevOps / SRE, résilience, flexibilité, scalabilité etc.

Évidemment, dans une telle stratégie, il faut choisir les composants à refactoriser et là encore, il peut y avoir débat : prendre une application non critique pour se tester ou utiliser une application critique côté business pour vérifier l’apport du Cloud.

Vous l’aurez compris, dans cette stratégie, le but est d’adopter totalement les principes du Cloud et de comprendre comment notre système peut en profiter.

L’inconvénient de cette stratégie est le temps à passer pour créer sa roadmap claire et cohérente, modifier certains composants ainsi que la montée en compétence des équipes.

## Rebuild & Replace

Les 2 dernières stratégies présentées correspondent à des démarches plus radicales.

La première “Rebuild” est l’idée de partir de la feuille blanche “from scratch” pour déployer sur le Cloud. Utile quand nous souhaitons profiter des services managés offerts par le Cloud pour un nouveau service ou pour un service peut-être plus ancien mais avec une forte dette technique. Évidemment, cela nécessite un investissement important au départ mais le pari peut s’avérer payant dans le sens où chaque release, déploiement, mise à jour sera plus simple, rapide et efficace.

“Replace” est une stratégie importante quand nous sommes amenés à dessiner une trajectoire Cloud. Tout le monde a entendu parler de la logique “build vs buy”. Quand nous passons sur le Cloud, que nous allons devoir réinvestir, il faut toujours se poser la question si l’outil développé en interne n’est pas déjà disponible sur étagère avec les mêmes fonctionnalités.

Ainsi, beaucoup d’entreprises hébergeaient dans les années 2010 leurs outils de dépôt de code (Git) et de CI/CD mais avec l’avènement des GitHub, GitLab, CircleCI, Cloud Build etc l’idée n’est pas de passer du temps à maintenir ces outils, mais plutôt de rester uniquement “utilisateur” de ces outils et de se focaliser sur la valeur apportée à son produit.

Nous passons dans un logique SaaS : Software As A Service où nous payons pour un service externalisé et intégré à notre système.

Ces 2 stratégies nécessitent une vision long-terme et un pouvoir de décision conséquent aux vues des modifications budgétaires que cela applique : temps passé pour le “Rebuild”, externalisation pour le “Replace”.

## Conclusion

Selon sa capacité à appréhender la logique Build vs Buy (vs Modify), ces différentes stratégies peuvent être adoptées pour un périmètre donné et pour une durée précise.

Viennent en plus d’autres domaines à maîtriser qui rentre dans l’équation quelque soit la stratégie sélectionnée: sécurité, conformité, greenit, accessibilité.

📺 Youtube : [Vidéo sur la sécurité du Cloud par Eric Briand](https://www.youtube.com/watch?v=dCy6rHLGT6k&t=701s)

Ces stratégies ont toutes des avantages et des inconvénients. Pour mieux représenter leurs usages, nous avons essayé de placer ces différentes démarches sur 2 axes :

*   Adoption : capacité à embrasser le Cloud avec la montée en compétence que cela nécessite
*   IaaS — Managed Services : appétence à faire moins de server management en utilisant des services managés

![](https://miro.medium.com/v2/resize:fit:1400/0*dxg5j0-a4p-8SA3Z)

Représentation des différentes stratégies “Move To Cloud”


Pour finir, sachez qu’à Zenika, nous accompagnons des entreprises de toute taille à définir leurs stratégies “Move to Cloud” et particulièrement sur Google Cloud. Que ce soit du mode “Rebuild” ou “Refactor plutôt pour des startups (Digital Native ) ou du “Rehost” ou “Refactor” plutôt pour des grands groupes avec leur système d’information legacy.

Zenika étant une société avec des développeurs, nous sommes spécialisés “Application Development” dans le cadre du partenariat avec Google Cloud : nos clients racontent leurs histoires de migration Cloud [sur notre page partenaire Google Cloud](https://cloud.google.com/find-a-partner/partner/zenika).

💚 Si vous souhaitez vous former gratuitement sur ces sujets ou recevoir des news, vous pouvez vous inscrire à nos newsletters.