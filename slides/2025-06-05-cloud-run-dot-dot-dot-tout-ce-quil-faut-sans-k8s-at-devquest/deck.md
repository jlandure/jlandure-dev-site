---
title: "Cloud Run... tout ce qu'il faut sans K8S @DevQuest"
event: "DevQuest"
date: 2025-06-05
category: Programming
language: en
pdf: https://storage.googleapis.com/jlandure-dev-slides/slides/2025-06-05-cloud-run-dot-dot-dot-tout-ce-quil-faut-sans-k8s-at-devquest/deck.pdf
cover: ./cover.webp
speakerdeck: https://speakerdeck.com/jlandure/cloud-run-dot-dot-dot-tout-ce-quil-faut-sans-k8s-at-devquest
linkedin:
  - https://www.linkedin.com/posts/devquest-niort_programme-matin%C3%A9e-du-vendredi-6-juin-activity-7330502602964533248-Fmdt
---

Video : https://www.youtube.com/watch?v=pDlmKRgCzpg&list=PLdVDu8iO6zrMurVwGrFR23uw5OtGh4vFx

Linkedin: https://www.linkedin.com/posts/devquest-niort_programme-matin%C3%A9e-du-vendredi-6-juin-activity-7330502602964533248-Fmdt

Docker est arrivé en 2016 en France permettant de packager nos applications facilement. Il a fallu maîtriser les concepts de Docker : commandes, isolation, optimisation des layers etc. 

Ensuite, la solution leader d'orchestration Kubernetes est arrivée permettant de scaler ces containers. Pour permettre à K8S de gérer correctement un nom de domaine en TLS, livrer de façon transparente en production, faire du test A/B, il faut là encore retrousser les manches. 

Basé sur le projet Open Source Knative, Cloud Run est LA solution parfaite pour déployer des conteneurs et permet de gérer tout ça : autoscaling, gestion du traffic et bien d'autres fonctionnalités ! 

Faisons un tour des petits plus de cette solution : nous y trouvons la majorité des features d'un Kubernetes sans Kubernetes. 

Je vous partagerai mon expérience et essaierai de montrer pourquoi les solutions Serverless & Cloud Run sont l'avenir.
