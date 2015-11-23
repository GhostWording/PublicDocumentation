## User Actions

A User action is an event that you produce in order to notify the server about what happend in your app.
That event is composed by an entity (an intention, a text...) and a user action (click, swipe, select...).

It's an optimized API for posting small chuncks of information about what's happening in your app.
The format is the following:

    GET http://api.cvd.io/userevent?{querystring}

where `{querystring}` contains these key/values:

- **ActionType** (*): Thetype of user action : Click, Swipe, SendSMS, SendMail, RefreshTexts, ...
- **TargetType** : For UI events it can be Text, Image, Intention (= a text category), Command (anything else). For non UI events (such as app being launched of loosing focus) is will be App.
- **TargetId** (*):
    - for texts, images or intentions : their Id (or their name if they don't have an id)
    - for commands : the id of the button or control being pressed (example : LanguageButton, GenderButton, AgeButton). This id is local to each app.
- **TargetParameter** : additional values  ('fr-FR', 'Male', '18 to 39')
- **ActionLocation** (*): where the action is initiated on your app : Splash, Tutorial, MainScreen, TextDetailView, TextList, IntentionList,.....)

(*) See [Values](#values) paragraph below to check the kind of values you can have

- **AreaId** : the id/name of the area you use to get your intentions, this is usually the name of your app
- **ClientTime** : the time get from the client side
- **DeviceId** : An identifier of the user device that you affect from your app
- **RecipientId** : complementary information about the current recipient used (if needed)
- **LanguageCode** : the abreviated culture used by the user in the app (fr,en,es...)
- **FacebookId** : if the user is logged with Facebook within your app, you should setup he's facebook id here

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

    GET http://api.cvd.io/userevent?ActionType=click&ActionLocation=TextList&TargetType=text&TargetId=123456&areaId=1234&VersionNumber=1.23&OsType=web

Which means that you're notifying the server that the user (which id is sent by cookies) is doing the action 
`Click on the text with id [123456]`. He's doing that on the version `1.23` of the `Web` app.

If it succeed, the server will notify you with an HTTP Status code 

    200 OK
    
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
