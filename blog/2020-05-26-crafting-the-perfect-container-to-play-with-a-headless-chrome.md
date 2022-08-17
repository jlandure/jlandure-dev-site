Published in [Zenika](https://medium.zenika.com)

May 26, 2020

3 min read

# Crafting the perfect container to play with a Headless Chrome

Since July 30th 2017, I have been contributing to a side project: the idea from the beginning was the ability to use Chrome to make some tests in headless mode and avoid a long queue of CI builds using a [tiny Docker image](https://github.com/Zenika/alpine-chrome).

# 🤔 Why use a Headless Chrome

In the world of web development, the ability to run quickly end-to-end tests are important. Popular technologies like Puppeteer enable developers to make fun things like testing, automating forms, crawling, generating screenshots, capturing timeline… And there is a secret: some of these features are directly available on Chrome! 🙌

For more information on why headless mode is a cool feature, please read a good example on [what you can achieve with this post](https://dev.to/reverentgeek/convert-text-html-to-pdf-with-node-js-and-puppeteer-4c53).

# 💡 Crafting the perfect container

With 28 contributors, I have been working on this project to create the perfect image to run Chromium in Headless mode:

*   📦 Tiniest Headless Chrome ([393 MB](https://github.com/Zenika/alpine-chrome#image-disk-size))
*   🐳 Easy to use, ephemeral and reproducible Headless Chrome with Docker
*   📝 Doc-friendly with examples for printing the DOM, generating an image with a mobile ratio or generating a PDF.
*   👷‍♂️ Autobuild with the [Docker Hub](https://hub.docker.com/repository/docker/zenika/alpine-chrome) to sync the project and ship the images with confidence
*   📌 Up-to-date with Chromium 81 (81.0.4044.138) and tags available to test different versions of Chromium
*   🔐 Secure with the best way to use Chrome and Docker — [See “3 ways to securely use Chrome Headless” section](https://github.com/Zenika/alpine-chrome#3-ways-to-securely-use-chrome-headless-with-this-image)
*   🌐 Ready for internationalisation use: support for asian characters — [See “screenshot-asia.js” file](https://github.com/Zenika/alpine-chrome/blob/master/with-puppeteer/src/screenshot-asia.js)
*   💄 Ready for design use: support for WebGL — [See “How to use with WebGL” section](https://github.com/Zenika/alpine-chrome#how-to-use-with-webgl)
*   📄 Open Source with an Apache2 licence
*   👥 Community-built with 28 contributors — [See “✨ Contributors” section](https://github.com/Zenika/alpine-chrome#-contributors)
*   💚 Dev-friendly with examples using NodeJS, Puppeteer, docker-compose and also a test with a X11 display — [See “Run examples” section](https://github.com/Zenika/alpine-chrome#run-examples)

# 💚 Open Source & Fun

Some open source & fun projects have been set up and used for this open source side project. I want to share it with you: it adds value and confidence to maintain a GitHub repository. 👌

*   Updates to follow the [recommended community standards](https://opensource.guide/) from the GitHub community profile
*   [Gitmoji](https://gitmoji.carloscuesta.me/) for commit messages _where I have contributed in the past_ 😊
*   [All Contributors](https://allcontributors.org/) to thanks everyone who contributes to the project
*   Inspiration from [readme-md-generator](https://github.com/kefranabg/readme-md-generator) made by my friend [Franck Abgrall](https://dev.to/kefranabg)
*   Inspiration from this cheatsheet on [“How to promote your open-source project?”](https://dev.to/kefranabg/cheat-sheet-how-to-promote-your-open-source-project-4flh)
*   [Renovate](https://renovate.whitesourcesoftware.com/) for dependency updates
*   Many reads on dev.to to know what web developers are doing with Chrome and Puppeteer

# 🚀 Reaching a point

Here is the most interesting insight for a tool: to be used and useful! In almost two weeks, this image will be pulled on the [Docker Hub](https://hub.docker.com/repository/docker/zenika/alpine-chrome)…

🎉 **a million times**! 🎉

_there is currently ~922k downloads and it grows ~6k by day_  
On [GitHub](https://github.com/Zenika/alpine-chrome), the repository gets ~3000 views, ~1000 unique visitors every two weeks and ~464 stars.

After 3 years maintaining it, I cannot thank everyone using this container. This is the first time a side project has become so popular.

# 🗓 The Future

✨ Here is some features in the roadmap:

*   `with-playwright` version with [Playwright](https://playwright.dev/) to reuse the installed headless Chromium ([PR in draft](https://github.com/Zenika/alpine-chrome/pull/85))
*   `with-deno` version with [Deno](https://deno.land/) to create a useful and fun things to do with deno
*   `with-lighthouse` version with [Lighthouse](https://developers.google.com/web/tools/lighthouse/) to be able to monitor your website performance in CI builds
*   Create a dedicated homepage and documentation website: the [README.md](https://github.com/Zenika/alpine-chrome/blob/master/README.md) begins to be complicated to navigate and update
*   Create a gallery with the name of the project or product using this container

📣 Please test this container or play with it!  
💻 If you are interested to help me maintain this image, we are welcome! _There is some “Good first issue” labelled issue on the repository._

<figure class="na nb nc nd gy ne gm gn paragraph-image">![](https://miro.medium.com/max/1400/1*HcdeRgbAIJPzL5BGIG0uTA.png)</figure>

_Disclaimer: these terms in this post are synonyms: “Chrome” vs “Chromium” and “image” vs “container”._