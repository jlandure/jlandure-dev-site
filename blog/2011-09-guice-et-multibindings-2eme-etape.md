# [Guice et multibindings - 2ème étape](https://bazinga-unit.blogspot.com/2011/09/guice-et-multibindings-2eme-etape.html)

Dans un post précédent, j'ai montré comment guice pouvait gérer du multibindings. Mais mon besoin va un peu plus loin : j'aimerais vraiment avoir un mécanisme de plugins où on ne connait pas à l'avance les implémentations. Or dans mon premier test, il fallait que je connaisse tous les modules pour les charger. J'ai donc chercher sur internet et j'ai trouvé un framework fait par Daniel Manzke : son projet "guice-automatic-injection" est stocké sur github [ici](https://github.com/manzke/guice-automatic-injection).  

Le but de son projet, bien expliqué sur son [blog](https://devsurf.wordpress.com/), est de pouvoir utiliser un mécanisme comme le fait Spring le classpath-scanning pour faire l'injection de dépendances. Cela peut être très intéressant pour mes besoins. Imaginons un projet A et un projet B voulant faire des modifications sur le comportement du projet A.  
Il suffit que je définisse des points d'extensions dans mon projet A et que j'en implémente dans mon projet B.  
Côté déploiement, si j'ajoute le JAR du projet B au jar du projet A, alors les points d'extensions implémentés seront exécutés.  

**1\. Mise en place du projet "guice-automatic-injection"**  

J'ajoute les dépendances maven comme il faut :  

<pre name="code" class="xml">		 <dependency><groupid>de.devsurf.injection.guice</groupid>
			<artifactid>de.devsurf.injection.guice.core</artifactid>
			<version>0.8.7</version></dependency> 
		 <dependency><groupid>de.devsurf.injection.guice.scanner</groupid>
			<artifactid>de.devsurf.injection.guice.scanner.asm</artifactid>
			<version>0.8.7</version></dependency> 
		 <dependency><groupid>de.devsurf.injection.guice.scanner</groupid>
			<artifactid>de.devsurf.injection.guice.scanner.sonatype</artifactid>
			<version>0.8.7</version></dependency> 
		 <dependency><groupid>de.devsurf.injection.guice.scanner</groupid>
			<artifactid>de.devsurf.injection.guice.scanner.reflections</artifactid>
			<version>0.8.7</version></dependency> 
</pre>

Pour info, j'ai ajouté les 3 possibilités de classpath-scanning implémentés dans ce projet :  
* ASM  
* Reflections  
* Sonatype  

Le but est de pouvoir étudier leurs performances.  

J'ai ajouté les annotations suivantes :  

<pre name="code" class="java">@Bind
public class FlickrPhotoSummarizer implements UriSummarizer
...
@Bind
public class GooglePlusPhotoSummarizer implements UriSummarizer
...
@GuiceModule
public class FlickrPluginModule extends AbstractModule
...
@GuiceModule
public class GooglePlusPluginModule extends AbstractModule
...
</pre>

J'ai ensuite créé la classe main qu'il faut pour fonctionner "de base" avec ASM : je configure uniquement pour scanner le package adéquat.  

<pre name="code" class="java">public class TestASM {
	public static void main(String[] args) {
		long time = System.nanoTime();
		System.out.println(time);
		Injector injector = Guice.createInjector(StartupModule.create(ASMClasspathScanner.class, PackageFilter.create("org.test.autoscan")));
		System.out.println("time1>" + ((System.nanoTime() - time) / 1000000));
		injector.getInstance(ClientOfSummarizer.class).getSummarize();
		System.out.println("time2>" + ((System.nanoTime() - time) / 1000000));
	}
}
</pre>

Voilà un premier résultat probant :  

<pre>time1>576
summarizing for flickr
summarizing for googleplus
time2>577
</pre>

Grâce à ce framework, je ne suis pas obligé de connaitre tous les "modules" Guice : il suffit qu'il soit présent dans le classpath pour que guice injecte correctement les "beans". Très pratique car je peux créer mon mécanisme de plugins.  

**2\. Tests des différentes solutions de "classpath-scanning"**  

Sur le [wiki github](https://github.com/manzke/guice-automatic-injection/wiki/Scanner-Implementations), Daniel Manzke explique la différence d'implémentations. A noter que seul l'implémentation "Reflections" est la seule implémentation multi-thread mais apparemment peut avoir des problèmes à trouver des implémentations...  

Je vais m'intéresser maintenant aux performances.  
Pour comparer les temps de scan et de chargement, j'ai créé une classe starter pour chaque type d'implémentation :  
* ASM : ASMClasspathScanner.class  
* Reflections : ReflectionsScanner.class  
*Sonatype : SonatypeScanner.class  

Ensuite, j'ai fait le tests sur 2 cas : 40 lib et 134 lib en dépendances maven.  

Voici les résultats :  

<table border="1">

<tbody>

<tr>

<td>Temps en ms / nb de JAR</td>

<td>ASM</td>

<td>Reflections</td>

<td>Sonatype</td>

</tr>

<tr>

<td>40</td>

<td>418</td>

<td>542</td>

<td>1146</td>

</tr>

<tr>

<td>134</td>

<td>573</td>

<td>701</td>

<td>3905</td>

</tr>

</tbody>

</table>

Au final, il est donc préférable d'utiliser la librairie ASM pour scanner les modules guice à charger.