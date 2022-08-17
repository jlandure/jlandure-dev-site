[![](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2015/06/web-1.png?resize=702%2C336&ssl=1)](https://blog.zenika.com/wp-content/uploads/2015/06/web-1.png)[Web](https://blog.zenika.com/category/themes/web/) 

# Premiers pas dans la création d'une extension Chrome

[27 février 2013](https://blog.zenika.com/2013/02/27/premiers-pas-dans-la-creation-d-une-extension-chrome/ "9 h 05 min") [Julien Landuré](https://blog.zenika.com/author/jlandure2/ "Julien Landuré")

Chrome inclut un mécanisme d’extension assez puissant permettant d’utiliser tout ce que le Web peut nous offrir : HTML5 / CSS3 / Javascript mais aussi quelques APIs spécifiques aux extensions. Dans cet article, nous allons créer une première extension dans le but de bloquer l’accès internet à certains sites (exemple d’un contrôle parental).  

### Premiers pas

Pour comprendre et créer sa première extension Chrome, il suffit de suivre le « Getting Started » du site officiel [Chrome](http://developer.chrome.com/extensions/getstarted.html). Il décrit qu’une extension se compose d’un fichier manifest.json contenant des informations générales mais aussi des permissions. On nous montre également comment initialiser une première popup en HTML avec le JS associé.  
Voilà notre premier manifest.json :

<pre class="lang:default decode:true ">{
  "manifest_version": 2,
  "name": "ZenExt Web Blocker",
  "description": "This extension blocks internet",
  "version": "1.0",
  "permissions": [
                "http://*/*",
            	"https://*/*"
  ],
  "browser_action": {
    "default_icon": "ok.png",
    "default_popup": "popup.html"
  }
}</pre>

On déclare donc un nom, une description ainsi que des permissions. Ensuite on spécifie l’icône de notre extension ainsi qu’un fichier HTML. Ce fichier sera affiché en popup dès que l’on cliquera sur notre extension.  
Pour bloquer notre navigateur, nous allons demander un mot de passe qui sera redemandé au déblocage. Voici le fichier popup.html (très simpliste) :

<pre class="lang:default decode:true "><!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Block Access Popup</title>
    <!--
      - JavaScript and HTML must be in separate files: see our Content Security
      - Policy documentation[1] for details and explanation.
      -
      - [1]: http://developer.chrome.com/extensions/contentSecurityPolicy.html
     -->
  </head>
  <body>
	<form>
		<h2>Please fill the password</h2>
		<input type="password" id="set_password" placeholder="type a password" />
		<input type="password" id="confirm_password" placeholder="retype the password" />
		<br/>
		<input type="button" id="block" value="Block Web Access"/>
	</form>
  </body>
</html></pre>

Pour ajouter notre extension, il suffit d’aller dans la page des extensions Chrome puis de cliquer sur « Developer Mode » :[![chrome1](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2013/02/chrome1-1.jpg?resize=700%2C59&ssl=1)](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2013/02/chrome1-1.jpg?ssl=1)  
Cela ouvre de nouvelles options dont « Load unpacked extension… » et on peut aller chercher notre projet dans notre workspace…[![chrome2](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2013/02/chrome2-1.jpg?resize=700%2C404&ssl=1)](https://i0.wp.com/blog.zenika.com/wp-content/uploads/2013/02/chrome2-1.jpg?ssl=1)  
Enfin, nous voyons notre projet bien chargé : notre icône est affichée dans la barre des extensions et la popup s’affiche bien.  
![zen3.png](https://blog.zenika.com/wp-content/uploads/2015/07/zen3.png)  
![zen4.png](https://blog.zenika.com/wp-content/uploads/2015/07/zen4.png)  
Remarque : dans la page des extensions, un lien « Reload » est présenté : très pratique pour recharger notre extension (suite à des modifications de code) !

### Ajout de comportements

Maintenant que notre extension et notre popup s’affichent correctement, nous allons ajouter un peu de comportement. Pour cela, nous allons créer « block.js » qui va permettre :

*   de changer de l’icône ![ok.png](https://blog.zenika.com/wp-content/uploads/2015/07/ok.png)à ![block.png](https://blog.zenika.com/wp-content/uploads/2015/07/block.png)
*   de changer le texte dans la popup
*   de changer le texte du bouton
*   de vérifier que les 2 mots de passe saisies sont identiques (avant blocage).

La première chose à faire est donc de rajouter l’insertion de notre fichier JS : `<script src="block.js"></script>`  
Ensuite, on se créé une fonction « block » que l’on va appeler sur le click du bouton. Pour changer l’icône, on peut se baser sur la documentation et les exemples fournis sur le site Chrome Extension. Il faut utiliser la fonction suivante : `chrome.browserAction.setIcon({path:"ok.png"});` Nous rajoutons en même temps le code JS pour tester les passwords et changer le texte.  
Naturellement, nous changeons le code de notre bouton en :  
`<input type="button" id="block" value="Block Web Access" onclick="block();"/>`.  
Là, nous faisons un petit « reload », on va sur notre bouton et **RIEN** ! Pourquoi ? Comment ? Que faire ?… Là où faire des extensions Chrome est vraiment sympa, c’est que l’on développe une appli Web. Un petit clic droit sur l’icône puis sur « Inspect Popup » et nous pouvons lancer les « Chrome Dev Tools » : à nous le debugging !!  
Pour réafficher notre popup, nous pouvons lancer dans la console un `location.reload(true)` :  
![zen8.png](https://blog.zenika.com/wp-content/uploads/2015/07/zen8.png)  
Nous avons accès aux sources :  
![zen9.png](https://blog.zenika.com/wp-content/uploads/2015/07/zen9.png)  
Et quand on clique sur notre bouton, voici ce que la console affiche :  
![zen10.png](https://blog.zenika.com/wp-content/uploads/2015/07/zen10.png)  
Génial, nous avons une explication : Chrome, avec ses politiques de sécurité par défaut, n’autorise pas l’exécution de javascript dans le fichier HTML. Il faut absolument binder les évènements dans le fichier JS associé. Voilà un petit lien explicatif pour les plus curieux [ici](http://developer.chrome.com/extensions/contentSecurityPolicy.html#JSExecution)  
Voilà le fichier JS au complet :

<pre class="lang:default decode:true ">var password;
function unblock(e) {
	chrome.browserAction.setIcon({path:"ok.png"});
	document.querySelector('#block').removeEventListener('click', unblock, false);
	document.querySelector('#block').addEventListener('click', block);
	document.querySelector('#block').value = "Block Web Access";
	document.querySelector('#block').className = "btn btn-large btn-primary";
	document.querySelector('h2').innerHTML = "Block Web Access";
	chrome.webRequest.onBeforeRequest.removeListener(requestListener);
}
function block(e) {
	if(document.querySelector('#set_password').value == '') {
		alert('Please enter a password...');
		return;
	}
	if(document.querySelector('#set_password').value == document.querySelector('#confirm_password').value) {
		password = document.querySelector('#set_password').value;
	} else {
		alert('Please type the same password !');
		return;
	}
	chrome.browserAction.setIcon({path:"block.png"});
	document.querySelector('#block').removeEventListener('click', block, false);
	document.querySelector('#block').addEventListener('click', unblock);
	document.querySelector('#block').value = "Stop blocking";
	document.querySelector('#block').className = "btn btn-large btn-danger";
	document.querySelector('h2').innerHTML = "Unlock Web Access";
}
document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#block').addEventListener('click', block);
});</pre>

Du coup, on reload notre application et voilà ce que cela donne si on ne saisit pas de mot de passe.  
![zen5.png](https://blog.zenika.com/wp-content/uploads/2015/07/zen5.png)  
Quand on valide notre petit formulaire, nous avons bien notre nouvelle l’icône et le texte qui change :  
![zen6.png](https://blog.zenika.com/wp-content/uploads/2015/07/zen6.png)  
Voici une capture d’écran avec les Dev Tools : on peut ajouter des breakpoints, faire du pas à pas et par exemple utiliser le « Watch Expression » du debugger pour voir le mot de passe saisi :  
![zen12.png](https://blog.zenika.com/wp-content/uploads/2015/07/zen12.png)

### Ajout du blocage

Pour déterminer si on peut bloquer les URL et quelle api il faut utiliser, il faut jeter un coup d’oeil sur la documentation des [APIs Chrome](http://developer.chrome.com/extensions/api_index.html).  
Pour bloquer des URL, la documentation officielle nous indique qu’il faut utiliser les permissions « [webRequest](http://developer.chrome.com/extensions/webRequest.html) » et « webRequestBlocking ». Nous ajoutons donc ces permissions dans le fichier `manifest.json`

<pre class="lang:default decode:true ">{
  "manifest_version": 2,
  "name": "ZenExt Web Blocker",
  "description": "This extension blocks internet",
  "version": "1.0",
  "permissions": [
                "http://*/*",
            	"https://*/*"
  ],
  "optional_permissions": [
             	"webRequest",
             	"webRequestBlocking"
  ],
  "browser_action": {
    "default_icon": "ok.png",
    "default_popup": "popup.html"
  }
}</pre>

En s’inspirant des exemples de la doc, nous nous apercevons que les droits « optionnels » nécessitent un requête supplémentaire pour demander ce droit à l’utilisateur. Une fois la [documentation parcourue](http://developer.chrome.com/extensions/permissions.html), voici le code JS produit :

<pre class="lang:default decode:true ">var password;
function unblock(e) {
	chrome.browserAction.setIcon({path:"ok.png"});
	document.querySelector('#block').removeEventListener('click', unblock, false);
	document.querySelector('#block').addEventListener('click', blockWithGrant);
	document.querySelector('#block').value = "Block Web Access";
	document.querySelector('#block').className = "btn btn-large btn-primary";
	document.querySelector('h2').innerHTML = "Block Web Access";
	chrome.webRequest.onBeforeRequest.removeListener(requestListener);
}
function needToBlock(details) {
	if(details.url.indexOf("google.fr") != -1
			|| details.url.indexOf("chrome-extension://") == 0) {
		return false;
	}
	return true;
}
function requestListener(details) {
	return {cancel: needToBlock(details)};
}
function block(e) {
	blocking = true;
	chrome.browserAction.setIcon({path:"block.png"});
	chrome.webRequest.onBeforeRequest.addListener(requestListener,
			{urls: ["<all_urls>"]},
			["blocking"]);
	document.querySelector('#block').removeEventListener('click', blockWithGrant, false);
	document.querySelector('#block').addEventListener('click', unblock);
	document.querySelector('#block').value = "Stop blocking";
	document.querySelector('#block').className = "btn btn-large btn-danger";
	document.querySelector('h2').innerHTML = "Unlock Web Access";
}
function blockWithGrant(e) {
	if(document.querySelector('#set_password').value == '') {
		alert('Please enter a password...');
		return;
	}
	if(document.querySelector('#set_password').value == document.querySelector('#confirm_password').value) {
		password = document.querySelector('#set_password').value;
	} else {
		alert('Please type the same password !');
		return;
	}
	chrome.permissions.request({
		permissions: ['webRequest',
		              'webRequestBlocking']
	}, function(granted) {
		// The callback argument will be true if the user granted the permissions.
		if (granted) {
			block();
		} else {
			alert('Unable to launch this extension without granted permissions');
		}
	});
}
document.addEventListener('DOMContentLoaded', function () {
		document.querySelector('#block').addEventListener('click', blockWithGrant);
});</pre>

Nous noterons les deux bouts de code importants :  
– la requête de permission

<pre class="lang:default decode:true javascript code javascript">chrome.permissions.request({
		permissions: ['webRequest',
		              'webRequestBlocking']
	}, function(granted) {...});</pre>

– le blocage de toutes les URL

<pre class="lang:default decode:true javascript code javascript">chrome.webRequest.onBeforeRequest.addListener(requestListener,
			{urls: ["<all_urls>"]},
			["blocking"]);</pre>

Il ne nous reste plus qu’à tester notre code…  
En entrant dans le mode bloqué, le site `gdgnantes.com` est bloqué alors que le site `[https://news.google.fr](https://news.google.fr)` continue de fonctionner :  
![zen13.png](https://blog.zenika.com/wp-content/uploads/2015/07/zen13.png)  
Ensuite, on clique sur « Stop blocking » et les sites refonctionnent :  
![zen14.png](https://blog.zenika.com/wp-content/uploads/2015/07/zen14.png)

### Gestion du blocage : utilisation en background

Un premier bug est vite détecté… dès que la popup est fermée, le contrôle de blocage des URL n’est plus actif… On comprend rapidement que cela vient du fait que la popup étant fermée, tous nos contrôles effectués dans le JS de la page ne sont pas actifs. Pour contourner cela, Chrome propose la notion de [background](http://developer.chrome.com/extensions/background_pages.html) : un script qui tourne en tâche de fond.  
Pour diffuser le passage de « bloqué » à « non bloqué », notre popup va devoir mettre à jour notre script qui tourne en background. Pour cela, la fonction suivante permet d’accéder à notre script `background.js` :  
`chrome.extension.getBackgroundPage()`  
Pour ajouter le script, il faut modifier le `manifest.json` :

<pre class="lang:default decode:true ">{
  "manifest_version": 2,
  "name": "ZenExt Web Blocker",
  "description": "This extension blocks internet",
  "version": "1.0",
  "permissions": [
	"http://*/*",
	"https://*/*"
  ],
  "optional_permissions": [
	"webRequest",
	"webRequestBlocking"
  ],
  "browser_action": {
    "default_popup": "popup.html"
  },
  "background": {
    "scripts": ["background.js"]
  }
}</pre>

Pour stocker le mot de passe de façon permanente, nous allons le stocker dans `background.js`. Voici le code obtenu :

<pre class="lang:default decode:true ">var blocking = false;
var password;
function addListener() {
	chrome.webRequest.onBeforeRequest.addListener(requestListener,
			{urls: ["<all_urls>"]},
			["blocking"]);
}
function removeListener() {
	chrome.webRequest.onBeforeRequest.removeListener(requestListener);
}
function isValidUrl(details) {
	if(blocking) {
		if(details.url.indexOf("google.fr") != -1) {
			return false;
		}
	}
	if(details.url.indexOf("chrome-extension://") != -1) {
		return false;
	}
	return true;
}
function updateIcon() {
	if(blocking) {
		chrome.browserAction.setIcon({path:"block.png"});
	} else {
		chrome.browserAction.setIcon({path:"ok.png"});
	}
}
function requestListener(details) {
	return {cancel: isValidUrl(details)};
}
chrome.browserAction.setIcon({path:"ok.png"});</pre>

… Et le code de notre JS `block.js`

<pre class="lang:default decode:true ">function makeBlockUI() {
	document.querySelector('#block').removeEventListener('click', unblock, false);
	document.querySelector('#block').addEventListener('click', block);
	document.querySelector('#block').value = "Start blocking";
	document.querySelector('#block').className = "btn btn-large btn-primary";
	document.querySelector('h2').innerHTML = "Block Web Access";
}
function makeUnblockUI() {
	document.querySelector('#block').removeEventListener('click', block, false);
	document.querySelector('#block').addEventListener('click', unblock);
	document.querySelector('#block').value = "Stop blocking";
	document.querySelector('#block').className = "btn btn-large btn-danger";
	document.querySelector('h2').innerHTML = "Unlock Web Access";
}
function unblock(e) {
	if(document.querySelector('#set_password').value == '') {
		alert('Please enter a password...');
		return;
	}
	if(document.querySelector('#set_password').value != document.querySelector('#confirm_password').value) {
		alert('Please type the same password !');
		return;
	}
	if(document.querySelector('#set_password').value != chrome.extension.getBackgroundPage().password) {
		alert('Identification failed : wrong password !');
		return;
	}
	makeBlockUI();
	chrome.extension.getBackgroundPage().blocking = false;
	chrome.extension.getBackgroundPage().removeListener();
	chrome.extension.getBackgroundPage().updateIcon();
	self.close();
}
function block(e) {
	chrome.permissions.request({
		permissions: ['webRequest',
		              'webRequestBlocking']
	}, function(granted) {
		// The callback argument will be true if the user granted the permissions.
		if (granted) {
			chrome.extension.getBackgroundPage().addListener();
		} else {
			alert('Unable to launch this extension without granted permissions');
		}
		});
	if(document.querySelector('#set_password').value == '') {
		alert('Please enter a password...');
		return;
	}
	if(document.querySelector('#set_password').value != document.querySelector('#confirm_password').value) {
		alert('Please type the same password !');
		return;
	} else {
		chrome.extension.getBackgroundPage().password = document.querySelector('#set_password').value;
	}
	chrome.extension.getBackgroundPage().blocking = true;
	chrome.extension.getBackgroundPage().updateIcon();
	makeUnblockUI();
	self.close();
}
document.addEventListener('DOMContentLoaded', function () {
		document.querySelector('#block').addEventListener('click', block);
		if(chrome.extension.getBackgroundPage().blocking) {
			makeUnblockUI();
		} else {
			makeBlockUI();
		}
});</pre>

Pour faire plus joli, nous allons en profiter po  
ur ajouter quelques CSS… au hasard, nous allons mettre du [twitter bootstrap](http://twitter.github.com/bootstrap/) !🙂
Voilà ce que devient notre page `popup.html`

<pre class="lang:default decode:true "><!doctype html>
<html lang="en">
  <head>
  	 <meta charset="utf-8">
    <title>Block Access Popup</title>
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
      <style type="text/css">
      body {
        padding-top: 40px;
        padding-bottom: 40px;
        background-color: #f5f5f5;
        min-width: 700px;
        overflow-x: hidden;
      }
      .form-signin {
        max-width: 500px;
        padding: 19px 29px 29px;
        margin: 0 auto 20px;
        background-color: #fff;
        border: 1px solid #e5e5e5;
        -webkit-border-radius: 5px;
           -moz-border-radius: 5px;
                border-radius: 5px;
        -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.05);
           -moz-box-shadow: 0 1px 2px rgba(0,0,0,.05);
                box-shadow: 0 1px 2px rgba(0,0,0,.05);
      }
      .form-signin .form-signin-heading,
      .form-signin .checkbox {
        margin-bottom: 10px;
      }
      .form-signin input[type="text"],
      .form-signin input[type="password"] {
        font-size: 16px;
        height: auto;
        margin-bottom: 15px;
        padding: 7px 9px;
      }
    </style>
    <!--
      - JavaScript and HTML must be in separate files: see our Content Security
      - Policy documentation[1] for details and explanation.
      -
      - [1]: http://developer.chrome.com/extensions/contentSecurityPolicy.html
     -->
  </head>
  <body>
     <form class="form-signin">
        <h2 class="form-signin-heading">Please fill the password</h2>
     <input type="password" id="set_password" placeholder="type a password" class="input-block-level"/>
     <input type="password" id="confirm_password" placeholder="retype the password" class="input-block-level"/>
     <br/>
    <br/>
    <input type="button" id="block" class="btn btn-large btn-primary" value="Start blocking"/>
    </form>
	<script src="block.js"></script>
  </body>
</html></pre>

Après rechargement, nous obtenons une extension plutôt jolie et intéressante qui bloque bien toutes les pages exceptées « google.fr ».  
![zen15.png](https://blog.zenika.com/wp-content/uploads/2015/07/zen15.png)  
![zen16.png](https://blog.zenika.com/wp-content/uploads/2015/07/zen16.png)  
![zen17.png](https://blog.zenika.com/wp-content/uploads/2015/07/zen17.png)

### Résumé

Nous avons vu comment créer une extension Chrome et utiliser les outils Chrome pour la débugger. La liste des APIs Chrome est assez importante (et il y a même une partie sur les [APIs expérimentales](http://developer.chrome.com/extensions/experimental.html)).  
Dans un monde idéal, il faudrait prendre le temps d’encoder le mot de passe et peut-être l’écrire de façon discrète dans le filesystem ou dans le localStorage (pour un stockage persistent)… Et puis… il faut noter un gros défaut de l’extension créée : tout le monde peut désactiver une extension. Il existe une api « management » mais on ne peut pas piloter sa propre extension.  
Pour finir, nous n’avons pas abordé la partie déploiement sur le chrome web store mais ce n’est pas bien compliqué : il suffit d’avoir un compte « developer » -5$ tout de même- et d’uploader son application. Tout est décrit [ici](https://developers.google.com/chrome/web-store/docs/publish?hl=fr).