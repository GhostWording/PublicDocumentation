# Public API

First you should read the [User Guide](UserGuide/user_guide.md), it will show you the main APIs 
and concepts behind Ghostwording. When you'll need more details then you can dive into
the detailled sections of the API. You can instead read the [simplified version](UserGuide/user_guide_simple.md) of the user guide if you only want to get the syntax of the main apis calls.

## User Guide

In this documument you will be guided to create a simple Ghostwording web application
that covers the main concepts:

  * use an area application
  * Get the intentions for your application (named DocDemo)
  * Get the texts for each intention
  * notify the user actions api for a selection of a text

Start reading [Here](UserGuide/user_guide.md).

## API details

You'll find here the details of the available api. First have a look to the `Get the texts` section which is all you need to 
understand and get the texts for your apps, then continue with the `other stuff` section to understand complementary action and datas.

### Get the texts 

in order to get the texts you'll need to ask first for the intentions (categories) available for your application (area) and then you'll be able to ask for the texts of each intention with it's id (or slug):

- [Intentions](Sections/intention.md) : An intention is a thematic group of texts. A 
text, with all it's variations, only belongs to one intention.
- [Texts](Sections/texts.md) : A text is the content and meta data you'll 
show in your application. It's composed by a text prototype and text realizations 
(from a same text base you can have multiple variations based on sex, plurality or 
even style).


_In case your app manage multiple areas you should look this section to get them [Areas](Sections/areas.md)_


### Other Stuff

Here you'll find useful resources to complete your app:

- [Images](Sections/images_and_medias.md) : this api gives you access to 
the Ghostwording image repository that you can use along with the texts. 
- [Store](Sections/store.md) : this api gives you access to a simplified key-value
store on the server to save/get your application data.
- [Tracking](Sections/useractions.md) : this api is available to save and track all
the user actions. It's used only for tracking and analysis purposes, not for saving 
application data.
- [Configuration](Sections/configuration.md) : this api gives you acces to some configurations shared by all applications.



