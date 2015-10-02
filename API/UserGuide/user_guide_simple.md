# User Guide - Api calls for a simple Ghostwording app

The most common requests to the API involve getting a list of texts to express a given intention.

A simple example would be :
http://api.cvd.io/DocDemo/I-would-like-to-see-you-again/text

If you type the above urlabout in your browser it will display an arror because our API returns json files, not HTML files. 
You  need to set the http headers of your GET request to
     "Accept" : "application/json",
     "Accept-Language" : "en-EN"  //to get a list of texts in English
You can try that from any Rest Client such as Postman (www.getpostman.com)

In http://api.cvd.io/DocDemo/I-would-like-to-see-you-again/text
"I-would-like-to-see-you-again" is the slug of the intention for which you request texts
"DocDemo" is the name of your application. We call it an area name.

For the "Le bout des lèvres" the area name is "LipTip" so if you want to get texts to say I like you for this application you would send this request :
GET http://api.cvd.io/LipTip/I-like-you/texts

In order to build a Ghostwording application (or area) and get the texts you want, you'll need to get first some intentions (the categories of the content you 
want to express) and then get the texts for each one.

For the purpose of this exemple, we'll use an area called `DocDemo`. This area is defined for you by the Ghostwording editors, 
and it's basically the name of your app with the categories you can see attached to it (the intentions).

Note that all Ghostwording api calls are culturized. That means that you need to provide an appropriate `Accept-Language` header 
in all your calls. Accepted values are actually `["en-EN","fr-FR","es-ES"]`

Note also that actually the only format supported by the api is json, which means you need to provide the `Accept` header with
the value `application/json`.

So, the hierarchy for your calls in order to get the texts will be `area > intentions > texts`. We'll see then how to post some
activity for tracking.

## first, get Intentions

The pattern to get the list of the intentions for your area is the following:

     GET /{area-name}/intentions

That is for our demo application:

     GET http://api.cvd.io/DocDemo/intentions
   
With headers: 

    [
     "Accept" : "application/json",
     "Accept-Language" : "en-EN"  //this could be other culture
    ]

you'll get an array of intentions like that:

    [
      { "AreaId":"311030","SortOrderInArea":10,"HasImage":true,
        "ImagePath":"http://gw-static.azurewebsites.net/specialoccasions/I-would-like-to-see-you-again/default/small/10858608_639812122796728_3920700375064563436_n.jpg",
        "IntentionId":"BD7387","UpdateDate":"2015-02-24T19:21:59.917","SortOrder":4,"MediaUrl":null,
        "Culture":"en-EN","Description":"Vous avez envie de revoir cette femme, cet homme, dites-lui!",
        "Labels":[
            {"IntentionId":"BD7387","Culture":"en-EN","Label":"I would like to see you again","Slug":"I-would-like-to-see-you-again"},
            {"IntentionId":"BD7387","Culture":"es-ES","Label":"quisiera-volver-a-verle","Slug":"quisiera-volver-a-verle"},
            {"IntentionId":"BD7387","Culture":"fr-FR","Label":"J'aimerais vous revoir","Slug":"j-aimerais-vous-revoir"}],
        "Slug":"I-would-like-to-see-you-again","SlugPrototypeLink":"I-would-like-to-see-you-again",
        "Label":"I would like to see you again","MostRecentTextUpdate":"2015-01-30T14:46:42","MostRecentTextUpdateEpoch":1422629202,
        "WeightingCoefficient":100,"Recurring":"false","Impersonal":"false"},
      },  
      ...  
    ]

## then, get the Texts 

After you'll get your intentions, you could get the corresponding texts. They use the following pattern:

      GET /{areaName}/{intentionSlug}/texts

The `{intentionSlug}` is a human readable id for the intention that you can find on the properties of each intention
returned by the `/{area-name}/intentions` api call.

That means, that for the intention `"I would like to see you again"`, you'll make a call like that (with the appropriate headers):


      GET http://api.cvd.io/DocDemo/I-would-like-to-see-you-again/texts
      HEADERS :
        [
          "Accept" : "application/json",
          "Accept-Language" : "en-EN" 
        ]

You'll get an array of texts for that intention like that:

    [
      {
        "TextId":"06A99A","IntentionId":"BD7387","IntentionSlug":"I-would-like-to-see-you-again",
        "IntentionPrototypeSlug":"I-would-like-to-see-you-again","IntentionLabel":"I-would-like-to-see-you-again",
        "PrototypeId":"014E19",
        "Content":"One, two, three, we're going to the woods, four, five, six we're going to pick cherries, seven, eight, nine, I'm going to kiss my woman.  Please excuse my style, but you make me feel twenty years younger.",
        "Author":"Franck Pelé","Updated":"2014-07-09T14:35:49.093","Created":"2014-05-07T20:37:03.94",
        "SortBy":1000,"Sender":"N","Target":"F","PoliteForm":"I","Impersonal":"false","Proximity":"I","Abstract":null,
        "ReferenceUrl":null,"ImageUrl":null,"Culture":"en-EN","TagIds":["3337EE","47B7E9","7A55C6","9E2D23","AE098F","FC0342"],
        "IsQuote":false,"AvailableCultures":["fr-FR"],"Status":"published","OtherRealizationIds":["014E19","1344F7"],
        "TagsString":"3337EE,47B7E9,7A55C6,9E2D23,AE098F,FC0342","RealizationIdsString":"014E19,1344F7","CulturesString":"fr-FR"
      },
      ...
    ]

## post user activity

There is a simple api to post user activity in order to analyse what is happening an be able to compute statistics to optimize
the texts sent to the users.

the pattern is :

    GET http://api.cvd.io/userevent?{querystring}
  
for exemple:

    GET http://api.cvd.io/userevent?ActionLocation=textList&ActionType=select&TargetId=06A99A&TargetType=text&areaId=DocDemo

where:

* ActionLocation = the place where the user did it's action (here a text list)
* ActionType = the type of the action the user did (here, a text select)
* TargetType = the type of object on which the action take place, here it's a text
* TargetId = the id of the target, here it's the id of the text selected
* AreaId = the name of your app

You'll get in return a `200 HTTP` code with an empty json object `{}`.


## Going further

Once you're familiar with that, you can continue with the [full tutorial with javascript live demo] (user_guide.md) or 
start reading the [full api documentation](../README.md)
