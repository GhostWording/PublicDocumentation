## User Actions

A User action is an event that you produce in order to notify the server about what happend in your app.
That event is composed by an entity (an intention, a text...) and a user action (click, swipe, select...).

_If you want to cache the events locally and send them after a while in a batch to the server, it's also possible, please see [the batch section](#batch) below_

It's an optimized API for posting small chuncks of information about what's happening in your app.
The format is the following:

    GET http://gw-usertracking.azurewebsites.net/userevent?{querystring}

where `{querystring}` contains these key/values:

- **ActionType** (*): Thetype of user action : Click, Swipe, SendSMS, SendMail, RefreshTexts, ...
- **TargetType** : For UI events it can be Text, Image, Intention (= a text category), Command (anything else). For non UI events (such as app being launched of loosing focus) is will be App.
- **TargetId** (*):
    - for texts, images or intentions : their Id (or their name if they don't have an id)
    - for commands : the id of the button or control being pressed (example : LanguageButton, GenderButton, AgeButton). This id is local to each app.
- **TargetParameter** : additional values  ('fr-FR', 'Male', '18 to 39')
- **ActionLocation** (*): where the action is initiated on your app : Splash, Tutorial, MainScreen, TextDetailView, TextList, IntentionList,.....)

(*) See [Values](#values) paragraph below to check the kind of values you can have

- **AreaId** : the name of your app
- **ClientTime** : the time get from the client side
- **DeviceId** : An identifier of the user device that you affect from your app
- **RecipientId** : complementary information about the current recipient used (if needed)
- **LanguageCode** : the abreviated culture used by the user in the app (fr,en,es...)
- **FacebookId** : if the user is logged with Facebook within your app, you should setup he's facebook id here
- **ExperimentId** : the Id of the experiment for A/B testing
- **VariationId** : the version/id of the experiment
- **IsNewInstall** : boolean value(**true** or **false** and not 1 or 0) indicating if userevents came from a variation from a fresh install (or false if user had already re-installed the app)

The key/values below are mandatory because they are key discriminatory factors for analysis:
- **VersionNumber** : each time you build and publish your app, you have to increase your application version number, this allows us to control and check how people is using the apps depending on version updates
- **OsType** : because we have some identical apps (with same AreaId) in different platforms, it is necessary for us to know what's platform it is:
    - Android
    - iOS
    - web

Some additionnal parameters will be grabbed from query directly (and should not be passed):

- **UserId** : logged user or anonymous unique Id (stored in cookies)
- **UserAgent** : we'll get it from headers
- **ServerTime** : affected when recorded on the server

For exemple:

    GET http://gw-usertracking.azurewebsites.net/userevent?ActionType=click&ActionLocation=TextList&TargetType=text&TargetId=123456&areaId=1234&VersionNumber=1.23&OsType=web

Which means that you're notifying the server that the user (which id is sent by cookies) is doing the action 
`Click on the text with id [123456]`. He's doing that on the version `1.23` of the `Web` app.

If it succeed, the server will notify you with an HTTP Status code 

    200 OK

## Send a Batch of multiples values
<a name="batch"/>
This same api is accessible by `POST` in order to be able to publish a batch of locally cached user events.
You have to provide a raw application/json body with an array of userevents with the same fields than in the `GET` api:

    POST http://gw-usertracking.azurewebsites.net/userevent/batch
    
    [
        {"ActionType":"someType","ActionLocation":"someLoc",...},
        {"ActionType":"someType","ActionLocation":"someLoc",...},
        {"ActionType":"someType","ActionLocation":"someLoc",...},
    ]

If it succeed you'll get an `OK` http code with a json indicating the number of events received and the number of events saved :

    200 OK
    {"saved":3,"totalReceived":3}
    
In case of problem, you'll get `Bad Request` http code with a response containing error message, and save status:

    400 Bad Request
    {
      "message": "tracking error:err while saving",
      "totalEventsReceived": 5,
      "totalSavedEvents": 2,
      "serverTime": "2016-01-12T10:31:33.6518506Z"
    }

### Time

As you are sending events in a batch, we can't use anymore the ServerTime for timestamping the events, that means that client time is much more important now and mandatory. That means that you **must** provide client time in **UTC** format for the server to be able to analyse the events in a proper and common way. 

you should also add an additional time stamp for the moment you're sending the events to the server. You can do that by adding a `Date` property in the http headers:

    { "date":"2016-01-12T10:31:33Z"}
    
### Real world exemple:

Post:

    POST http://gw-usertracking.azurewebsites.net/userevent/batch
    Headers : [  { "date":"2016-01-12T10:31:33Z"}]
    body:
    [
        {"ActionType":"AppLaunch","ActionLocation":"Home","TargetType":"Init","TargetId":"Page","TargetParameter":null,"AreaId":"cvdWeb","UserId":null,"DeviceId":"4e115472","RecipientId":null,"LanguageCode":"fr","ClientTime":"2016-01-11T15:56:57.2233538Z","ServerTime":"2016-01-11T15:56:10.2823515Z","FacebookId":2,"VersionNumber":1,"OsType":null,"ExperimentId":3,"VariationId":4,"IsNewInstall":true}
        ,    {"ActionType":"Click","ActionLocation":"home","TargetType":"Init","TargetId":"Page","TargetParameter":null,"AreaId":"cvdWeb","UserId":null,"DeviceId":"4e115472","RecipientId":null,"LanguageCode":"fr","ClientTime":"2016-01-11T15:56:57.2233538Z","ServerTime":"2016-01-11T15:56:20.2823515Z","FacebookId":2,"VersionNumber":1,"OsType":null,"ExperimentId":3,"VariationId":4,"IsNewInstall":true}
        ,    {"ActionType":"Swipe","ActionLocation":"MainScreen","TargetType":"Init","TargetId":"Page","TargetParameter":null,"AreaId":"cvdWeb","UserId":null,"DeviceId":"4e115472","RecipientId":null,"LanguageCode":"fr","ClientTime":"2016-01-11T15:56:57.2233538Z","ServerTime":"2016-01-11T15:56:23.2823515Z","FacebookId":2,"VersionNumber":1,"OsType":null,"ExperimentId":3,"VariationId":4,"IsNewInstall":true}
        ,    {"ActionType":"Swipe","ActionLocation":"MainScreen","TargetType":"Init","TargetId":"Page","TargetParameter":null,"AreaId":"cvdWeb","UserId":null,"DeviceId":"4e115472","RecipientId":null,"LanguageCode":"fr","ClientTime":"2016-01-11T15:56:57.2233538Z","ServerTime":"2016-01-11T15:56:30.2823515Z","FacebookId":2,"VersionNumber":1,"OsType":null,"ExperimentId":3,"VariationId":4,"IsNewInstall":true}
        ,    {"ActionType":"Send","ActionLocation":"MainScreen","TargetType":"Init","TargetId":"Page","TargetParameter":null,"AreaId":"cvdWeb","UserId":null,"DeviceId":"4e115472","RecipientId":null,"LanguageCode":"fr","ClientTime":"2016-01-11T15:56:57.2233538Z","ServerTime":"2016-01-11T15:56:40.2823515Z","FacebookId":2,"VersionNumber":1,"OsType":null,"ExperimentId":3,"VariationId":4,"IsNewInstall":true}
    ]

Response:

    200 OK
    {"saved":5,"totalReceived":5}

## Host

The Host that you must use for user tracking is `http://gw-usertracking.azurewebsites.net/` but in case you have troubles accessing the site (for cross domain reasons), you can also use `http://api.cvd.io` with the same paths. This one is the main api site and the user tracking requests are proxied to the tracking web site, it works fine but we should avoid or at least minimize tracking traffic on main apis website.


## Values
<a name="values"/>

These are typical values for actions and targets (but not exclusive):

|ActionType values	| ActionLocation values	| TargetId          |
|:-----------------:|:---------------------:|:-----------------:|
| Init	            | Splash	            | [TextId]          |
| AppLaunch	        | Tutorial              | [ImageName]       |
| AppFocus	        | MainScreen            | [LanguageId]      |
| Click	            | UserProfile	        | [ButtonName]      |
| SendSMS	        | IntentionList	        |                   |
| SendMail          |                       |                   |  		
| SendMessenger     |                       |                   |
| Send              |                       |                   |		
| FacebookShare     |                       |                   |
| RefreshTexts      |                       |                   |
| RefreshImages     |                       |                   |
| Swipe             |                       |                   |		

## Real world captured values
here is a small capture from our database of real events in order to ensure the kind of data we care:

![user events](https://cloud.githubusercontent.com/assets/212965/11058239/bcbeb128-8791-11e5-9b24-798538b2face.png)
