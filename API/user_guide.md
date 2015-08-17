# User Guide : How to build a simple Ghostwording app

This is a hands-on tutorial to explain the logic and main services of the Ghostwording API, it will guide through a simple web 
application that covers the principal services used. 

For the simplicity and shortness of the exemples we'll use Angular (v1) and you'll find links to the live sample on [jsbin](http://jsbin.com/judixa/) 
for each step.

_Ghostwording is a smart platform that provides ideas of texts and quotes for people depending on a context. That context is 
mainly identified by a category (called intention), which defines the type of intention you want to express with your text, 
your profile, the profile of the recipient of the text and a few tags defining more precisely the style of the text. For this 
tutorial, we'll cover the basics of retrieving texts by category which is the base of the navigation inside the apis._

## Setup the application


Start creating an html page with the angular and bootstrap imports, it will be the frame for our single page application:
```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta name="description" content="Ghoswording APIs simple but complete demo with application,intentions,texts and userevents">
        <script src="https://code.jquery.com/jquery.min.js"></script>
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <script src="https://rawgit.com/angular/bower-angular/master/angular.min.js"></script>
        <script src="https://rawgit.com/angular/bower-angular-resource/master/angular-resource.min.js"></script>
        <script src="gwdemo.js">
        <meta charset="utf-8">
        <title>My GhostWording Demo</title>
    </head>
      
    <body ng-app="gwDemo">
      <h1>Ghostwording Demo</h1>
      
    </body>
    </html>
```
In order to finish the setup we'll also create the angular module in the `gwdemo.js` file:

```javascript
    // ***************************************
    // Main
    // ***************************************
    var gwDemo = angular.module('gwDemo',['ngResource']);
    var appNameArea = 'DocDemo';
    var userLanguage = 'en-EN';

```


