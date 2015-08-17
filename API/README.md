# Public API

First you should read the [User Guide](UserGuide/user_guide.md), it will show you the main APIs 
and concepts behind Ghostwording. If you need more details then you can dive into
the detailled sections of the API.

## User Guide

In this documument you will be guided to create a simple Ghostwording web application
that covers the main concepts:

  * use an area application
  * Get the intentions for your application (named DocDemo)
  * Get the texts for each intention
  * notify the user actions api for a selection of a text

Start reading [Here](UserGuide/user_guide.md).

## Sections

You'll find all the details of each key model of the api through it's dedicated page
(in order of importance):

The models : 

- [Areas](Sections/areas.md) : An area is a logical group of intentions, it is used 
to define an application or different areas in bigger applications.
- [Intentions](Sections/intention.md) : An intention is a thematic group of texts. A 
text, with all it's variations, only belongs to one intention.
- [Texts](Sections/texts.md) : A text projection is the content and meta data you'll 
show in your application. It's composed by a text prototype and text realizations 
(from a same text base you can have multiple variations based on sex, plurality or 
even style).
 
The resources : 

- [Static Resources](Sections/static-resources.md) : this api gives you access to 
some organized static content (mainly images) that you can use along with the texts. 
- [Store](Sections/store.md) : this api gives you access to a simplified key-value
store on the server to save/get your application data.
- [Tracking](Sections/useractions.md) : this api is available to save and track all
the user actions. It's used only for tracking and analysis purposes, not for saving 
application data.

