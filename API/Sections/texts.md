## Quick tour
Get the texts is problably the first thing you'll want to do while working on a Ghostwording
application, let's take a quick tour.

Let's say you want find a message in order to excuse you while you're late, your language is English, simply
do the following query:

        GET http://api.cvd.io/DocDemo/I-am-late/texts
        HTTP HEADERS : [
            "accept" : "application/json",
            "accept-language" : "en-EN"    
        ]

You'll get in return an array of available texts like that:

        [
            {
            "TextId": "349714",
            "IntentionId": "9B2C8B",
            "IntentionSlug": "I-am-late",
            "IntentionPrototypeSlug": "I-am-late",
            "IntentionLabel": "I-am-late",
            "PrototypeId": "17D1CE",
            "Content": "The later I am, the more I think of you.  It probably works the other way around too :-)",
            "Author": "Thomas Fourquet",
            "Updated": "2014-05-23T11:56:00",
            "Created": "2014-05-23T11:56:00",
            "SortBy": 26,
            "Sender": "N",
            "Target": "N",
            "PoliteForm": "I",
            "Impersonal": "true",
            "Proximity": "P",
            "Abstract": null,
            "ReferenceUrl": null,
            "ImageUrl": null,
            "Culture": "en-EN",
            "TagIds": [
                "43AC3B",
                "47B7E9",
                "5D79C9",
                "7A55C6",
                "9E2D23",
                "AE098F",
                "C2D9A4",
                "FC0342"
            ],
            "IsQuote": false,
            "AvailableCultures": [
            "fr-FR"
            ],
            "Status": "published",
            "OtherRealizationIds": [
            "17D1CE",
            "63E041"
            ],
            "TagsString": "43AC3B,47B7E9,5D79C9,7A55C6,9E2D23,AE098F,C2D9A4,FC0342",
            "RealizationIdsString": "17D1CE,63E041",
            "CulturesString": "fr-FR"
        }, 
            // other texts here...
      ]

### **Let's understand what we did in detail **:


#### Http Headers

        [
            "accept" : "application/json",
            "accept-language" : "en-EN"    
        ]

You **must** provide the `accept` and `accept-language` http headers to all your requests. 

* The `accept` header defines here that you'll want the data in `json` format and 
* the `accept-language:en-EN` that you'll want the texts in english.


#### Url

       GET http://api.cvd.io/DocDemo/I-am-late/texts

Here as we want to express the `I'm late` idea in the message, we'll do the query to get the texts from
a group called `I-am-late`. 

Within Ghostwording these groups representing ideas are called **intentions**. 
__(the detail of the query is detailed on the next paragraphs)__

**Note** that you'll **always** query the api for the texts within **one intention**, a text always expresses only one 
idea (and then belongs to only one intention).   

In the first part of the path of the query, you have `DocDemo` this part is used to identify
your application, called `area`, this one is given to you by our admin. Each area have a predefined
list of intentions (see intention page for more details).
   
#### the texts properties

The main properties you'll need to care for each text will be :

* `TextId` to identify the text and 
* the `Content` to be able to display the content. 
* You should also take care of `IsQuote` in order to display the text in a different way if the text 
is a know quote (and then read the `Author` property too to print the author name).

If you have multi-culture application, know that most of the texts are translated and available in English, French and Spanish 
with the respective culture codes `[en-EN],[fr-FR],[es-ES]`. In order to see if one text have it's translation
in another language, you can read the `AvailableCultures` property which is an array of cultures codes available
for the existing translations.   


In the next paragraph we'll see the different ways to get the texts and options.

 

## Get all texts for an intention

You'll always get the texts for one intention at a time, but you can call that intention in different ways:

* by its Id 
* by it's slug (a human readable id)

(please read [intentions documentation](intention.md) for more information about `Intention` properties).

Some options are also available:

Imagine you'll want to say hello and only want the texts that fit ok for your Mum, you'll
be able to get only the right texts by filtering your query.

For each type of query you'll get the same format: an array of texts with the properties defined in the introduction.


### By Id

You'll get the id of the intention within it's properties (named `IntentionId`).
 
The pattern for querying by id is the following:

    GET /{areaName}/intention/{intentionId}/texts
    
exemple:

    GET http://api.cvd.io/General/intention/BD7387/texts
    HTTP HEADERS : [
            "accept" : "application/json",
            "accept-language" : "en-EN"    
        ]


##### By intention Slug name

Using the slug is the most common use because it allows you to identify the intention
in an human readable way. You get the slug witin the `SlugPrototypeLink` property of the intention.

A query to get that will have the following form

    GET /{areaName}/{intentionSlug}/texts
    
exemple:
    
    GET http://api.cvd.io/DocDemo/I-would-like-to-see-you-again/texts
    HTTP HEADERS : [
            "accept" : "application/json",
            "accept-language" : "en-EN"    
        ]

#### By intention Slug and relation type

Let's say that you want a message to ask your mum `how are you?`.

First you'll need the configuration api defining the relation types that you'll find here 
[http://gw-static-apis.azurewebsites.net/recipients/RelationTypes.json](http://gw-static-apis.azurewebsites.net/recipients/RelationTypes.json).

From that configuration file, you'll find the needed properties for the Mother relation type:

        {
            "Id": "Mother",         
            "RecipientTypeTag": "64C63D", 
            "Gender": "F"
        }          

Here, the `RecipientTypeTag=64C63D` means `parent` which in combination with the `Gender=F`, Female, means `Mother`.

Then, you're now able to use the following query:

    GET /{areaName}/{intentionSlug}/{RecipientTypeTag}/texts?relationtgender={gender}
    
for our exemple:

    GET http://api.cvd.io/DocDemo/how-are-you/64C63D/texts?relationtgender=F
    HTTP HEADERS : [
            "accept" : "application/json",
            "accept-language" : "en-EN"    
        ]

## Other APIs

### Get only one text

Sometimes you may have stored the list of texts localy and only need to reload one text properties from the server.
You can use the following query to get one text only, by it's Id and for one culture:

    GET /{areaName}/text/{textId}

exemple:

    GET http://api.cvd.io/DocDemo/text/014E19
    HTTP HEADERS : [
            "accept" : "application/json"  
        ]

Note that here you don't need to provide the culture as the id is for one text in it's language.


### Get all versions of a Text

A text can have different variations and translations. Within the text properties, you'll
have an id called `PrototypeId` that identify all the versions of one text. If you want to 
get all these versions you can use the following query:

    GET /{areaName}/text/realizations/{prototypeId}
    
exemple:
    
    GET http://api.cvd.io/DocDemo/text/realizations/014E19


### Get a special list of texts

If you need to do a quizz for exemple and use only a specific list of texts, you can get
them from the APIs by providing the list of their prototype ids (and culture):

    GET /{areaName}/text/prototypes/{prototypeIds-list}/realizations
    
exemple:

    http://api.cvd.io/DocDemo/text/prototypes/0BEE10,6286F2,41ADDF/realizations
    HTTP HEADERS : [
            "accept" : "application/json",
            "accept-language" : "en-EN"    
        ]


## Detailed text properties definition

This is a full description of the properties of a text you'll get when calling the APIs

* "TextId": unique identifier for the text (in that specific version and culture),
* "IntentionId": the id of the intention the text belongs to,
* "IntentionSlug": the slug of the intention the text belongs to for the corresponding culture,
* "IntentionPrototypeSlug": the slug of the intention the text belongs to for all cultures,
* "IntentionLabel": the label of the intention it belongs to in the text culture,
* "PrototypeId": the id that allows you to find the other versions of the text,
* "Content": the text,
* "Author": this is the name of the person who wrote the text, you don't need to care if it's not a well known author and if the text is not identified as a quote (IsQuote property),
* "Updated": the date of the last modification of the text,
* "Created": the date when the text was created,
* "SortBy": an internal sort number to allow us to sort the texts that better fit within the intention context,
* "Sender": the type of the person that can send the text (*),
* "Target": the type of the person that can be the recipient of the text,
* "PoliteForm": the type of the polite form (in some languages the use of You is different depending on the polite form),
* "Impersonal": true if the text does't implies a gender or context and can be send in without any conditions (like a facebook status for exemple),
* "Proximity": this defines the style (a text won't be the same if you write to a friend or to your boss),
* "Abstract": some longer texts may have a short description,
* "ReferenceUrl": if the text is a quote with a reference in the internet you'll may find the url here,
* "ImageUrl": some texts may have an image attached that illustrates perfectly the idea of the text, you'll find the url here,
* "Culture": the language of the text,
* "TagIds": a list of tags qualifying the text (*),
* "IsQuote": true if the text is a quote from a well known author,
* "AvailableCultures": a list of cultures in which the text is translated,
* "Status": publication status of the text (should always be **published**, other values are only for internal use),
* "OtherRealizationIds": the ids of the other versions of the text

**(*)** additional information will be available later.