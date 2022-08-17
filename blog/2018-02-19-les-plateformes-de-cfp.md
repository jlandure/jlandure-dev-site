Published in [DevFest Nantes](https://medium.com/devfest-nantes)

Feb 19, 2018

4 min read

# Les plateformes de CFP

Depuis maintenant 7 ans, nous, [GDG Nantes](http://gdgnantes.com/), organisons le [DevFest Nantes](https://devfest.gdgnantes.com/).

Étant une organisation communautaire à but non lucrative (association loi 1901) et étant tous bénévoles, nous avons besoin d’un outil pour **minimiser le temps passé** à sélectionner les conférences à retenir. L’idée de cet article est d’**aider de futurs organisateurs** à choisir leur plateforme.

![](https://miro.medium.com/max/1400/1*E5l90fTbUcnGdEqDkCU1Tg.jpeg)
Notre scène principale en 2017 à la Cité des Congrès de Nantes

# Les débuts en 2015

Pour accueillir les propositions des futurs conférenciers _(= “speaker”)_, nous nous sommes rapidement penchés dès 2015 sur la création d’une plateforme d’appel à orateurs _(= “CFP / Call For Papers”)_. Nous passions auparavant par un système de Google Forms très peu pratique pour l’aspect chronophage : la sélection des conférences et des conférenciers associés.

Au printemps 2015, très peu de systèmes de CFP existaient et nous avions 2 besoins :

*   Un outil **pratique** pour “scaler” la phase de sélection et de votes (objectif : limiter le travail par rapport au nombre croissant de propositions)
*   Un outil **simple** à déployer et à gérer (objectif : que chaque organisateur soit autonome / indépendant dans la gestion de sa plateforme de CFP)

Cette plateforme **OpenSource** fût initiée par le travail d’un stagiaire de [SII Nantes](https://twitter.com/SII_Atlantique) “[Thomas Maugin](https://twitter.com/TMaugin)”.

- GDG-Nantes/callForPaper : https://github.com/GDG-Nantes/callForPaper/graphs/contributors

Niveau techno, nous étions partis sur du [AppEngine (Standard) Java](https://cloud.google.com/appengine/docs/java/), [AngularJS](https://angularjs.org/) & du [Material Design](https://material.io/) et un système [_assez étonnant avec le recul_] de Google SpreadSheets & [Datastore](https://cloud.google.com/datastore/) pour le stockage. Cela a largement fait le job la première année en 2015 et nous en étions très fiers ! 😎

# Le fork par CFP.IO

Dès 2016, le système fut forké par l’équipe du BreizhCamp, une autre conférence française basée à Rennes. Cela a donné [**CFP.IO**](http://cfp.io) **📣**  
Au BreizhCamp 2016, nous avons eu le droit à une session de sécurité basée sur le CFP “XSS is beautiful ou comment j’ai hacké le CFP du BreizhCamp” _(hack qui évidemment fonctionnait sur notre CFP)_

http://www.breizhcamp.org/blog/2016/02/12/2016-02-12-premierstalks/#quickie-1)

En 2016, nous avons réutilisé notre plateforme sans passer par ce que proposait CFP.IO pour d’autres conférences : une plateforme mutualisée et gratuite pour héberger des CFP.  
Pour cette 5ème édition, notre CFP a bien marché ([_site toujours UP ici_](https://devfestnantes2015-cfp.appspot.com)) mais souffrait de quelques inconvénients :

*   Stockage : le système de stockage est devenu lent quand nous avons dépassé la barre des 200 propositions (sur 223 au final).
*   UX : la perte du filtrage dans le tableau pour voter nous agaçait.
*   Speaker : la gestion des co-speakers était quasi-absente…

![](https://miro.medium.com/max/1400/1*TWYVMIKD6XVj1dEf6PE1Gw.png)
Les stats de notre CFP 2016

# Le choix de 2017

En 2017, nous nous sommes _(encore)_ posés la question du CFP à utiliser :

*   Le notre à modifier (la base de code n’ayant pas bougé depuis 2 ans 😅)
*   Celui du [Devoxx](https://github.com/nicmarti/cfp-devoxx) (assez complexe niveau hébergement 😟 même si dernièrement cela a l’air plus [simple](https://www.clever-cloud.com/blog/features/2018/01/30/manage-cfp/))
*   Celui de [CFP.IO](https://github.com/cfpio/callForPapers) (ressemblant au nôtre 🤔)
*   [PaperCall.IO](https://www.papercall.io/) (inconnu de notre côté 🤠)
*   Un autre créé en interne de [Zenika Nantes](https://nantes.zenika.com) par un stagiaire (mais aux fonctionnalités limités 🐣)
*   Celui de [GitHub Satellite](https://github.com/rubycentral/cfp-app) (150 stars sur GitHub mais pareil inconnu de notre côté 😎)

Vu que nous n’étions pas en avance, nous avons retenu CFP.IO par facilité. À notre grande fierté, nous avons découvert que notre UI n’avait finalement pas tant que ça changé ! De nouvelles fonctionnalités avaient fait leur apparition comme la gestion de l’agenda de l’événement. Par contre, d’autres fonctionnalités qui nous paraissent intéressantes comme la demande d’aide financière avait disparu.

![](https://miro.medium.com/max/1400/1*96xcBd6l-hznvAJf-vfQag.png)
Les stats de notre CFP 2017

# Conclusion

Notre but premier était d’avoir une plateforme pour gagner du temps pour sélectionner les sujets. Cela étant dit, nous ne trouvons pas de solution assez **jolie** et **pratique** que ce soit pour l’expérience “Conférencier” ou “Organisateur”.

Il se peut que nous sortions **_encore_ **une nouvelle plateforme de CFP. 🚀  
Wait & see…

# Fierté

Certains sites utilisent toujours notre bon vieux CFP de 2015 : [DevFest Lille 2017](https://cfp.gdglille.org) (passé à CFP.IO en 2018), [Voxxed Singapour 2017](https://cfp-singapore.appspot.com) (passé à PaperCall en 2018), [Ncrafts 2018](http://cfp.ncrafts.io/).

Thanks to Benjamin Petetot