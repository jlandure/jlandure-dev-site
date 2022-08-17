# [Domptez vos versions](https://bazinga-unit.blogspot.com/2011/01/domptez-vos-versions.html)

J'ai repris le titre du blog depuis lequel j'ai récupéré ces infos très intéressantes : [http://blog.aheritier.net/domptez-vos-versions/#more-1053](http://blog.aheritier.net/domptez-vos-versions/#more-1053)  

**1\. Mettre à jour toutes les versions**  
Dans notre projet multi-module, il est intéressant de pouvoir changer tous les numéros de versions suite à un changement de roadmap. Pour cela, 2 commandes intéressantes :  

<pre>mvn versions:set -DnewVersion=1.2.3-SNAPSHOT
</pre>

Cette commande permet de mettre à jour le pom parent et normalement tous les pom. Mais si un des fils est en erreur, il existe cette deuxième commande :  

<pre>mvn versions:update-child-modules
</pre>

Cette deuxième commande permet de mettre à jour tous les pom fils à partir du pom parent. Voilà un exemple de log si il n'y a aucun changement :  

<pre>[INFO] ------------------------------------------------------------------------
[INFO] Building Projet - ROOT 1.2.3-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO]
[INFO] --- versions-maven-plugin:1.2:update-child-modules (default-cli) @ XXXXXX
Socle ---
[INFO] All child modules are up to date.
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 0.797s
[INFO] Finished at: Tue Jan 11 14:29:30 CET 2011
[INFO] Final Memory: 7M/495M
[INFO] ------------------------------------------------------------------------
</pre>

**2\. Vérifier ses dépendances**  
Voilà une commande presque magique : elle va voir sur notre proxy si des dépendances sont plus à jour que celle indiquées dans le pom.xml. Très intéressant pour savoir si on est à jour (notamment si on a des projets avec des projets utilitaires).  

<pre>versions:display-dependency-updates
</pre>

Voilà un exemple de log :  

<pre>[INFO] --- versions-maven-plugin:1.2:display-dependency-updates (default-cli) @
XXXXXX ---
[INFO] artifact fr.projet:reUtilContener: checking for updates from nexus
[INFO] No dependencies in Dependencies are using the newest version.
[INFO]
[INFO] The following dependencies in Dependencies have newer versions:
[INFO]   commons-cli:commons-cli ................................... 1.1 -> 1.2
[INFO]   fr.projet:reCommons .............................. 1.0.20 -> 2.2.0.1
[INFO]   fr.projet:reContXml ................................ 1.0.20 -> 2.2.0
[INFO]   fr.projet:reLogging ................................ 1.0.20 -> 2.2.0
[INFO]   fr.projet:reUtilContener ........................... 1.0.20 -> 2.0.0
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 2.719s
[INFO] Finished at: Tue Jan 11 14:23:49 CET 2011
[INFO] Final Memory: 7M/495M
[INFO] ------------------------------------------------------------------------
</pre>
