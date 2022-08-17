# [Replacing Google Cloud Endpoints with JAXRS Jersey](https://bazinga-unit.blogspot.com/2012/08/replacing-google-cloud-endpoints-with.html)

When I went to Google I/O, I followed the session on AppEngine Endpoints : "Building Mobile App Engine Backends for Android, iOS and the Web".  
When I came back to Nantes, I've took time to create my first app engine endpoint application. I used the [form](https://docs.google.com/spreadsheet/viewform?pli=1&formkey=dDQ5QXJPTVFjSUhubl9WOC04TS1zSGc6MQ#gid=0) to experiment this feature but I have no response from Google.  

Here is a summary of Google Cloud endpoints :  

[![](http://4.bp.blogspot.com/-Tg6Ge36nE6g/UCI5TydABpI/AAAAAAAAC8k/v6IfvuJ3UhE/s320/Screen%2Bshot%2B2012-07-13%2Bat%2B12.18.21%2BPM.png)](http://4.bp.blogspot.com/-Tg6Ge36nE6g/UCI5TydABpI/AAAAAAAAC8k/v6IfvuJ3UhE/s1600/Screen%2Bshot%2B2012-07-13%2Bat%2B12.18.21%2BPM.png)  
The endpoint feature works locally but when I deploy it, I have no api in the api console of my apps.  
I decided to move from endpoint to JAXRS with Jersey. The main idea is to keep the client code identical and replace the rest calls with Jersey.  

**1\. First project with Google Cloud Endpoints**  

I used the last Eclipse with the last GPE and AppEngine SDK. So here is my first end point : user management  

https://gist.github.com/jlandure/3176719

Here the web.xml :  

https://gist.github.com/jlandure/3176730

I started the server locally and I call : `http://localhost:8888/_ah/api/molkkyparty/v1/user` and I get the json result :  

https://gist.github.com/jlandure/3181134 

**2\. Replacement with Jersey**  

First, add some dependencies to your project `WEB-INF/lib` :  

https://gist.github.com/jlandure/3176805 

Then, I added all the dependencies in the classpath and use JAXRS annotations :  

https://gist.github.com/jlandure/3176721 

I also changed the web.xml to initialize the webapps with Jersey servlet :  

https://gist.github.com/jlandure/3176735

**3\. Tips : add the root "items" element in JSON**  

I added a new Class to simulate the root element in the list "items" :  

https://gist.github.com/jlandure/3176742

And finally, I used a new Provider to use my Wrapper Class to generate the items root element :  

https://gist.github.com/jlandure/3176744

I start the application and then call `http://localhost:8888/_ah/api/molkkyparty/v1/user` and get the same result.  

**4\. Next**  

I try to deploy it on app engine but it doesn't work with this url :  
`http://molkkyparty.appspot.com/_ah/api/molkkyparty/v1/user`  
But this works with  
`http://molkkyparty.appspot.com/api/molkkyparty/v1/user`  
with this web.xml `<url-pattern>/api/*</url-pattern>`.  

Obviously, Google blocks the `/_ah/` url.  
Finally, I didn't success to use the same client code (JS) because we need to suppress the /_ah/ url...  

**5\. And...**  

I wrote this article last week and I just received the invitation to join the "Endpoints Trusted Testers". YES !!!  

[![](http://3.bp.blogspot.com/-4mT0ujSIa_c/UCI5rCJepzI/AAAAAAAAC8w/LMmDOpE3654/s320/app.png)](http://3.bp.blogspot.com/-4mT0ujSIa_c/UCI5rCJepzI/AAAAAAAAC8w/LMmDOpE3654/s1600/app.png)  
