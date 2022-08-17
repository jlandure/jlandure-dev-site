# [Options utiles sur les projets maven multimodule](https://bazinga-unit.blogspot.com/2012/07/options-utiles-sur-les-projets-maven.html)

J'ai remarqué deux options sympatiques pour la gestion de projet multimodule :  

`mvn -N deploy`  

doc maven : `-N,–non-recursive - Do not recurse into sub-projects`  

Cela permet de déployer uniquement le pom parent. Très pratique quand vous ajoutez des propriétés sur le pom parent comme la version de spring utilisé (Tous les projets fils le prennent en compte ensuite avec un `${spring.version}`).  

L'autre option, toujours depuis le projet parent, permet de faire l'inverse : exécuter un deploy sur un module fils particulier "submodule" :  

`mvn deploy -pl submodule`  

D'après la doc maven : 
```
-pl,--projects
<arg>  
Comma-delimited list of specified  
reactor projects to build instead  
of all projects. A project can be  
specified by [groupId]:artifactId  
or by its relative path.  
</arg>
```