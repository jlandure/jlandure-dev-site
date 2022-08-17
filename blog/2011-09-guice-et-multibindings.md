# [Guice et multibindings](https://bazinga-unit.blogspot.com/2011/09/guice-et-multibindings.html)

Guice a le vent en poupe et j'ai voulu utiliser une fonctionnalité que je trouve très intéressante : le multibindings pour l'injection de dépendances. En gros, le besoin peut être le suivant : comment injecter plusieurs objets répondant à la même interface pour un mécanisme de plugins ?  

La réponse se trouve très facilement avec Guice. J'ai utilisé la version 3.0  

**1\. Définition de l'interface**  

Voilà le bout de code que j'utilise pour mon test :  

org.test.UriSummarizer  

<pre name="code" class="java">import java.net.URI;
public interface UriSummarizer {
	/**
	 * Returns a short summary of the URI, or null if this summarizer doesn't know how to summarize the URI.
	 */
	String summarize(URI uri);
}
</pre>

Voilà deux implémentations ma fois fortes inutiles !  

org.test.FlickrPhotoSummarizer  

<pre name="code" class="java">public class FlickrPhotoSummarizer implements UriSummarizer {

	public String summarize(URI uri) {
		return "summarizing for flickr";
	}
}
</pre>

org.test.GooglePlusPhotoSummarizer  

<pre name="code" class="java">public class GooglePlusPhotoSummarizer implements UriSummarizer {

	public String summarize(URI uri) {
		return "summarizing for googleplus";
	}
}
</pre>

Je créé aussi mon code "client" de mon système de "summarizer" :  

<pre name="code" class="java">public class ClientOfSummarizer {

	private final UriSummarizer summarizer;

	@Inject
	ClientOfSummarizer(UriSummarizer summarizer) {
		this.summarizer = summarizer;
	}

	public void getSummarize() {
		System.out.println(summarizer.summarize(null));
	}
}
</pre>

**2\. Injection de dépendances**  

J'ajoute Guice en dépendance :  

pom.xml  

<pre name="code" class="xml">...
		 <dependency><groupid>com.google.inject</groupid>
			<artifactid>guice</artifactid>
			<version>3.0</version></dependency> 
</pre>

Et je me créé un module "simple" Guice :  

<pre name="code" class="java">public class TestPluginModule extends AbstractModule {
	public void configure() {
		bind(UriSummarizer.class).to(FlickrPhotoSummarizer.class);

		// bind plugin dependencies, such as our Flickr API key
	}
}
</pre>

Le petit lancement qui va bien :  

<pre name="code" class="java">public static void main(String[] args) {
		Injector injector = Guice.createInjector(new TestPluginModule());

		injector.getInstance(ClientOfSummarizer.class).getSummarize();
	}
</pre>

Je lance et comme prévu, voilà la sortie :  

<pre>summarizing for flickr
</pre>

**3\. Passage en multibindings**  

Voilà en gros ce que je veux dans mon client pour mon mécanisme de plugin : à partir d'une liste de d'élements répondant à la même interface, je veux pouvoir effectuer/déléguer différents traitements. Cela me permettrait par exemple de découper fonctionnellement une application existante (module auth, module de chargement des données, module de recherche, module pour gérer un cycle de vie, module pour gérer de l'historique...)  

<pre name="code" class="java">	
	private final Set <urisummarizer>summarizers;

	@Inject
	ClientOfSummarizer(Set <urisummarizer>summarizers) {
		this.summarizers = summarizers;
	}

	public void getSummarize() {
		for (UriSummarizer uris : summarizers) {
			System.out.println(uris.summarize(null));
		}
	}</urisummarizer></urisummarizer></pre>

Sur le site de Guice, il y a dans les extensions un module "[Multibindings](http://code.google.com/p/google-guice/wiki/Multibindings)".  
On ajoute dans le pom.xml ce qu'il faut :  

<pre name="code" class="xml">		
		 <dependency><groupid>com.google.inject.extensions</groupid>
			<artifactid>guice-multibindings</artifactid>
			<version>3.0</version></dependency> 
</pre>

Je créé les modules Guice :  

<pre name="code" class="java">public class GooglePlusPluginModule extends AbstractModule {
	public void configure() {
		Multibinder <urisummarizer>uriBinder = Multibinder.newSetBinder(binder(), UriSummarizer.class);
		uriBinder.addBinding().to(GooglePlusPhotoSummarizer.class);

		// bind plugin dependencies, such as our Flickr API key
	}
}</urisummarizer> </pre>

<pre name="code" class="java">public class FlickrPluginModule extends AbstractModule {
	public void configure() {
		Multibinder <urisummarizer>uriBinder = Multibinder.newSetBinder(binder(), UriSummarizer.class);
		uriBinder.addBinding().to(FlickrPhotoSummarizer.class);

		// bind plugin dependencies, such as our Flickr API key
	}
}</urisummarizer> </pre>

Voilà ma classe de lancement :  

<pre name="code" class="java">public class Test {
	public static void main(String[] args) {
		Injector injector = Guice.createInjector(new GooglePlusPluginModule(), new FlickrPluginModule());

		injector.getInstance(ClientOfSummarizer.class).getSummarize();
	}
}
</pre>

et voilà le résultat :  

<pre>summarizing for googleplus
summarizing for flickr
</pre>

C'est assez simple à utiliser et cela permet de gérer un mécanisme de petit plugins. Cela ne gère pas l'aspect hot-deploy que permet OSGi mais cela apporte déjà un premier niveau de flexibilité sans forcément trop s'embéter.  
A noter que l'ordre d'affichage semble conserver l'ordre de déclaration des modules Guice !