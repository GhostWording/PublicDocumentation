## User Actions

An action is event that you can notify the server attached to an entity (an intention, a text...). 
It's an optimized API for posting small chunchs of information about what's happening in your app.
The format is the following:

    GET http://api.cvd.io/userevent?{querystring}

where `{querystring}` contains these key/values:

- **ActionType** : stores the user action : click, ...
- **ActionLocation** : where the action is initiated on your app (MenuBar, SplashScreen, TextDetailView, TextList, IntentionList,.....)
- **TargetType** : this describes the intention of the user action. It may be Area / Intention / Text / Navigation / Command 
(such as filter, profile or language buttons)
- **TargetId** :
    - for areas, intentions and texts : their id,
    - for navigation : a chosen name for the target (GeneralArea, ImportantArea, RecipientList)
    - for commands : the id of the property they are targeting (like Gender - Male, Age - over45,...)
- **TargetParameter** : additional value given in the context of the call for a target
- **AreaId**
- **ClientTime**

Some additionnal parameters will be grabbed from query directly (and should not be passed):

- UserId : logged user or anonymous unique Id (stored in cookies)
- UserAgent : we'll get it from headers
- ServerTime : affected when recorded on the server

A few other things that define the user profile will also be stored but via a another dedicated interface:

- Genre
- PreferedCulture
- CampainType
- CampainId
- CampainUrl
- Properties(Key value strings)

For exemple:

    GET http://api.cvd.io/userevent?ActionType=click&ActionLocation=TextList&TargetType=text&TargetId=123456&areaId=1234

Which means that you're notifying the server that the user (which id is sent by cookies) is doing the action 
`Click on the text with id [123456]`.

If it succeed, the server will notify you with an HTTP Status code 

    200 OK
    
    
