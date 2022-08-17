# [GWT : RichTextArea et RichTextToolbar](https://bazinga-unit.blogspot.com/2011/09/gwt-richtextarea-et-richtexttoolbar.html)

Pour le besoin d'un projet, j'ai besoin d'utiliser le RichTextArea de GWT. Je suis en 2.3 et je commence avec le code "starter" que propose le plugin Eclipse.  
En plus, le [showcase GWT montre un richtextarea](http://gwt.google.com/samples/Showcase/Showcase.html#!CwRichText) facile à utiliser :  

[![](https://lh4.googleusercontent.com/-rsrXRqWzEL8/TmXuKzwPd8I/AAAAAAAACcE/zb1cPK-LeIE/s400/richtextarea.png)](https://lh4.googleusercontent.com/-rsrXRqWzEL8/TmXuKzwPd8I/AAAAAAAACcE/zb1cPK-LeIE/s400/richtextarea.png)  
**1\. Utilisation du RichTextArea**  

Voilà le bout de code que je modifie :  

TestRichtextarea.html  

<pre name="code" class="html">...

<table align="center">     

<tbody>

<tr>

<td colspan="2" style="font-weight:bold;">Please enter your name:</td>

      </tr>

    </tbody>

</table>

...
</pre>

TestRichtextarea  

<pre name="code" class="java">final RichTextArea area = new RichTextArea();
area.ensureDebugId("cwRichText-area");
area.setSize("100%", "14em");

...

RootPanel.get("richtextarea").add(area);
</pre>

et hop c'est parti, je démarre mon serveur et là surprise :**PAS DE TOOLBAR !**  

**2\. Récupération du RichTextToolBar**  

Je regarde un peu comment est fait le showcase GWT .  
Dans leur onglet "code source", je vois l'utilisation d'un "RichTextToolbar". Je me dis "Chouette, suffit de le rajouter et tout va fonctionner!". Et là gros échec : l'import de RichTextToolbar ne se fait pas ! INTROUVABLE la classe !  

Du coup, je vais voir en allant voir les sources du projet "Showcase" :  

<pre>gwt-2.3.0\samples\Showcase\src\com\google\gwt\sample\showcase\client\content\text</pre>

Et là il y a bien une classe "RichTextToolbar"...  

Je récupère alors dans mon projet de test, les éléments suivants :  
- RichTextToolbar.java  
- CwRichText.java  
- CwBasicText.java  
- les images GIF  
- le fichier de message RichTextToolbar_Strings.properties  

Je vois des erreurs de compilation et voilà ce que je fais pour que cela compile :  
- j'enlève les annotations non-reconnues (@ShowcaseStyle, @ShowcaseSource)  
- j'ajoute les classes suivantes : ContentWidget.java, ContentWidgetView.java et son XML "ContentWidgetView.ui.xml"  

Reste plus qu'à tester.  

**3\. Utilisation du RichTextToolBar**  

Je fais les modifications suivantes :  

TestRichtextarea.html  

<pre name="code" class="html">...

...
</pre>

TestRichtextarea  

<pre name="code" class="java">		// Create the text area and toolbar
		final RichTextArea area = new RichTextArea();
		area.ensureDebugId("cwRichText-area");
		area.setSize("100%", "14em");
		RichTextToolbar toolbar = new RichTextToolbar(area);
		toolbar.ensureDebugId("cwRichText-toolbar");
		toolbar.setWidth("100%");

...

RootPanel.get("richtexttoolbar").add(toolbar);
RootPanel.get("richtextarea").add(area);
</pre>

TestRichtextarea.css  

<pre name="code" class="css">.gwt-RichTextArea {
}
.hasRichTextToolbar {
  border: 0px;
}
.gwt-RichTextToolbar {
  background: #e3e8f3 url(images/hborder.png) repeat-x 0px -2003px;
  border-bottom: 1px solid #BBBBBB;
  padding: 3px;
  margin: 0px;
}
.gwt-RichTextToolbar .gwt-PushButton-up {
  padding: 0px 1px 0px 0px;
  margin-right: 4px;
  margin-bottom: 4px;
  border-width: 1px; 
}
.gwt-RichTextToolbar .gwt-PushButton-up-hovering {
  margin-right: 4px;
  margin-bottom: 4px;
  padding: 0px 1px 0px 0px;
  border-width: 1px; 
}
.gwt-RichTextToolbar .gwt-PushButton-down {
  margin-right: 4px;
  margin-bottom: 4px;
  padding: 0px 0px 0px 1px;
  border-width: 1px; 
}
.gwt-RichTextToolbar .gwt-PushButton-down-hovering {
  margin-right: 4px;
  margin-bottom: 4px;
  padding: 0px 0px 0px 1px;
  border-width: 1px; 
}
.gwt-RichTextToolbar .gwt-ToggleButton-up {
  margin-right: 4px;
  margin-bottom: 4px;
  padding: 0px 1px 0px 0px;
  border:1px solid #bbb;
  border-bottom: 1px solid #a0a0a0;
}
.gwt-RichTextToolbar .gwt-ToggleButton-up-hovering {
  margin-right: 4px;
  margin-bottom: 4px;
  padding: 0px 1px 0px 0px;
  border-width: 1px;
}
.gwt-RichTextToolbar .gwt-ToggleButton-down {
  margin-right: 4px;
  margin-bottom: 4px;
  padding: 0px 0px 0px 1px;
  border-width: 1px;
}
.gwt-RichTextToolbar .gwt-ToggleButton-down-hovering {
  margin-right: 4px;
  margin-bottom: 4px;
  padding: 0px 0px 0px 1px;
  border-width: 1px;
}
.cw-RichText {
  border: 1px solid #BBBBBB;
  border-spacing: 0px;
}
</pre>

Je redémarre mon serveur et là superbe, j'ai mon richtextarea fonctionnel avec sa "toolbar".  

[![](https://lh5.googleusercontent.com/-94j37bUE4ks/TmXySk8Jo5I/AAAAAAAACcc/2v3KIoDOd3Y/s400/richtextarea_test.png)](https://lh5.googleusercontent.com/-94j37bUE4ks/TmXySk8Jo5I/AAAAAAAACcc/2v3KIoDOd3Y/s400/richtextarea_test.png)  

D'ailleurs je regarde les méthodes et c'est assez sympa car j'ai deux méthodes sur le widget "RichTextArea" :  
- area.getHTML()  
- area.getText()  

Je peux donc conserver le texte avec sa mise en forme ou récupérer uniquement le texte utile (pour des fins d'indexation pour de futures recherches). Très pratique ce widget ! Dommage qu'il ne soit pas directement livré avec sa toolbar ! Et pour finir, un truc assez fun : le copier-coller fonctionne parfaitement : je peux copier-coller du texte mise en forme...  

Me reste plus qu'à réfléchir comment stocker cela côté serveur : blob ou nosql ou filesystem...