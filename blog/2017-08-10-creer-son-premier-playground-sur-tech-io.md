[![](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2017/08/Tech.io_Logo_Full_Horizontal_White_1024-1.png?resize=800%2C445&ssl=1)](https://blog.zenika.com/wp-content/uploads/2017/08/Tech.io_Logo_Full_Horizontal_White_1024-1.png)[Web](https://blog.zenika.com/category/themes/web/) 

# Créer son premier Playground sur Tech.io

[10 août 2017](https://blog.zenika.com/2017/08/10/creer-son-premier-playground-sur-tech-io/ "23 h 02 min") [Julien Landuré](https://blog.zenika.com/author/jlandure2/ "Julien Landuré")

Chez [Zenika](https://www.zenika.com/), durant le séminaire des nouveaux arrivants, nous participons à différents ateliers notamment un atelier “carpaccio programming”. J’ai trouvé qu’il serait intéressant de l’implémenter sur la plateforme [Tech.io](https://tech.io) : voici mes premiers essais et mes retours sur cette plateforme.

# La plateforme Tech.io

Tech.io est un site web propulsé par [Codingame](https://www.codingame.com/), une plateforme d’exercices de code en ligne très populaire au sein de Zenika :

*   Nous faisons régulièrement des [Clash Of Code via un bot Slack](https://www.codingame.com/help/codingame-slackbot)
*   Nous hébergeons régulièrement des [CodingHub](https://www.codingame.com/blog/codinghubs-meet-code-enjoy/) lors de la sortie de leurs jeux concours
*   Nous utilisons la plateforme Codingame [côté RH](https://www.codingame.com/work/solutions/coding-skill-assessment) pour déceler les talents

Revenons sur tech.io et sa description officielle :

> <cite>Tech.io is a collaborative platform to discover, share and experiment technologies directly from your browser. Craft hands-on tutorials, demos or articles on topics that matter to you.</cite>

Tech.io est encore en beta et permet de créer des tutoriaux, des codelabs, des workshops, des exemples de code… Le “WHY” est très bien décrit dans un [manifeste dédié](https://tech.io/manifesto).  
La plateforme offre des fonctionnalités intéressantes :

*   Multi langage : le créateur d’un playground peut choisir le langage qu’il souhaite car tout se passe dans des conteneurs Docker. Nous pouvons donc imaginer faire coder dans n’importe quel langage, en utilisant n’importe quel framework ou base de données derrière.  
    Exemple : requête Cypher sur du neo4j, [projet Reactor avec du Spring 5](https://tech.io/playgrounds/929/reactive-programming-with-reactor-3/Intro), s’essayer à [SASS](https://tech.io/playgrounds/166/sass), faire du nodejs, du python, du Go…
*   Support de Docker avec des [images de base proposées par Tech.io](https://tech.io/playgrounds/408/tech-io-documentation/runner-list) appelées “Runner”
*   Support du Markdown pour les explications et la description du cours, des TPs
*   Support d’un fichier “techio.yml” pour décrire les différentes étapes du tutorial
*   [Mode Viewer :](https://tech.io/playgrounds/408/tech-io-documentation/add-a-viewer) possibilité pour des applications web de voir le résultat en ligne (disponibilité d’une url dédiée pour tester le code “front” produit)
*   [Mode Coding Exercise :](https://tech.io/playgrounds/408/tech-io-documentation/add-a-coding-exercise) possibilité de lancer des tests pour vérifier un comportement voulu
*   [Mode Quiz :](https://tech.io/playgrounds/408/tech-io-documentation/add-a-quiz) possibilité de gérer des quizz
*   Possibilité d’embarquer les exercices de code sur d’autres sites web ou blogs
*   Utilisation de Git pour déployer le tutorial sur la plateforme
*   Tout cela gratuitement

Toutes ces fonctionnalités permettent de mélanger des phases théoriques (écrites en [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)) et des phases pratiques (écrites directement dans le navigateur web et compilé/testé/lancé dans un conteneur [Docker](http://docker.com))  
La plateforme s’adresse à deux types de population :

*   Les créateurs de contenu :
    *   Developer advocate pour expliquer des technologies en profondeur
    *   Entreprise pour expliquer un nouveau produit ou une nouvelle API
    *   Speaker (conférencier) pour préparer leurs codelabs
    *   Teacher (professeur) pour créer des [formations](https://training.zenika.com/).
*   Les utilisateurs : les développeurs curieux et passionnés

Aujourd’hui, la plateforme compte environ 70 [playgrounds](https://tech.io/explore/latest) avec notamment le cours “[Advanced Python Features](https://tech.io/playgrounds/500/advanced-python-features)” très populaire avec plus 31 000 utilisations.

Pour information, tout le contenu publié sur la plateforme sera sous la licence [Creative Commons Attribution-ShareALike 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/) Pour plus de détails sur l’aspect juridique, Tech.io possède une [page dédiée](https://tech.io/legal).

# Créer son premier playground

Pour créer un playground, il suffit de cliquer sur son compte et la plateforme nous donne une url GIT à utiliser. _N’oubliez pas d’indiquer votre clé ssh pour pouvoir pusher vos commits comme indiqué sur le _[_Getting Started_](https://tech.io/playgrounds/408/tech-io-documentation/create-a-playground)  
Ensuite, nous allons créer un premier fichier Markdown appelé intro.md pour expliquer le but de notre tutorial.  

<pre class="toolbar:2 toolbar-overlay:false toolbar-hide:false toolbar-delay:false show-title:false plain:false lang:default decode:true"># Welcome to my first playground on Tech.io</pre>

Pour indiquer les différentes étapes de notre tutorial, nous allons créer un fichier  techio.yml.

<pre class="toolbar:2 toolbar-overlay:false toolbar-hide:false toolbar-delay:false show-title:false plain:false lang:default decode:true ">title: Carpaccio programming JS
plan:
  - id: Intro
    title: Introduction
    statement: intro.md</pre>

Le titre global _« title”_ servira de titre pour notre playground et dans le plan, nous allons indiquer chaque section avec un _“id”_ (sera affiché dans l’url), un _“title”_ (sera affiché en haut et dans les menus) et un _“statement’_ (sera le contenu de notre page).  
Enfin, il suffit de commiter cela et de pousser ça sur leur git avec la commande  git push techio master.

# Faire un exercice de code

Nous allons maintenant ajouter une section pour laisser l’utilisateur coder. L’exercice est simple : afficher _“Hello World”_ dans la console Javascript. Pour cela, nous allons proposer 2 fichiers :

*   Un premier fichier pour donner des pistes à l’utilisateur (on peut imaginer du code à trou)
*   Un deuxième fichier de test pour valider que l’utilisateur a bien codé ce que l’on attend. C’est très intéressant d’avoir une démarche [TDD](https://fr.wikipedia.org/wiki/Test_driven_development)

Fichier  src/hello/hello.js

<pre class="toolbar:2 toolbar-overlay:false toolbar-hide:false toolbar-delay:false show-title:false plain:false lang:default decode:true">// Hi, there
// use console.log to print something
module.exports = () => {
};</pre>

Fichier  src/hello/hello.test.js

<pre class="toolbar:2 toolbar-overlay:false toolbar-hide:false toolbar-delay:false show-title:false plain:false lang:default decode:true">const program = require("./hello.js");
let outputData = “”
const storeLog = inputs => (outputData += inputs);
test("console log Hello World", () => {
  console["log"] = jest.fn(storeLog);
  program();
  expect(console.log).toBeCalled();
  expect(outputData).toBe("Hello World");
});</pre>

Nous utilisons [Jest](http://facebook.github.io/jest/) pour faire le test unitaire en JS. Rien de spécial dans ce code Jest même si l’avantage est qu’un bon framework de test va respecter les [standards de développement](https://en.wikipedia.org/wiki/Exit_status#Shell_and_scripts) :

*   Retourner 0 s’il n’y a pas d’erreur
*   Retourner 1 s’il y a une erreur

Automatiquement, la plateforme Tech.io affichera un joli “Success” si le code écrit est bon !  
Il ne nous reste plus qu’à mettre à jour le markdown intro.md et notre fichier techio.yml

<pre class="toolbar:2 toolbar-overlay:false toolbar-hide:false toolbar-delay:false show-title:false plain:false lang:default decode:true"># Welcome to my first playground on Tech.io
@[Can you create an Hello World program?]({"stubs": ["/hello/hello.js"], "command": "npm test"})
</pre>

Ce bout de Markdown va créer une petite fenêtre de code directement dans notre page web.  
Nous voyons qu’il faut indiquer le squelette “stubs” et la commande (“command”) pour valider notre code.

<pre class="toolbar:2 toolbar-overlay:false toolbar-hide:false toolbar-delay:false show-title:false plain:false lang:default decode:true">title: Carpaccio programming JS
plan:
  - id: Intro
    title: Introduction
    statement: intro.md
projects:
 node:
   root: /src
   runner: techio/node-npm-runner:1.1.0-node-7.4</pre>

Là, pour notre projet [NodeJS](https://nodejs.org), nous spécifions quel “runner” (c’est-à-dire quelle image Docker) nous voulons utiliser. Je suis parti de [celle préconisée par Tech.io pour faire du NodeJS](https://github.com/TechDotIO/node-npm-runner). Le paramètre “root” permet d’indiquer quel répertoire sera ajouté dans notre conteneur.  
Déployons et testons maintenant notre premier playground. Voici ce que donne l’interface web côté créateur de contenu :[  
](http://blog-zenika.ovh/wp-content/uploads/2017/08/techio-publish.png)  
[![techio-publish](https://blog.zenika.com/wp-content/wp-content/uploads/2017/08/techio-publish.png?resize=800%2C461)](https://blog.zenika.com/wp-content/wp-content/uploads/2017/08/techio-publish.png)  
Et voici la page web de l’utilisateur pour notre _“Hello World”_ :  
[![techio-success](https://blog.zenika.com/wp-content/wp-content/uploads/2017/08/techio-success-1078x516.png?resize=702%2C336)](https://blog.zenika.com/wp-content/wp-content/uploads/2017/08/techio-success.png)Et en cas d’erreur, cela donnera :  

[![techio-failure](https://blog.zenika.com/wp-content/wp-content/uploads/2017/08/techio-failure.png?resize=800%2C183)](https://blog.zenika.com/wp-content/wp-content/uploads/2017/08/techio-failure.png)  
Pour information, voilà les limites techniques pour faire tourner nos conteneurs sur la plateforme Tech.io :

*   1 seul “runner” à la fois par utilisateur. Si l’utilisateur clique sur “RUN”, le runner précédent est tué.
*   30 secondes de CPU maximum pour l’exécution (sauf pour les “viewers” qui restent disponibles 2 minutes depuis la dernière requête effectuée)
*   720 Mo de mémoire
*   10 Go de disque
*   Limitation à 100 processus
*   Limitation sur la bande passante

# Conclusion

Une fois notre playground complété et testé sur Tech.io, il n’y a plus qu’à le publier et communiquer sur les réseaux sociaux 

[![techio-mini2](https://blog.zenika.com/wp-content/wp-content/uploads/2017/08/techio-mini2.png?resize=280%2C374)](https://blog.zenika.com/wp-content/wp-content/uploads/2017/08/techio-mini2.png)  
Tech.io publie les nouveaux playgrounds chaque semaine dans une “[weekly newsletter](https://tech.io/blog/)” ainsi que sur leur [twitter](https://twitter.com/TechDotIO/status/895221372263309312).  
Voilà quelques retours personnels sur la plateforme :

*   ???? Très simple et très ouvert : nous écrivons en Markdown, utilisons n’importe quelle image Docker, pouvons publier en utilisant Git et voyons les logs de la plateforme. **La “Developer Experience” est bonne.**
*   ???? A chaque publication, nous avons les logs de construction de notre image Docker et nous avons toujours 2 versions disponibles : celle publiée et celle que l’on teste.
*   ???? L’utilisateur a directement un menu sur le playground avec les étapes réussies et échouées.
*   ???? L’utilisateur peut éditer plusieurs fichiers à la fois (plusieurs « stubs »).
*   ???? Le code écrit par l’utilisateur est sauvegardé d’une session à une autre dès lors qu’il clique sur “Run”. L’utilisateur est par contre obligé de copier/coller son code d’étape en étape dans le cadre d’un TP incrémental.
*   ???? Un gros défaut cependant : pas de tests en local pour le créateur de contenu même si l’utilisation combinée du markdown et des fichiers sources est assez triviale, nous aimerions pouvoir tester en local.
*   ???? De la même manière, il serait intéressant d’avoir toutes les X dernières versions déployées. Je suis un grand amateur de PaaS et c’est assez plaisant de voir toutes ses versions déployées et de choisir la version à mettre en production avec un bouton (mécanisme aussi nommé “Push To Deploy”)
*   ???? Il faudrait pouvoir se connecter avec son compte GitHub pour directement avoir une publication automatique sur la plateforme à chaque commit sur une branche spécifique.
*   ???? La plateforme n’autorise pas d’avoir un exercice multi langage au sein d’une même section de code façon “Codingame” où l’utilisateur choisit son langage. Dans l’idéal, nous pourrions faire des tests agnostiques au langage en se basant sur la sortie console (et des tests Bash façon [BATS](https://github.com/sstephenson/bats)).
*   ???? Quel est le _« business model »_ de cette plateforme ?

Pour les [besoins de Zenika](https://www.zenika.com/evolution/), voilà quelques features manquantes et quelques réflexions sur la plateforme :

*   ???? Sommes-nous obligés d’écrire les playgrounds en anglais sur Tech.io ?
*   ???? Nous ne pouvons pas bloquer l’utilisateur à une étape. Il peut donc aller directement à la dernière étape de notre codelab… De la même manière, nous n’avons pas le suivi de l’avancement des “stagiaires” comme on peut avoir avec [GitHub Classroom](https://classroom.github.com/)
*   ???? Nous ne pouvons pas créer de playground privé. D’un point de vue idéaliste, la plateforme est faite pour partager la connaissance donc c’est tout à fait normal. Chez Zenika, nos formations sont payantes et avoir une plateforme de ce genre permettrait de s’affranchir de l’installation de logiciels sur les PCs et de tout faire en ligne avec “juste” un navigateur. Nos solutions actuelles sont proches de Tech.io : nous utilisons déjà du Markdown pour décrire nos slides et nos codelabs, le code étant déjà présent sur [GitHub](http://github.com/Zenika). Devrons-nous recréer un équivalent à Tech.io (Docker, AngularJS, SocketIO, Ace Editor, MathJax) ?
*   ???? Serait-ce intéressant de publier gratuitement certaines formations Zenika “vieillissantes” sur la plateforme (comme [AngularJS](https://training.zenika.com/formations/angularjs) par exemple) ?

Ressources :

*   [Documentation officielle](https://tech.io/playgrounds/408/tech-io-documentation) (et “fun facts” c’est un playground !)
*   [Lien GitHub](https://github.com/jlandure/techio-carpaccio-programming) pour le code complet du playground “Carpaccio programming”
*   [Lien Tech.io](https://tech.io/playgrounds/990/carpaccio-programming-js/) pour jouer au playground “Carpaccio programming”