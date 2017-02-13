# WDI_PROJECT_2
Project 2 with Google Maps 

This is my second project from my Web Development Immersive course at General Assembly. The task was to build a fully functional web app using Google Maps and an external API to plot markers onto the map. I decided to use Unsplash.com's API to plot some of their high resolution pictures onto Google Maps relative to where the pictures were taken. 

![alt text](http://i.imgur.com/tSk1S4Z.png "global photos home page") 

![alt text](http://i.imgur.com/AYQMRvC.png.png "global photos register page") 

![alt text](http://i.imgur.com/tsGB84a.png "global photos map") 

###What was used 

To build the site I utilised HTML5, CSS, SCSS, Javascript, JQuery, nodeJs, Express, Bootstrap, Mongo. 

###Approach to building the game

I started by setting up the express app and building a small database using the external API as I was only able to make a limited number of requests to the external API every hour. I also set up authentications around my API.

I then continued with the front end of the app and started off by setting up Google Maps and plotting the pictures from my database on the map. After this I set up authentications around the front end of the app so that users can only view the map after they have logged in and added features to only call on 10 database items at any one time then using a button to add another 10 or refresh the existing ten. I finished by adding and perfecting some of the design.

###Wins 

For the most part I was able to quickly and effectively organise and put the code together to create the back end and API. 

I am quite happy with the simplicity of the design as it puts more emphasis onto the high resolution photos.  

###Challenges faced 

One of the challenges I initially faced was the fact that it was a new exprience working with an external API. After doing a little bit of research and taking time to understand how external APIs work however, I was able to get it all running smoothly. 

###Future plans for the site

In the future I hope to:

Add the ability to add comments and likes to different photos. 

Make the site responsive to other devices and browser sizes. 

Add the ability to post your own pictures onto the site. 