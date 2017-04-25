# Ideas of the day

The principle of the ideas of the day is to get new popular-random text-image cards, the ideas, for the intentions you want to express for the people you want to.
These ideas are great things to push up front in your application when a user starts.

You can actually get theses ideas in different ways:

* [get cards for a predefined selection of intentions](#ByIntention):
  * [http://api.cvd.io/popular/TestArea/IdeasOfTheDay/ByIntention](http://api.cvd.io/popular/TestArea/IdeasOfTheDay/ByIntention)
* [get cards for some recipient](#ForRecipient) (and the usual intentions associated with this recipient):
  * [http://api.cvd.io/popular/MyAppName/IdeasOfTheDay/forRecipient/Mother](http://api.cvd.io/popular/MyAppName/IdeasOfTheDay/forRecipient/Mother)
* [get cards for a recipient and an intention](#ForIntentionAndRecipient)
  * [http://api.cvd.io/popular/MyAppName/IdeasOfTheDay/forRecipient/Mother/andIntention/030FD0](http://api.cvd.io/popular/MyAppName/IdeasOfTheDay/forRecipient/Mother/andIntention/030FD0)
* [get cards for a recipient and an area name](#ForIntentionAndArea)
  * [http://api.cvd.io/popular/MyAppName/IdeasOfTheDay/forRecipient/Mother/andArea/TestArea](http://api.cvd.io/popular/MyAppName/IdeasOfTheDay/forRecipient/Mother/andArea/TestArea)
  
    
  
  
  
  
  
<a name="ByIntention">

## By Intention

 
 By default you'll get one card suggestion by intention for the predefined list of intentions for the Ideas of the Day (you can get the list
 at [http://api.cvd.io/IdeaOfTheDay/intentions](http://api.cvd.io/IdeaOfTheDay/intentions).
 
 
### Endoint:
 
    GET http://api.cvd.io/popular/{areaName}/IdeasOfTheDay/ByIntention?{options}
    
### Definitions:

Path:

* areaName : the name of the area (used to define the group of intentions you're looking for)

**note**: if you specify a wrong area name, you'll still receive ideas from a "fallback" area

    
Options: 

* culture : string, 'en-EN' | 'fr-FR' | 'es-ES', by default the culture will be automatically picked from the http headers
* nbcards : int, the number of cards ideas to return for each intention, 1 by default
* _refresh: when set to true, it avoids the cache and forces a refresh (this is only for test purposes and must not be used in the apps)_
* deviceid: the device id of the user doing the request (not used actually but it will in the future to get more accurate suggestions for the user)
* version: a number in the range [1..10], it allows you to get different sets of cards
 
Response:

* array of [cardIdea](#ObjectDefinitions)
Notes:

This api is available through your browser to have a better looking of the cards than in a json api.



<a name="ForRecipient">

## For recipient


This api will get you some ideas of things to say to someone, targeting a recipient you define in parameter. You may also provide the gender
of the current user asking for ideas in order to get even more accurate ideas.

exemple, assuming I'm a man, I want new ideas to say something to my mum in french, give me 3 ideas for each intention:

    GET http://api.cvd.io/popular/MyAppName/IdeasOfTheDay/forRecipient/Mother?culture=fr-Fr&senderGender='M'&nbcards=3
    Resonse:  array of [cardIdea](#ObjectDefinitions)
    
### Endoint:
 
    GET http://api.cvd.io/popular/{appName}/IdeasOfTheDay/forRecipient/{recipient}?{options}
    
### Definitions:

Path:

* area : string, the name of your app (not relevant for the search, we only look for ideas for intentions associated with the recipient)
* recipient : string, a recipient name. you'll find a full list of recipients with their intentions here : [http://api.cvd.io/popular/MyAppName/IdeasOfTheDay/intentionforrelations](http://api.cvd.io/popular/MyAppName/IdeasOfTheDay/intentionforrelations)
 
Options: 

* senderGender: string, the gender of the user requesting the ideas ('H'|'M'|'Male  or  'F'|'Female'), by default 'I' (unknown)
* culture : string, 'en-EN' | 'fr-FR' | 'es-ES'
* nbcards : int, the number of cards ideas to return for each intention, 1 by default
* _refresh: when set to true, it avoids the cache and forces a refresh (this is only for test purposes and must not be used in the apps)_
* deviceid: the device id of the user doing the request (not used actually but it will in the future to get more accurate suggestions for the user)
* version: a number in the range [1..10], it allows you to get different sets of cards

Response:

* array of [cardIdea](#ObjectDefinitions)
 

Notes:

This api is available through your browser to have a better looking of the cards than in a json api.


<a name="ForIntentionAndRecipient">

## For a specific recipient and intention

This api will get you some ideas of things to say to someone in a certain context, targeting a recipient and intention you define in parameter. You may also provide the gender of the current user asking for ideas in order to get even more accurate ideas.

exemple, assuming I'm a man, I want 3 new ideas to say good morning to my mum in french:

    GET http://api.cvd.io/popular/MyAppName/IdeasOfTheDay/forRecipient/Mother/andIntention/030FD0?culture=fr-Fr&senderGender='M'&nbcards=3
    Resonse:  array of [cardIdea](#ObjectDefinitions)
    
### Endoint:
 
    GET http://api.cvd.io/popular/{appName}/IdeasOfTheDay/forRecipient/{recipient}/andIntention/{intentionId}?{options}
    
### Definitions:

Path:

* appName : string, the name of your app (not relevant for the search, we focus on recipient+intention only)
* recipient : string, a recipient name. you'll find a full list of recipients with their intentions here : [http://api.cvd.io/popular/MyAppName/IdeasOfTheDay/intentionforrelations](http://api.cvd.io/popular/MyAppName/IdeasOfTheDay/intentionforrelations)
* intentionid : the id of the intention you want ideas
 
Options: 

* senderGender: string, the gender of the user requesting the ideas ('H'|'M'|'Male  or  'F'|'Female'), by default 'I' (unknown)
* culture : string, 'en-EN' | 'fr-FR' | 'es-ES'
* nbcards : int, the number of cards ideas to return for each intention, 1 by default
* _refresh: when set to true, it avoids the cache and forces a refresh (this is only for test purposes and must not be used in the apps)_
* deviceid: the device id of the user doing the request (not used actually but it will in the future to get more accurate suggestions for the user)
* version: a number in the range [1..10], it allows you to get different sets of cards

Response:

* array of [cardIdea](#ObjectDefinitions)
 
<a name="ObjectDefinitions">

### Response objects details:

- **CardIdea** : It defines the properties of the card you'll get as response:

     - "IntentionId": string, id of the intention expressed in the card
     - "PrototypeId": string, id of the prototype of the text
     - "TextId": string, id of the text
     - "Content": string, content of the text
     - "ImageName": string, name of the suggested image (a popular one for this text)
     - "ImageLink": string, image link
     - "Sender": string, can be ("H","F","I","N")
     - "Recipient": string, can be ("H","F","I","N")

      
<a name="ForIntentionAndArea">

## For a specific recipient and Area

TBD

get ideas for an area and filtered by recipients
