[![Used languages](https://skillicons.dev/icons?i=js,html,css,figma)](https://skillicons.dev)

<br>

### 🐛 Found a bug? Let me know with an issue! 🐛

<br>

### Make sure to check out the branches for the latest version.

<br>

### Table of contents
- [📖 Sleepy Dragon, A Single Page App for short stories. 📖](#-sleepy-dragon-a-single-page-app-for-short-stories-)
    - [🪪 Businesscard 🪪](#-businesscard-)
    - [📱 Single Page App 📱](#-single-page-app-)
    - [📋 Debrief 📋](#-debrief-)
    - [✔️ Personal goals ✔️](#️-personal-goals-️)
  - [👤 User story 👤](#-user-story-)
  - [🤔 Primary functions 🤔](#-primary-functions-)
  - [🐉 Mascot 🐉](#-mascot-)
    - [✏️ Mascot Design Sketches ✏️](#️-mascot-design-sketches-️)
    - [✏️ Mascot State Sketches ✏️](#️-mascot-state-sketches-️)
  - [📊 Flowchart 📊](#-flowchart-)
  - [🎞️ Wireframes 🎞️](#️-wireframes-️)
  - [📱 Prototype v1 📱](#-prototype-v1-)


<br>
<br>

# 📖 Sleepy Dragon, A Single Page App for short stories. 📖

Sleepy Dragon is a mobile single page app that fetches random stories from an API that can be read.

<br> 

This repository contains projects made for the minor Web Design & Development. This repository includes mainly two projects.

<br>
<hr>
<br>

### 🪪 Businesscard 🪪
You can view my businesscard using this link:
https://sasjakoning.github.io/Sleepy-Dragon-WAFS/visitekaartje

<br>

### 📱 Single Page App 📱
The single page app is the main project of this repository. The coming sections in this readme all involve the Single Page App.

<hr>
<br>
<br>

### 📋 Debrief 📋

During three weeks of the course Web App From Scratch, I will design and develop a Single Page App(SPA) based on a self-chosen user story. This SPA will be based on data fetched from an API.

I will design, build and test a prototype in at least three iterations. I will write this SPA in vanilla HTML, CSS and JS and will avoid using frameworks and libraries. Micro libraries are allowed in necessary.

<br>

### ✔️ Personal goals ✔️

For this project I wanted to experiment with API's and go more in depth in using Rive for my project. I also want to store data in local storage so the SPA can remember certain things the user has done.

<br>
<hr>
<br>



## 👤 User story 👤

The user story I have chosen for this project is:

> "As a parent, I want to find random short stories to entertain my child before bedtime so I don't have to continuously search for new stories."

<br>

## 🤔 Primary functions 🤔

There are a few primary functions in this app. The user can:

- Read a random story
- Like/save a story
- Read a story that has been saved
- (optional) Use text to speech to have the story read to them
- (optional) Use a dark/light mode
- (optional) Use a search function to find a specific story

<br>

## 🐉 Mascot 🐉

The primary audience of this app is children. To make the app more fun and appealing to children, I have created a mascot for the app. The mascot is a dragon that is called Sleepy. The mascot is used in the logo and in the app itself.

<br>

### ✏️ Mascot Design Sketches ✏️

I made several sketches for the design of the mascot. I wanted the design to be appealing to children and to be fun. I also wanted the design to be simple and not too complex since I will be animating the mascot. I ended up going for a design that has more rounded shapes and a more friendly look.

<img src="images-readme/sketches-1.jpg" width="200">
<img src="images-readme/sketches-2.jpg" width="200">
<img src="images-readme/sketches-3.jpg" width="200">
<img src="images-readme/sketches-4.jpg" width="200">
<img src="images-readme/sketches-5.jpg" width="200">
<img src="images-readme/sketches-6.jpg" width="200">

<br>

After making sketches on paper i continued to make designs for the character digitally. I made sever iterations and continuously received feedback from fellow students.

<img src="images-readme/sketches-digital-1.jpg" width="400">
<img src="images-readme/sketches-digital-2.jpg" width="400">
<img src="images-readme/sketches-digital-3.jpg" width="400">
<img src="images-readme/sketches-digital-4.jpg" width="400">

Once I refined the design to my liking, I created several color variations of the mascot. I wanted to make sure that the mascot would be appealing to children and still be unique.

<img src="images-readme/sketches-digital-5.jpg" width="600">

<br>

### ✏️ Mascot State Sketches ✏️

Now that I had a design for the mascot, I made a few sketches where the character would pose for different states of the app. 

<img src="images-readme/sketch-dragon-empty.jpg" width="400">
<img src="images-readme/sketch-dragon-error.jpg" width="400">
<img src="images-readme/sketch-dragon-search.jpg" width="400">
<img src="images-readme/sketch-dragon-reading.jpg" width="400">

## 📊 Flowchart 📊

In order to get the structure and functionality of the app properly set up, I created a flowchart that show the different states and functions that can be used.

<img src="images-readme/flowchart.jpg">


<br>

## 🎞️ Wireframes 🎞️

I made several wireframes for the app. I wanted to make sure that the app was easy to use and that the user could easily find the functions they wanted to use.

<img src="images-readme/wireframes-1.jpg" width="200">

The sketches gave me a general idea of where I wanted the interface to go. For more detailed wireframes I used Figma. I made a wireframe for the home page, the story page, saved story page and several states of the app.

<img src="images-readme/wireframes-2.jpg">

<br>

## 📱 Prototype v1 📱

The first prototype has a very bare bones design where I only focus on the functionality of the app. There is a home page and a story page which has loading, error and succes states. There is also an extra page which warns the user that the app runs on Javascript, in case they don't have Javascript enabled.

<br>

There were a few things I was unfamiliar with or hadn't done before. I had never made a webapp before that runs on a single page but still "simulates" multiple pages by using hash routing. I started off coding this using normal `<button>`'s and assigning eventlisteners to them. Later on, I got thought to use `<a>` tags instead, which I applied in version 2 of the prototype.

<br>

I also discovered that there is a native way to use components in Javascript applying frameworks. This caught my interest and I decided to do more research on it. As it turned out, generally people use webcomponents and then apply bare text as html which sits inside the javascript file like so:

```javascript 
const template = document.createElement('template');
template.innerHTML = `
  <style>
    h1 {
      color: red;
    }
  </style>
  <h1>Hello World</h1>
`;
```
This however, defeated the purpose of using web components for me. I wanted to be able to use seperate HTML and CSS files for my components. I found a way to do this by using the `fetch()` function to get the HTML and CSS files and then applying them to the component. The code I used to do this is a little complex but comes down this: I create a variable that has the list of html templates that I want to insert. I run a function that fetches these files and create new components for each of them using names that are stated within the html files themselves. I can then append these to the DOM by simply using `document.createElement("template-name")`. In case there is content that needs to be inserted into the component, I can call these using `element.shadowRoot.querySelector( '[slot="slot-name"]');` and then insert the content using `element.textContent`.

<br>

I'm quite happy with what I learned about web components and how I applied them to this project. In practice I probably won't be using them as much as I did in this project, but it was a fun learning experience and gave me more understanding about how frameworks like React and Vue work.

<br>

This is what versioon 1 of the prototype looks like:

<img src="images-readme/v1.gif" width="200">



<!-- Add a link to your live demo in Github Pages 🌐-->

<!-- ☝️ replace this description with a description of your own work -->

<!-- replace the code in the /docs folder with your own, so you can showcase your work with GitHub Pages 🌍 -->

<!-- Add a nice poster image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- How about a license here? 📜 (or is it a license?) 🤷 -->
