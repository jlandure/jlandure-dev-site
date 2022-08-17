# [Mise en place de JMX](https://bazinga-unit.blogspot.com/2011/01/mise-en-place-de-jmx.html)

Depuis longtemps, j'entends parler de la norme JMX sans jamais vraiment l'utiliser. Bon, comme tout le monde j'ai déjà ouvert un jvisualvm connecté à mon tomcat local et j'ai vu qu'on a plein d'informations mais je ne savais pas vraiment comment l'implémenter.  

Dans le cadre d'un projet, j'ai eu besoin de suivre à la trace un jeu de données. Problème : les seuls traces valables sont des écritures dans des logs sur le serveur et chaque programme écrit dans un log à lui. Du coup, pour savoir si ma chaîne (une interface entre deux applis avec des transfos) fonctionne, il fallait éplucher chacun des logs un à un.  

Je me suis dit : Et si je pouvais suivre mes données (OK/KO voir qualitativement / quantitativement) avec JMX ?  
Hop, on se connecte à la doc de Spring (en 3.0.5) et je regarde comment faire.  

**1\. Déclaration de mon bean**  

A noter que j'en ai profité pour utiliser Spring en annotation au lieu de tout déclarer dans un XML : src/main/java/fr/test/bean/SimpleBean.java  

<pre name="code" class="java">  

package fr.test.bean;

import javax.management.Notification;

import org.springframework.context.annotation.Scope;
import org.springframework.jmx.export.annotation.ManagedAttribute;
import org.springframework.jmx.export.annotation.ManagedResource;
import org.springframework.jmx.export.notification.NotificationPublisher;
import org.springframework.jmx.export.notification.NotificationPublisherAware;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

@Component("simplebean")
@Scope("singleton")
@ManagedResource(objectName = "myproject:name=simplebean", description = "A sample JMX-managed bean with notifications")
public class SimpleBean implements NotificationPublisherAware, ISimpleBean {

            @ManagedAttribute
            public int getI() {
                        return i;
            }

            @ManagedAttribute
            public int getNumber() {
                        return number;
            }

            private NotificationPublisher publisher;

            public void setNotificationPublisher(NotificationPublisher publisher) {
                        this.publisher = publisher;
            }

            int i = 1;
            int number = 1;

            public void importDone() {
                        this.publisher.sendNotification(new Notification("add", this, number++, "number of objects : " + (100 + i++)));
            }

}
</pre>

A noter que je n'ai pas mis le code de l'interface ISimpleBean. Pour annoter une bean JMX, il suffit d'annoter avec @ManagedResource. L'attribut "objectName" sera le nom affiché dans la console JMX. Il existe d'autres paramètres :

<pre name="code" class="java">@ManagedResource(objectName = "myproject:name=simplebean", description = "A sample JMX-managed bean with notifications", log=true, logFile="jmx.log", currencyTimeLimit=15, persistPolicy="OnUpdate", persistPeriod=200, persistLocation="foo", persistName="bar")
</pre>

Je ne les ai pas encore regardé : cf doc [http://static.springsource.org/spring/docs/2.5.x/reference/jmx.html](http://static.springsource.org/spring/docs/2.5.x/reference/jmx.html)  
Pour mémoire, @Component permet de dire à Spring que c'est un bean (pour le "component-scan") et de lui indiquer un nom (pour le getBean(XXX)). @Scope permet de préciser si on est en "prototype" ou en singleton (par défaut, c'est singleton). Voilà le "pom.xml" utilisé :

<pre name="code" class="xml"><project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>fr.test</groupId>
  <artifactId>TestJMX</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <dependencies>
   <dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.5</version>
    <scope>test</scope>
   </dependency>
   <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-core</artifactId>
    <version>3.0.5.RELEASE</version>
   </dependency>
   <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>3.0.5.RELEASE</version>
   </dependency>
  </dependencies>
</project>
</pre>

**2\. Déclaration du contexte Spring**  

Je paramètre mon contexte Spring : src/main/resources/applicationContext-JMX.xml

<pre name="code" class="xml">
<?xml version="1.0" encoding="UTF-8" ?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context
                           http://www.springframework.org/schema/context/spring-context.xsd">

<context:component-scan base-package="fr.test"/>
<context:mbean-export/>
</beans>
</pre>

La première balise "component-scan" permet de scanner automatiquement tout un package (et ses sous-packages).  
La deuxième balise "mbean-export" dit à Spring de manager les objets JMX et de créer automatiquement un "MBeanExporter" pour exporter les objets JMX avec leurs attributs/opérations/notifications.  

**3\. Réalisation d'un Junit**  

Bon pour tester tout ça, j'ai réalisé un junit bidon qui tourne à l'infini. C'est pas top top mais j'ai le temps d'ouvrir jvisualvm : src/test/java/fr/test/junit/AppTest.java

<pre name="code" class="java">package fr.test.junit;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import fr.test.bean.ISimpleBean;
import fr.test.bean.SimpleBean;

public class AppTest {

 @Test
 public void testSimpleSpringNotification() throws InterruptedException {
  ApplicationContext context = new ClassPathXmlApplicationContext(
    "classpath:applicationContext-JMX.xml");
  SimpleBean simple = (SimpleBean) context.getBean("simplebean");
  while (true) {
   simple.importDone();
   Thread.sleep(5000);
  }

 }

}

</pre>

On lance le test et voilà le log que sort Spring :

<pre>10 janv. 2011 23:05:55 org.springframework.context.support.AbstractApplicationContext prepareRefresh
INFO: Refreshing org.springframework.context.support.ClassPathXmlApplicationContext@41fc2fb: startup date [Mon Jan 10 23:05:55 CET 2011]; root of context hierarchy
10 janv. 2011 23:05:55 org.springframework.beans.factory.xml.XmlBeanDefinitionReader loadBeanDefinitions
INFO: Loading XML bean definitions from class path resource [applicationContext-JMX.xml]
10 janv. 2011 23:05:56 org.springframework.beans.factory.support.DefaultListableBeanFactory preInstantiateSingletons
INFO: Pre-instantiating singletons in org.springframework.beans.factory.support.DefaultListableBeanFactory@3f829e6f: defining beans [simplebean,org.springframework.context.annotation.internalConfigurationAnnotationProcessor,org.springframework.context.annotation.internalAutowiredAnnotationProcessor,org.springframework.context.annotation.internalRequiredAnnotationProcessor,org.springframework.context.annotation.internalCommonAnnotationProcessor,mbeanExporter]; root of factory hierarchy
10 janv. 2011 23:05:56 org.springframework.jmx.export.MBeanExporter afterPropertiesSet
INFO: Registering beans for JMX exposure on startup
10 janv. 2011 23:05:56 org.springframework.jmx.export.MBeanExporter autodetect
INFO: Bean with name 'simplebean' has been autodetected for JMX exposure
10 janv. 2011 23:05:56 org.springframework.jmx.export.MBeanExporter registerBeanInstance
INFO: Located managed bean 'simplebean': registering with JMX server as MBean [myproject:name=simplebean]

</pre>

**4\. Visualisation dans jvisualvm**  

Pour lancer jvisualvm, il faut avoir une jdk1.6 et lancer "jvisualvm".  
Attention, sur jvisualvm, l'affichage de "MBEANS" se fait par un plugin (dans ma version 1.6.0_23). Pour l'activer, il faut aller dans "Tools/Plugins" et sélectionner "Install".  

[![](http://lh3.ggpht.com/_IEgVgEhzZc0/TSuG2C0fovI/AAAAAAAACMY/r9-uivfkJIw/s640/jmx1.png)](http://lh3.ggpht.com/_IEgVgEhzZc0/TSuG2C0fovI/AAAAAAAACMY/r9-uivfkJIw/s640/jmx1.png)  

En plus, il n'y a pas besoin de redémarrer jvisualvm.  
Ensuite, on peut aller voir notre bean. Pour cela, on choisit l'élément "myproject" / "simplebean" du procesus "org.eclipse.jdt.internal.junit.runner.RemoteTestRunner"  

[![](http://lh4.ggpht.com/_IEgVgEhzZc0/TSuG2N4wLAI/AAAAAAAACMc/XzhJjLEeGKY/s640/jmx2.png)](http://lh4.ggpht.com/_IEgVgEhzZc0/TSuG2N4wLAI/AAAAAAAACMc/XzhJjLEeGKY/s640/jmx2.png)  

A noter que pour avoir le graphe, il suffit de double-cliquer sur l'attribut.  

On peut aussi accéder à certains opérations :  

[![](http://lh3.ggpht.com/_IEgVgEhzZc0/TSuG2SCyemI/AAAAAAAACMg/VAtskaN81vk/s640/jmx3.png)](http://lh3.ggpht.com/_IEgVgEhzZc0/TSuG2SCyemI/AAAAAAAACMg/VAtskaN81vk/s640/jmx3.png)  

Enfin, on peut souscrire aux notifications et voir arriver des messages :  

[![](http://lh4.ggpht.com/_IEgVgEhzZc0/TSuISWx_UlI/AAAAAAAACMo/5uW-RSwsdFo/s640/jmx4.png)](http://lh4.ggpht.com/_IEgVgEhzZc0/TSuISWx_UlI/AAAAAAAACMo/5uW-RSwsdFo/s640/jmx4.png)  

**5\. Utilisation d'un notifier**  

Le gros défaut de mettre directement le "publisher" dans la classe SimpleBean est qu'il faut forcément que la classe soit un singleton. En effet, si on change le scope en prototype : cela lance une erreur java sur le "Assert"

<pre>java.lang.IllegalArgumentException: [Assertion failed] - this argument is required; it must not be null
 at org.springframework.util.Assert.notNull(Assert.java:112)
 at org.springframework.util.Assert.notNull(Assert.java:123)
 at fr.test.bean.SimpleBean.importDone(SimpleBean.java:42)
 at fr.test.junit.AppTest.testSimpleSpringNotification(AppTest.java:18)
 ...
</pre>

Du coup, il vaut mieux se créer une classe "Notifier" qui s'occupe des notifications. Comme ça, on peut instancier autant de "SimpleBean" que l'on souhaite.  

Voilà le code de mon simplebean modifié :

<pre name="code" class="java">package fr.test.bean;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.jmx.export.annotation.ManagedAttribute;
import org.springframework.jmx.export.annotation.ManagedResource;
import org.springframework.stereotype.Component;

import fr.test.notification.Notifier;

@Component("simplebean")
@Scope("prototype")
@ManagedResource(objectName = "myproject:name=simplebean", description = "A sample JMX-managed bean with notifications")
public class SimpleBean implements ISimpleBean {

 @Override
 @ManagedAttribute
 public int getI() {
  return i;
 }

 @Override
 @ManagedAttribute
 public int getNumber() {
  return number;
 }

 int i = 1;
 int number = 1;

 @Autowired
 Notifier notifier;

 public void setNotifier(Notifier notifier) {
  this.notifier = notifier;
 }

 @Override
 public void importDone(String author) {
  this.notifier.publishImportDone(author, i++, number++);
 }

}

</pre>

Voilà le code de mon notifier :

<pre name="code" class="java">package fr.test.notification;

import javax.management.Notification;

import org.springframework.jmx.export.annotation.ManagedResource;
import org.springframework.jmx.export.notification.NotificationPublisher;
import org.springframework.jmx.export.notification.NotificationPublisherAware;
import org.springframework.stereotype.Component;

@Component
@ManagedResource(objectName = "myproject:name=notifier", description = "A sample JMX-managed bean with notifications")
public class Notifier implements NotificationPublisherAware {

 private NotificationPublisher publisher;

 public void setNotificationPublisher(NotificationPublisher publisher) {
  this.publisher = publisher;
 }

 public void publishImportDone(String author, int i, int number) {
  this.publisher.sendNotification(new Notification(author, this, number,
    "number of objects : " + (100 + i)));
 }
}

</pre>

Voilà le test junit ajouté :

<pre name="code" class="java"> @Test
 public void testSimpleSpringNotificationWithNotifier() throws InterruptedException {
  ApplicationContext context = new ClassPathXmlApplicationContext(
    "classpath:applicationContext-JMX.xml");
  SimpleBean simple1 = (SimpleBean) context.getBean("simplebean");
  SimpleBean simple2 = (SimpleBean) context.getBean("simplebean");
  while (true) {
   simple1.importDone("simple1");
   simple2.importDone("simple2");
   Thread.sleep(5000);
  }

 }
</pre>

Et au final, voilà le résultat dans le jvisualvm en terme de notifications :[![](http://lh4.ggpht.com/_IEgVgEhzZc0/TSuSnsgWmvI/AAAAAAAACMw/oK3S9yUI_-k/s640/jmx5.png)](http://lh4.ggpht.com/_IEgVgEhzZc0/TSuSnsgWmvI/AAAAAAAACMw/oK3S9yUI_-k/s640/jmx5.png)  

**6\. Utilisation d'un connecteur rmi pour diffuser JMX**  

Avec la JSR-160 "Connectors", on peut définir un connecteur. Apparemment, en local, cela passe par l'url suivante : "service:jmx:jmxmp://localhost:9875" Mais souvent, il est sympa de spécifier soi-même l'url (dans notre exemple rmi). Voilà la configuration Spring à adopter :

<pre name="code" class="xml"><?xml version="1.0" encoding="UTF-8" ?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context
                           http://www.springframework.org/schema/context/spring-context.xsd">

 <context:component-scan base-package="fr.test" />

 <!--
 Now expose the server for remote access via RMI
 Local access:     service:jmx:rmi://localhost/jndi/rmi://localhost:10099/myconnector
 Remote access:    service:jmx:rmi://your.server.com/jndi/rmi://localhost:10099/myconnector
 -->
 <bean
       class="org.springframework.jmx.support.ConnectorServerFactoryBean"
       depends-on="rmiRegistry">
       <property name="objectName" value="connector:name=rmi" />
       <property name="serviceUrl"
             value="service:jmx:rmi://localhost/jndi/rmi://localhost:10099/myconnector" />
 </bean>
 <bean id="rmiRegistry"
       class="org.springframework.remoting.rmi.RmiRegistryFactoryBean">
       <property name="port" value="10099" />
 </bean>

 <context:mbean-export />
</beans>
</pre>

Cette méthode a l'avantage de pouvoir indiquer le port à utiliser dans jvisualvm. On notera le log suivant au lancement des tests :

<pre>11 janv. 2011 00:21:25 org.springframework.remoting.rmi.RmiRegistryFactoryBean getRegistry
INFO: Looking for RMI registry at port '10099'
11 janv. 2011 00:21:26 org.springframework.remoting.rmi.RmiRegistryFactoryBean getRegistry
INFO: Could not detect RMI registry - creating new one
</pre>

Voilà, on peut s'y connecter en se connectant en rmi :[![](http://lh6.ggpht.com/_IEgVgEhzZc0/TSuU3sn4LlI/AAAAAAAACNA/k6b0UiYKYtQ/s640/jmx6.png)](http://lh6.ggpht.com/_IEgVgEhzZc0/TSuU3sn4LlI/AAAAAAAACNA/k6b0UiYKYtQ/s640/jmx6.png)
