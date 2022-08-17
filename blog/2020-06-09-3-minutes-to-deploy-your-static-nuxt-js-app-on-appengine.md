# ⏱ 3 minutes to deploy your static Nuxt.js app on AppEngine

[#webdev](/t/webdev) [#googlecloud](/t/googlecloud) [#serverless](/t/serverless) [#vue](/t/vue)

I’ve been deploying applications on [serverless solutions](https://en.wikipedia.org/wiki/Serverless_computing) since 2010\. Recently, I discovered [Nuxt.js](https://nuxtjs.org/) and I wanted to create this post on how to quickly set up a static Nuxt.js app on [AppEngine, the Google Cloud PaaS](https://cloud.google.com/appengine).

# [](#getting-started-with-nuxtjs)📝 Getting started with Nuxt.js

[Nuxt.js](https://nuxtjs.org/) is described as

> The Intuitive Vue Framework  
> Build your next Vue.js application with confidence using NuxtJS.  
> An open source framework making web development simple and powerful.

It's very powerful! You can use it to create various architectures: [SSR](https://nuxtjs.org/guide#server-rendered-universal-ssr-), [SPA](https://nuxtjs.org/guide#single-page-applications-spa-) or [Static](https://nuxtjs.org/guide#static-generated-pre-rendering-) renderings.  
For this demo, we will be focused on the **static feature** using the `nuxt generate` command.

## [](#%E2%9A%97-create-the-project)⚗ Create the project

For the demo, we will use a fresh new project. To do this, execute the `npx create-nuxt-app` command to create a [simple Nuxt.js application](https://nuxtjs.org/guide/installation#using-code-create-nuxt-app-code-).  

    $ node -v
    v12.16.3

    $ npx create-nuxt-app

    create-nuxt-app v2.15.0
    ✨  Generating Nuxt.js project in .
    ? Project name nuxt-static-deploy-appengine
    ? Project description My glorious Nuxt.js project
    ? Author name Julien Landuré
    ? Choose programming language TypeScript
    ? Choose the package manager Npm
    ? Choose UI framework None
    ? Choose custom server framework None (Recommended)
    ? Choose the runtime for TypeScript Default
    ? Choose Nuxt.js modules (Press <space> to select, <a> to toggle all, <i> to inv
    ert selection)
    ? Choose linting tools Prettier
    ? Choose test framework None
    ? Choose rendering mode Universal (SSR)
    ? Choose development tools (Press <space> to select, <a> to toggle all, <i> to invert selection)
    ...
    🎉  Successfully created project nuxt-static-deploy-appengine

## [](#test-locally)✅ Test locally

As described in the command line, run the `npm run start` [script to get your app running](https://nuxtjs.org/guide/commands#development-environment) on `http://localhost:3000/`.

Let's edit the `index.vue` and write this html:  

    <h2 class="subtitle">Hello Nuxt on AppEngine 🎉</h2>

And it works! Very easy to see our modification instantly.

[![Alt Text](https://res.cloudinary.com/practicaldev/image/fetch/s--IWUCzepA--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/7a5a4pg96lydb6y02cky.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--IWUCzepA--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/7a5a4pg96lydb6y02cky.png)

## [](#%F0%9F%8F%97-build-it)🏗 Build it

To [build the app statically](https://nuxtjs.org/guide/commands#static-generated-deployment-pre-rendered-), run the `npm run generate` command:  

    $ npm run generate

    > nuxt-static-deploy-appengine@1.0.0 generate .../nuxt-static-deploy-appengine
    > nuxt generate

    ℹ Production build                                                    10:52:36
    ✔ Builder initialized                                                 10:52:37
    ✔ Nuxt files generated                                                10:52:37
    ℹ Starting type checking service...                   nuxt:typescript 10:52:39

    ✔ Client
      Compiled successfully in 6.95s

    ✔ Server
      Compiled successfully in 1.13s

    Hash: c5e482cb9772cddb1178
    Version: webpack 4.43.0
    Time: 6951ms
    Built at: 05/27/2020 10:52:46 AM
                             Asset       Size  Chunks                         Chunk Names
    ../server/client.manifest.json    6.6 KiB          [emitted]              
           98f4a70ff71f0382866c.js   2.31 KiB       3  [emitted] [immutable]  runtime
           9fc3f5e914943c5b3a9b.js   2.97 KiB       2  [emitted] [immutable]  pages/index
                          LICENSES  389 bytes          [emitted]              
           a51444c83f14a6afaeb5.js    153 KiB       1  [emitted] [immutable]  commons.app
           d267ba93006b46dadaa8.js   49.2 KiB       0  [emitted] [immutable]  app
     + 2 hidden assets
    Entrypoint app = 98f4a70ff71f0382866c.js a51444c83f14a6afaeb5.js d267ba93006b46dadaa8.js

    Hash: fbd0c6af7579246a49e7
    Version: webpack 4.43.0
    Time: 1127ms
    Built at: 05/27/2020 10:52:47 AM
                      Asset       Size  Chunks                         Chunk Names
    818a9680ee5eeafdfb4b.js   3.05 KiB       1  [emitted] [immutable]  pages/index
                  server.js   26.7 KiB       0  [emitted]              app
       server.manifest.json  145 bytes          [emitted]              
    Entrypoint app = server.js
    ℹ Generating pages                                                    
    ✔ Generated /                                                        

✨ Congratulations, we built our first Nuxt.js application!

_ProTips: We can check the files in the `dist` folder or run it with `npx http-server dist`._

# [](#deploy-it-on-appengine)☁️ Deploy it on AppEngine

Then, to share the project with the rest of the world, we can deploy it on AppEngine. [Appengine](https://cloud.google.com/appengine) comes with a lot of features and quotas.

It is free for a basic usage thanks to its quotas BUT we have to enable billing to enjoy it. As a new customer, we get [$300 to spend on Google Cloud Platform products](https://cloud.google.com/free) during your free trial.

## [](#create-a-project)🛒 Create a project

Go to [`console.cloud.google.com`](//console.cloud.google.com) and [create a new Google Cloud Platform project](https://cloud.google.com/appengine/docs/standard/python3/building-app/creating-gcp-project).  
Please save the [PROJECT_ID] of the project: you have to replace the `nuxt-static-deploy` with your [PROJECT_ID] for the rest of the post.

_ProTips: we can retrieve the [PROJECT_ID] in the url of the web console like `https://console.cloud.google.com/appengine/start?project=nuxt-static-deploy` where nuxt-static-deploy is my [PROJECT_ID]._

_ProTips: To create a project to host your app, we can also use the `gcloud projects create` command. we need to enter a [PROJECT_ID], `nuxt-static-deploy` for example._  

    # Create a project 
    $ gcloud projects create nuxt-static-deploy 
    Create in progress for [https://cloudresourcemanager.googleapis.com/v1/projects/nuxt-static-deploy].
    Waiting for [operations/cp.4929250122387435991] to finish...done.              
    Enabling service [cloudapis.googleapis.com] on project [nuxt-static-deploy]...
    Operation "operations/acf.803672e3-74b0-43e1-8a6b-3d37a4a0975b" finished successfully.

    # List the billing accounts
    $ gcloud beta billing accounts list
    ACCOUNT_ID            NAME                                          OPEN
    00ADEE-870384-XXXXXX  my_account                                    True

    # Link the billing account to my project
    $ gcloud beta billing projects link nuxt-static-deploy --billing-account=00ADEE-870384-XXXXXX
    billingAccountName: billingAccounts/00ADEE-870384-XXXXXX
    billingEnabled: true
    name: projects/nuxt-static-deploy/billingInfo
    projectId: nuxt-static-deploy

    # Enable Cloud Build API
    $ gcloud --project nuxt-static-deploy services enable cloudbuild.googleapis.com

## [](#write-the-descriptor-raw-appyaml-endraw-)✏️ Write the descriptor `app.yaml`

AppEngine supports various programming languages: python, go, java, php, nodejs etc.  
To deploy static files, the best practice is to use the `python37` runtime.

Let's create a file in `.appengine/app.yaml`  

    runtime: python37

    handlers:
    - url: /
      static_files: index.html
      upload: index.html
      secure: always
    - url: /(.*)
      static_files: \1
      upload: (.*)
      secure: always

For more information on the descriptor file, [please read this doc](https://cloud.google.com/appengine/docs/standard/python3/config/appref).

Don't forget to copy the file in our `dist` folder using this command `cp .appengine/app.yaml dist/`.

_ProTips: We can add it to the `build` script in your `package.json` file._

## [](#deploy-your-app)🚀 Deploy your app

If this is the first you are using the Google Cloud Platform, you have to install the `gcloud` command line utility following [the official page](https://cloud.google.com/sdk/docs/quickstarts) or [using Homebrew](https://formulae.brew.sh/cask/google-cloud-sdk).

Deploy our app using the `gcloud app deploy` command:  

    $ gcloud app deploy --project nuxt-static-deploy dist 

    You are creating an app for project nuxt-static-deploy.
    WARNING: Creating an App Engine application for a project is irreversible and the region
    cannot be changed. More information about regions is at
    <https://cloud.google.com/appengine/docs/locations>.

    Please choose the region where you want your App Engine application 
    located:

     [1] asia-east2    (supports standard and flexible)
     [2] asia-northeast1 (supports standard and flexible)
     [3] asia-northeast2 (supports standard and flexible)
     [4] asia-northeast3 (supports standard and flexible)
     [5] asia-south1   (supports standard and flexible)
     [6] australia-southeast1 (supports standard and flexible)
     [7] europe-west   (supports standard and flexible)
     [8] europe-west2  (supports standard and flexible)
     [9] europe-west3  (supports standard and flexible)
     [10] europe-west6  (supports standard and flexible)
     [11] northamerica-northeast1 (supports standard and flexible)
     [12] southamerica-east1 (supports standard and flexible)
     [13] us-central    (supports standard and flexible)
     [14] us-east1      (supports standard and flexible)
     [15] us-east4      (supports standard and flexible)
     [16] us-west2      (supports standard and flexible)
     [17] us-west3      (supports standard and flexible)
     [18] us-west4      (supports standard and flexible)
     [19] cancel
    Please enter your numeric choice:  7

    Creating App Engine application in project nuxt-static-deploy and region [
    europe-west]....done.                                                          
    Services to deploy:

    descriptor:      [.../nuxt-static-deploy-appengine/dist/app.yaml]
    source:          [.../nuxt-static-deploy-appengine/dist]
    target project:  [nuxt-static-deploy]
    target service:  [default]
    target version:  [20200602t094056]
    target url:      [https://20200602t094056-dot-nuxt-static-deploy.ew.r.appspot.com]

         (add --promote if you also want to make this service available from
         [https://nuxt-static-deploy.ew.r.appspot.com])

    Do you want to continue (Y/n)?   

    Beginning deployment of service [default]...
    ╔════════════════════════════════════════════════════════════╗
    ╠═ Uploading 12 files to Google Cloud Storage               ═╣
    ╚════════════════════════════════════════════════════════════╝
    File upload done.
    Updating service [default]...done.                                             
    Deployed service [default] to [https://20200602t094056-dot-nuxt-static-deploy.ew.r.appspot.com]

    You can stream logs from the command line by running:
      $ gcloud app logs tail -s default

    To view your application in the web browser run:
      $ gcloud app browse

# [](#enjoy)🎉 Enjoy

Go [here at https://nuxt-static-deploy.appspot.com/](https://nuxt-static-deploy.appspot.com/) to see our first Nuxt.js app deployed with AppEngine.

# [](#conclusion)🔍 Conclusion

Nuxt.js is a cool technology to create Vue.js app and is trending with the release of `@nuxt/content`

https://twitter.com/nuxt_js/status/1263795755954909184
>   
> The content/ directory for your Nuxt app, acting as a git-based headless CMS.  
>   
> ✅ Vue components in Markdown  
> ✅ Powerful QueryBuilder API  
> ✅ Handles MD, CSV, YAML, JSON  
> ✅ Blazing fast hot reload in dev  
> ✅ Syntax highlighting  
>   

AppEngine comes with a lot of features:

*   🔁 Multiple versions available to do A/B testing or Traffic Splitting (each version has a different timestamp on the [Versions Page on Appengine](https://console.cloud.google.com/appengine/versions))
*   🔐 [Custom Domain Mapping](https://cloud.google.com/appengine/docs/standard/python3/mapping-custom-domains) & auto-renew, free, [managed SSL certificates](https://cloud.google.com/appengine/docs/standard/python3/securing-custom-domains-with-ssl)
*   💸 Free quota (1 GB bandwidth)
*   ⭐️ No instance used with Python37 runtime and our configuration because we have only static content
*   🌐 Static content available through Google CDN and [its Edge Network](https://peering.google.com/#/infrastructure)
*   ⚡️ Managed network: Surprise 🎉 our project uses the http3 procotol `h3-Q050`.

[![Alt Text](https://res.cloudinary.com/practicaldev/image/fetch/s--3bvnoXH0--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/m0egf2fxzh3xsxcvp46g.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--3bvnoXH0--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/m0egf2fxzh3xsxcvp46g.png)

Feel free to contact me on [Twitter](https://twitter.com/jlandure) if you have questions!

NB: You can find another guide on Nuxt.js with AppEngine [here in the official documentation](https://nuxtjs.org/faq/appengine-deployment).