---
title: "Cloud Run... everything you need without K8S"
date: 2021-11-26
category: Programming
language: en
pdf: https://storage.googleapis.com/jlandure-dev-slides/slides/2021-11-26-cloud-run-dot-dot-dot-everything-you-need-without-k8s-9a958057-4e2d-4690-951b-3c90050a5bfc/deck.pdf
cover: ./cover.webp
speakerdeck: https://speakerdeck.com/jlandure/cloud-run-dot-dot-dot-everything-you-need-without-k8s-9a958057-4e2d-4690-951b-3c90050a5bfc
---

At DevFest Mons 2021: https://gdg.community.dev/events/details/google-gdg-mons-presents-devfest-mons/

Twitter: https://twitter.com/thierrynjike14/status/1464538481762447365

Docker est arrivé en 2016 en France permettant de packager nos applications facilement. Il a fallu maîtriser les concepts de Docker : commandes, isolation, optimisation des layers etc.

Ensuite, la solution leader d'orchestration Kubernetes est arrivée permettant de scaler ces containers. Pour permettre à K8S de gérer correctement un nom de domaine en TLS, livrer de façon transparente en production, faire du test A/B, il faut là encore retrousser les manches.

Basé sur le projet Open Source Knative, Cloud Run est LA solution parfaite pour déployer des conteneurs et permet de gérer tout ça : autoscaling, gestion du traffic et bien d'autres fonctionnalités !

Faisons un tour des petits plus de cette solution : nous y trouvons la majorité des features d'un Kubernetes sans Kubernetes. Partons à la découverte de cette solution Serverless à base de démos.
