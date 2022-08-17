# [Map, cache : implémentations et performances](https://bazinga-unit.blogspot.com/2012/07/map-cache-implementations-et.html)[](https://www.blogger.com/post-edit.g?blogID=8561766736069959572&postID=2617251381828688796&from=pencil "Edit")

Régulièrement, dans le monde Java, nous avons besoin de manipuler des données et évidemment de les retrouver facilement. Classiquement on instancie des HashMap pour stocker temporairement des éléments et les récupérer directement avec leurs clés.  

Utilisateur d'AppEngine, j'ai utilisé JCache et je me suis posé la question : Puis-je utiliser facilement un mécanisme de cache dans mes projets Java ? Quelles sont les performances face à l'utilisation d'une simple HashMap ?  

Pour prendre les temps, j'ai utilisé un petite librarie utilitaire sympa : perf4j. Très simple, elle permet de collecter des temps au lieu d'écrire des "System.currentTimeMillis()"  

https://gist.github.com/jlandure/3136189

Les tests effectués ici sont très simples : on injecte 1_000_000 d'éléments et faisant d'abord un get (qui ne trouve rien), un put (pour mettre la donnée) et un get (qui renvoie la valeur).  

**1\. Utilisation de HashMap**  

Voici l'implémentation que cela donne avec une HashMap :  

https://gist.github.com/jlandure/3136269

Le test est très simple.  

**2\. Utilisation de GuavaCache**  

Voici la dépendance ajoutée pour que cela fonctionne :  

https://gist.github.com/jlandure/3136276

Voici le code produit :  

https://gist.github.com/jlandure/3136278

Là où c'est intéressant, c'est qu'il y a des méthodes utilitaires très pratiques avec Guava :  

*   getIfPresent
*   asMap
*   cleanUp
*   invalidate

L'éviction dans le cache se fait par rapport à un temps donné (en accès ou en écriture) ou par rapport à une taille. D'ailleurs, guava implémente un "maximumSize" mais aussi un "maximumWeight" (dans le cas d'objet de taille hétérogène). A noter qu'il y a aussi des méthodes pour récupérer des stats sur son cache. Plus d'information [ici](http://code.google.com/p/guava-libraries/wiki/CachesExplained).  

**3\. Utilisation de JCache**  

JCache est le nom de la JSR107 qui devait être incluse directement Java7 mais malheureusement, ce n'est pas le cas. J'ai utilisé l'implémentation de référence, Ehcache-jcache :  

https://gist.github.com/jlandure/3136281

Voilà un exemple de code pour faire notre test :  

https://gist.github.com/jlandure/3136285

Côté Jcache-ehcache, il y a aussi des méthodes utilitaires très pratiques :  

*   getAndPut
*   putIfAbsent
*   getAndRemove
*   getAndReplace
*   replace(K key, V oldValue, V newValue)

A noter qu'il y aussi un mécanisme de stats sur le cache. Plus d'informations [ici](https://github.com/jsr107/jsr107spec#readme).  

**4\. Conclusion**  

Pour nos tests, voilà les résultats que j'obtiens :  

<table border="1">

<tbody>

<tr>

<td>Implémentations</td>

<td>10_000 (mem en Mo)</td>

<td>10_000 (temps en ms)</td>

<td>1_000_000 (mem en Mo)</td>

<td>1_000_000 (temps en ms)</td>

</tr>

<tr>

<td>HashMap</td>

<td>19</td>

<td>6914</td>

<td>224</td>

<td>70602</td>

</tr>

<tr>

<td>GuavaCache</td>

<td>20</td>

<td>6994</td>

<td>233</td>

<td>68809</td>

</tr>

<tr>

<td>Jcache</td>

<td>17</td>

<td>7202</td>

<td>not done</td>

<td>not done</td>

</tr>

</tbody>

</table>

J'ai remarqué donc un problème avec Jcache : il ne stocke que 10_000 éléments. Après ça, il évicte tout seul de son cache les premiers éléments. Je n'ai pas trouvé la configuration pour pouvoir stocker facilement autant d'élément que je souhaite...  

L'utilisation de Guava semble donc être très intéressante car la librairie ne met pas plus de temps qu'une HashMap standard et ajoute des fonctionnalités très intéressantes (expiration automatique du cache).  

En plus, dans beaucoup de cas, l'utilisation de Guava ou JCache est thread-safe dans le sens où une modification dans le cache est atomique.  

Au final, si je dois faire un traitement régulier et où je peux mettre en cache des éléments, j'essaierai peut-être de mettre en place GuavaCache...