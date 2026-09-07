---
title: "Cloud Run... everything you need without K8S - Cloud Nord"
date: 2021-10-06
category: Programming
language: en
pdf: https://storage.googleapis.com/jlandure-dev-slides/slides/2021-10-06-cloud-run-dot-dot-dot-everything-you-need-without-k8s-cloud-nord/deck.pdf
cover: ./cover.webp
speakerdeck: https://speakerdeck.com/jlandure/cloud-run-dot-dot-dot-everything-you-need-without-k8s-cloud-nord
---

At Cloud Nord https://www.cloudnord.fr/programme2021

Twitter: https://twitter.com/jlandure/status/1446027097605033986

Twitter: https://twitter.com/Cloud_Nord/status/1428633128306978820

Slides: 

Docker est arrivé en 2016 en France permettant de packager nos applications facilement. Il a fallu maîtriser les concepts de Docker : commandes, isolation, optimisation des layers etc.

Ensuite, la solution leader d'orchestration Kubernetes est arrivée permettant de scaler ces containers. Pour permettre à K8S de gérer correctement un nom de domaine en TLS, livrer de façon transparente en production, faire du test A/B, il faut là encore retrousser les manches.

Basé sur le projet Open Source Knative, Cloud Run est LA solution parfaite pour déployer des conteneurs et permet de gérer tout ça : autoscaling, gestion du traffic et bien d'autres fonctionnalités !

Faisons un tour des petits plus de cette solution : nous y trouvons la majorité des features d'un Kubernetes sans Kubernetes. Partons à la découverte de cette solution Serverless à base de démos.
