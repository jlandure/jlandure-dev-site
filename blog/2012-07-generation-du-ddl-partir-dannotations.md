# [Génération du DDL à partir d'annotations Hibernate](https://bazinga-unit.blogspot.com/2012/07/generation-du-ddl-partir-dannotations.html)

Hibernate, ce fameux framework, souvent utilisé est quelque fois déroutant car on ne sait ce que l'on veut modéliser. Je l'utilise presque tout le temps dans une démarche top-down partant du modèle Java objet (que je connais bien) pour générer le schéma de base (SQL que je n'apprécie que très moyennement !).  
Pour info, DDL signifie "Data Definition Language".  

Pour cela, la première méthode correspond à la méthode crade : on lance directement en create sur sa base locale et on regarde avec un sqldeveloper ce que cela donne !  

L'autre méthode, plus élégante, consiste à générer un fichier DDL répresentant le futur schéma de la base et regarder que cela correspond à ce que l'on souhaite. Cela peut aussi être utile quand l'on veut faire un diff entre 2 packs de livraison... pour voir si le modèle (donc le schéma de base) n'a pas été modifié par quelqu'un de malintentionné.  

J'utilise majoritairement maven sur mes projets donc il suffit d'ajouter cela :  

https://gist.github.com/jlandure/3170852

De base, on utilise un seul PersistenceUnit (JPA) donc pas de souci : le plugin le retrouve dans "META-INF/persistence.xml".  

Si on en a plusieurs, on peut préciser le bon PU à utiliser avec l'option :  

https://gist.github.com/jlandure/3170865

Mais comment faire dans un projet sans PU mais qui utilise les annotations (sans hbm.xml) ? J'ai eu beau regarder sur le site du plugin, sur stackoverflow etc... impossible de trouver une configuration. Puis finalement c'est assez simple ! J'ajoute un petit persistence.xml tout simple dans "src/test/resources/META-INF" (pour ne pas polluer mon JAR final) :  

https://gist.github.com/jlandure/3170883

Il suffit de lancer un petit `mvn clean:clean process-test-resources hibernate3:hbm2ddl` et le tour est joué. Le fichier "target/sql/db-scheme.sql" est prêt !