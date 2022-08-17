# [Restlet VS Jersey](https://bazinga-unit.blogspot.com/2011/03/restlet-vs-jersey.html)

Depuis longtemps, je pense que les architectures REST sont très intéressantes et je pense qu'elles ont de l'avenir.  
J'ai commencé très tôt avec un framework "made in france" : RESTLET (marchant notamment avec GAE). Dernièrement j'ai updaté mon projet dans la dernière version : la 2.0.5\.  

Et puis, j'ai eu un problème bizarre de thread sous tomcat. J'ai donc fait l'étude suivante pour identifier dans quelle couche était le pb : web / services / dao / oracle etc...  
J'ai commencé par le web et REST. Voilà comment nous l'utilisons : nous avons défini des resources avec JAXRS et nous utilisons massivement JAXB pour tout sérialiser en XML. Mais ce fonctionnement avec [RESTLET](http://www.restlet.org/) semble avoir des soucis : je me suis dit "autant tester avec autre une implémentation de la JSR-311" comme [JERSEY](http://jersey.java.net/).  
Pour info, JSR-311 c'est ["The JavaTM API for RESTful Web Services"](http://jcp.org/en/jsr/detail?id=311)  

**1\. Use case**  
Imaginons un service tout simple, dans mon cas un référentiel de données, avec une ressource de base : http://HOST/WAR/{repository}/{lang}  
L'idée est simple : je fais un service REST sans appel aux couches inférieures et je regarde comment cela se comporte pour mon problème de thread bloqués.  
Pour l'étude, j'utilise :  
- eclipse  
- maven  
- tomcat en tant que serveur de servlet  
- jmeter pour stresser mon application (50 threads qui font 100 appels soit 5000 appels en tout)  
- jprofiler pour faire le monitoring (a noter le démarrage particulier de tomcat)

<pre>apache-tomcat-5.5.17\bin>java -agentpath:C:\PROGRA~1\JPROFI~1\bin\windows\jprofilerti.dll=port=8849 -jar bootstrap.jar</pre>

Pour Restlet, j'utilise la version jee 2.0.5 et pour Jersey la version 1.5  

Voilà l'exemple de ressource utilisée :

<pre name="code" class="java">import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

@Path("{repository}/{lang}")
public class TestResource {

 @GET
 @Produces( { "application/xml", "text/xml", "application/json" })
 public RepositoryEntity getList() {
  RepositoryEntity repo = new RepositoryEntity();
  repo.setCode("reftest");
  repo.setDefaultLang("fr");
  repo.setDescription("repository");
  repo.addLang(1L, "FR", "french");
  repo.addLang(2L, "EN", "english");
  repo.addMeasures(3L, "sm", "measure");
  return repo;
 }
</pre>

Je m'attends donc à avoir un retour XML de ce type :  

<pre name="code" class="xml"><?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<repository defaultLang="fr" code="reftest" description="repository">
  <langs>
     <lang code="FR" description="french" id="1" />
     <lang code="EN" description="english" id="2" />
  </langs>
  <measures>
     <measure code="sm" description="measure" id="3" />
  </measures>
</repository>
</pre>

**2\. Restlet**  
[![](https://pbs.twimg.com/profile_images/831933450080940033/HiDlT1eY_400x400.jpg)](https://restlet.talend.com/)

Tout d'abord, voilà les dépendances utilisées :  

<pre name="code" class="xml"><dependency>
   <groupId>javax.servlet</groupId>
   <artifactId>servlet-api</artifactId>
   <version>2.4</version>
   <scope>provided</scope>
  </dependency>
  <dependency>
   <groupId>javax.ws.rs</groupId>
   <artifactId>jsr311-api</artifactId>
   <version>1.0</version>
  </dependency>
  <dependency>
   <groupId>org.restlet.jee</groupId>
   <artifactId>org.restlet</artifactId>
   <version>2.0.5</version>
  </dependency>
  <dependency>
   <groupId>org.restlet.jee</groupId>
   <artifactId>org.restlet.ext.fileupload</artifactId>
   <version>2.0.5</version>
  </dependency>
  <dependency>
   <groupId>org.restlet.jee</groupId>
   <artifactId>org.restlet.ext.spring</artifactId>
   <version>2.0.5</version>
  </dependency>
  <dependency>
   <groupId>org.restlet.jee</groupId>
   <artifactId>org.restlet.ext.jaxrs</artifactId>
   <version>2.0.5</version>
   <exclusions>
    <exclusion>
     <groupId>javax.xml.bind</groupId>
     <artifactId>jaxb-api</artifactId>
    </exclusion>
    <exclusion>
     <groupId>com.sun.xml.bind</groupId>
     <artifactId>jaxb-impl</artifactId>
    </exclusion>
   </exclusions>
  </dependency>
  <dependency>
   <groupId>com.sun.xml.bind</groupId>
   <artifactId>jaxb-impl</artifactId>
   <version>2.2.3</version>
  </dependency>
</pre>

A noter que j'ai fait exprès d'exclure jaxb de restlet pour être sûr d'avoir la dernière version disponible.  

Ensuite, côté RESTLET, j'ai configuré mon application comme cela :  
- Définition d'une application JAXRS  
- Définition d'une config spring encapsulant l'application et permettant d'inclure les ressources  
- Définition d'une application RESTLET reprenant et attachant l'application JAXRS récupéré avec spring au contexte  
- Définition d'un web.xml permettant d'indiquer à tomcat qu'il faut utiliser RESTLET  

RestApplication.java : l'application JAXRS  

<pre name="code" class="java">public class RestApplication extends Application {

 Set<Class<?>> classes;

 @Override
 public Set<Class<?>> getClasses() {
  return this.classes;
 }

 public void setClasses(Set<Class<?>> classes) {
  this.classes = classes;
 }
</pre>

applicationContext-REST.xml : spring  

<pre name="code" class="xml"><?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xmlns:util="http://www.springframework.org/schema/util"
 xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-2.0.xsd
            http://www.springframework.org/schema/jee http://www.springframework.org/schema/jee/spring-jee-2.0.xsd
            http://www.springframework.org/schema/util http://www.springframework.org/schema/util/spring-util.xsd">

 <!-- Import of Application Context with import of all properties -->

 <util:set id="resourceClassnames">
  <value>org.server.resource.TestResource</value>
 </util:set>

 <bean id="application" class="org.server.RestApplication">
  <property name="classes" ref="resourceClassnames" />
 </bean>

</beans>

</pre>

RestServer.java : l'application RESTLET  

<pre name="code" class="java">import javax.ws.rs.core.Application;

import org.restlet.ext.jaxrs.JaxRsApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class RestServer extends JaxRsApplication {

 final ApplicationContext springContext;

 public RestServer() {
  super();
  springContext = new ClassPathXmlApplicationContext(new String[] { "applicationContext-REST.xml" });
  this.add((Application) springContext.getBean("application"));
 }
}

</pre>

web.xml  

<pre name="code" class="xml"><?xml version="1.0" encoding="UTF-8"?>
<web-app id="WebApp_ID" version="2.4"
 xmlns="http://java.sun.com/xml/ns/j2ee" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

 <display-name>REST server</display-name>

 <!-- Restlet adapter -->
 <servlet>
  <servlet-name>RestletServlet</servlet-name>
  <servlet-class>
   org.restlet.ext.servlet.ServerServlet
      </servlet-class>
  <init-param>
   <param-name>org.restlet.application
   </param-name>
   <param-value>org.server.RestServer
         </param-value>
  </init-param>
 </servlet>

 <!-- Catch all requests -->
 <servlet-mapping>
  <servlet-name>RestletServlet</servlet-name>
  <url-pattern>/*</url-pattern>
 </servlet-mapping>

</web-app>

</pre>

Voilà, on fait un petit "mvn package" et je déplois ça dans TOMCAT. Après, il me reste plus qu'à appeler n fois l'url : http://localhost:8080/rest/repository/fr  

Je fais le test avec jmeter et voilà ce que cela me donne :  

[![](https://lh3.googleusercontent.com/_IEgVgEhzZc0/TXPhe6iYS6I/AAAAAAAACPY/6ExcnG5uv20/s640/jaxb_restlet_tomcat.png)](https://lh3.googleusercontent.com/_IEgVgEhzZc0/TXPhe6iYS6I/AAAAAAAACPY/6ExcnG5uv20/s640/jaxb_restlet_tomcat.png)  
**Conclusion : on voit beaucoup de rouge et un temps très nul (383ms en moy), c'est mauvais signe car les threads sont en perpétuellement en attente (comprendre bloqués car en concurrence d'accès)... L'autre onglet de jprofiler montre même qu'ils se bloquent sur une ressource JAXBContext... affaire à suivre.**  

**3\. Jersey**  
[![](http://jersey.java.net/images/Jersey_yellow.png)](http://jersey.java.net/images/Jersey_yellow.png)On commence par les dépendances :

<pre name="code" class="xml"><dependency>
   <groupId>javax.servlet</groupId>
   <artifactId>servlet-api</artifactId>
   <version>2.4</version>
   <scope>provided</scope>
  </dependency>
  <dependency>
   <groupId>javax.ws.rs</groupId>
   <artifactId>jsr311-api</artifactId>
   <version>1.1</version>
  </dependency>
  <dependency>
   <groupId>com.sun.jersey</groupId>
   <artifactId>jersey-server</artifactId>
   <version>1.5</version>
  </dependency>
  <dependency>
   <groupId>com.sun.grizzly</groupId>
   <artifactId>grizzly-servlet-webserver</artifactId>
   <version>1.9.18-i</version>
  </dependency>
</pre>

Après, Jersey est même moins intrusif que Restlet car il suffit juste d'ajouter la configuration suivante : web.xml

<pre name="code" class="java">
 <web-app version="2.4" xmlns="http://java.sun.com/xml/ns/j2ee" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemalocation="http://java.sun.com/xml/ns/j2ee http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd"><servlet><servlet-name>Jersey Web Application</servlet-name>
        <servlet-class>com.sun.jersey.spi.container.servlet.ServletContainer</servlet-class>
        <init-param>
            <param-name>com.sun.jersey.config.property.packages</param-name><param-value>org.server.resource</param-value></init-param>
        <load-on-startup>1</load-on-startup></servlet> 
    <servlet-mapping><servlet-name>Jersey Web Application</servlet-name>
        <url-pattern>/*</url-pattern></servlet-mapping></web-app> 

</pre>

Je fais le même test avec jmeter et voilà ce que cela me donne :  

[![](https://lh5.googleusercontent.com/-ENC-yy8BwTw/TXPhe5byGvI/AAAAAAAACT4/o1u7N8C3C5Y/s640/jaxb_jersey_tomcat.png)](https://lh5.googleusercontent.com/-ENC-yy8BwTw/TXPhe5byGvI/AAAAAAAACT4/o1u7N8C3C5Y/s640/jaxb_jersey_tomcat.png)  

**Conclusion : Le test passe ultra rapidement et on voit que les threads passent leur temps à s'occuper utilement (bleu = I/O).  
Le temps est considérablement meilleur (7ms en moy). En plus, la configuration semble plus facile...**  

**4\. Conclusion**  
Jersey semble ne pas avoir le même pb de thread que l'on a avec Restlet. Pourtant on est dans des situations identiques : même config tomcat / même jmeter / même classe JAXRS / même classe JAXB.  
Pourtant la différence est flagrante alors que les 2 war sont gérés de la même façon :  
- http://localhost:8080/rest_restlet/reftest/fr  
- http://localhost:8080/rest_jersey/reftest/fr  

Du coup, je pense contacter Jerôme Louvel (le créateur de Restlet) car je trouve ça vraiment très gros. Reste à voir si ma config avec Restlet est mauvaise.  

En tout cas, je passe mon projet sous JERSEY dès la semaine prochaine !  

A noter que j'ai fait aussi un test simple avec une JSP et j'ai observé le même problème de thread : Restlet semble donc mal gérer l'instanciation JAXB d'où des problèmes de concurrence pour les threads.

<pre name="code" class="java">final javax.xml.bind.JAXBContext context = javax.xml.bind.JAXBContext.newInstance(org.server.dto.repository.RepositoryEntity.class);
final javax.xml.bind.Marshaller  result = context.createMarshaller();
result.marshal(repo, response.getOutputStream());
</pre>

A noter un paramétrage possible que je n'ai pas utilisé : ajouter des paramètres au "start" de l'application RESTLET "RestServer.java"

<pre name="code" class="java">@Override
 public synchronized void start() throws Exception {
  this.getContext().getParameters().add("maxTotalConnections", "512");
  this.getContext().getParameters().add("maxThreads", "50");
  this.getContext().getParameters().add("persistingConnections", "true");
  super.start();
 }
</pre>
