# [Passage à Nexus et à Maven 3](https://bazinga-unit.blogspot.com/2011/01/passage-nexus-et-maven-3.html)

Sur le projet, nous utilisons massivement maven. Du coup, il y a 2 ans, on avait installé un serveur proxy maven "Archiva" (en version 1.0.1 à l'époque), fait par Apache.  
L'installation était très facile et j'ai pu connecté archiva au net en utilisant le proxy de l'entreprise.  

Il tournait plutôt bien même si on avait souvent des erreurs de checksum au downlaod ou à l'upload. Mais dernièrement, l'upload d'artifact maven plantait ou était très longue : on avait même des "timeout"...  
Du coup, quand c'était une release lancée depuis hudson, c'est gênant que ça plante à ce niveau-là. (surtout que le maven release avait déjà commité les pom.xml).  

Par conséquent, je connaissais Nexus, fait par Sonatype, depuis longtemps et j'ai regardé sur le net les dernières versions. site web : [http://nexus.sonatype.org/](http://nexus.sonatype.org/)  
J'avais remarqué aussi que le plugin eclipse "m2eclipse", développé aussi par Sonatype, peut télécharger l'index nexus pour être plus performant. site web : [http://m2eclipse.sonatype.org/](http://m2eclipse.sonatype.org/)  
Voici un bon blog expliquant la diff : [http://blog.aheritier.net/dapache-archiva-a-sonatype-nexus-le-bilan/](http://blog.aheritier.net/dapache-archiva-a-sonatype-nexus-le-bilan/)  

**1\. Passage d'Archiva à Nexus**  
Pour cela, il faut télécharger sur le site de Sonatype le "nexus-webapp-x.x.x.x.war". site web : http://nexus.sonatype.org/download-nexus.html  
La version que j'ai installé est la version "1.8.0.1"  
Sur mon serveur, j'avais déjà un tomcat donc il a suffit de mettre le war et hop j'accède à Nexus. J'ai renommé le war en "nexus.war" pour ne pas avoir une url simple pour y accéder.  

[![](http://lh3.ggpht.com/_IEgVgEhzZc0/TSw5NacZsII/AAAAAAAACNY/FtQywGGZ67w/s640/nexus.PNG)](http://lh3.ggpht.com/_IEgVgEhzZc0/TSw5NacZsII/AAAAAAAACNY/FtQywGGZ67w/s640/nexus.PNG)Par contre, aucune idée de l'endroit où sont placés les artefacts maven. Je regarde sur le serveur et je trouve un répertoire dans "/root/sonatype-work/nexus".  
NB : je sais "je suis en root" mais ce n'est pas ça l'important ;)  
L'emplacement ne me plaisant pas, j'ai fait une redirection unix : nexus -> /home/projet/nexus J'ai trouvé une bonne image qui explique les repository de base sur Nexus et la différence avec Archiva :[![](http://lh4.ggpht.com/_IEgVgEhzZc0/TSw5wShWQmI/AAAAAAAACNc/JmJlH3rie7c/s640/ArchivaNexusWhileMigrating.png)](http://lh4.ggpht.com/_IEgVgEhzZc0/TSw5wShWQmI/AAAAAAAACNc/JmJlH3rie7c/s640/ArchivaNexusWhileMigrating.png)  

L'interface est super sympa et réactive (ext-js).  

A noter que je n'ai migré aucun JAR de mon ancien repository : trop vieux ou trop vieille release (trop vieille = il existe une release plus récente en version de production chez le client). Pour les versions actuelles, je me suis dit que je ferais un checkout de mon tag SVN et je relancerai un "deploy" sous maven3.  

Attention, il ne faut pas oublier de connecter Nexus à notre proxy http d'entreprise et d'opérer les manips suivantes de post-install : [http://www.sonatype.com/books/nexus-book/reference/install-sect-repoman-post-install.html](http://www.sonatype.com/books/nexus-book/reference/install-sect-repoman-post-install.html)  

J'en ai profité aussi pour ajouter tomcat au service "init.d" de ma VM ubuntu. J'ai constitué le fichier suivant :

<pre>#!/bin/sh -e

JAVA_HOME=/usr/lib/jvm/jdk1.6.0_16/
export JAVA_HOME

CATALINA_OPTS="-Dfile.encoding=UTF-8 -Dderby.stream.error.file=/home/projet/logiciels/apache-tomcat-5.5.26/temp"
export CATALINA_OPTS

LANG="fr_FR.UTF-8"
export CATALINA_OPTS

JAVA_OPTS="-Xms256m -Xmx512m"
export JAVA_OPTS

NEXUS_HOME="/home/projet/nexus"
export NEXUS_HOME

ENV="env -i LANG=C PATH=/usr/local/bin:/usr/bin:/bin"

set -e
case $1 in
 start)
  echo  "Starting Tomcat server"  
  /home/projet/logiciels/apache-tomcat-5.5.26/bin/startup.sh

 ;;
 stop)
  /home/projet/logiciels/apache-tomcat-5.5.26/bin/shutdown.sh
         echo 'Terminating Tomcat server'

 ;;
 restart)
  /home/projet/logiciels/apache-tomcat-5.5.26/bin/shutdown.sh
  echo 'Terminating Tomcat server'

  echo  "Starting Tomcat server"  
  /home/projet/logiciels/apache-tomcat-5.5.26/bin/startup.sh

 ;;
 *)
 echo "Usage: /etc/init.d/tomcat {start|stop|restart}"
 exit 1

esac

exit 0

</pre>

A noter que le login par défaut sur Nexus est "admin/admin123". N'oubliez pas aussi de configurer un compte d'upload d'artefact sur Nexus : username=deploy, password=deploynexus  

**2\. Mise en place de Maven 3**  
Première chose à faire : récupérer le "apache-maven-3.0.1-bin.zip" et le mettre sur son PC. Ensuite, il suffit de modifier le settings.xml pour pointer sur Nexus :

<pre name="code" class="xml">...
    <server>
      <id>nexus.deploy</id>
      <username>deploy</username>
      <password>deploynexus</password>
    </server>
...
    <mirror>
      <!--This sends everything else to /public -->
      <id>nexus</id>
      <mirrorOf>*</mirrorOf>
      <url>http://repository.projet:8084/nexus/content/groups/public</url>
    </mirror>
...
    <profile>
      <id>nexus</id>
      <!--Enable snapshots for the built in central repo to direct -->
      <!--all requests to nexus via the mirror -->
      <repositories>
        <repository>
          <id>central</id>
          <url>http://central</url>
          <releases><enabled>true</enabled></releases>
          <snapshots><enabled>true</enabled></snapshots>
        </repository>
      </repositories>
     <pluginRepositories>
        <pluginRepository>
          <id>central</id>
          <url>http://central</url>
          <releases><enabled>true</enabled></releases>
          <snapshots><enabled>true</enabled></snapshots>
        </pluginRepository>
      </pluginRepositories>
    </profile>
...
  <activeProfiles>
    <!--make the profile active all the time -->
    <activeProfile>nexus</activeProfile>
  </activeProfiles>
</pre>

Une fois la configuration posée, il suffit de tenter un "mvn clean deploy" pour vérifier que maven3 est bien installé et qu'on upload bien sur Nexus. Attention, sur mon projet, j'ai du aussi modifier mon "pom.xml" du projet parent :

<pre name="code" class="xml"> <distributionManagement>
  <snapshotRepository>
   <id>nexus.deploy</id>
   <name>Proxy</name>
   <url>http://repository.projet:8084/nexus/content/repositories/snapshots
   </url>
  </snapshotRepository>
  <repository>
   <id>nexus.deploy</id>
   <name>Proxy</name>
   <url>http://repository.projet:8084/nexus/content/repositories/releases
   </url>
  </repository>
 </distributionManagement>
</pre>

Voilà il suffit maintenant de filer un zip avec maven3 et le bon settings.xml aux développeurs et tout le reste aura été transparent. Je trouve le gain de perf assez énorme entre Archiva et Nexus surtout pour tout ce qui est download et upload.