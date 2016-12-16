__This is a pre-release documentation to open discussion on interfaces, nothing is functional actually__

# APIS for Messaging

these apis provide interfaces for users to send message cards (text+image) to other users and other related actions.

Index of end points:

* [User (woman|man) send a message to other user (woman)](#PostUserToUserMessage):
  * [x] POST http://api.cvd.io/messaging/{area}/usertouser/message
    - ex: http://api.cvd.io/messaging/stikers/usertouser/message

* [User (woman|man) get all her messages](#GetUserToUserMessages):
  * [x] GET http://api.cvd.io/messaging/{area}/usertouser/messages/forDevice/{deviceId}
    - ex: http://api.cvd.io/messaging/stikers/usertouser/messages/forDevice/f659161979f91172
  * [x] GET http://api.cvd.io/messaging/{area}/usertouser/messages/forFacebookid/{facebookId}
    - ex: http://api.cvd.io/messaging/stikers/usertouser/messages/forFacebookid/952942371481416

<!--
* [User (woman) get messages from bot to show along real messages](#GetBotToUserMessages):
  * [ ] GET http://api.cvd.io/messaging/{area}/bottouser/messages/forDevice/{deviceId}
     - ex: http://api.cvd.io/messaging/stikers/bottouser/messages/forDevice/f659161979f91172
  * [ ] GET http://api.cvd.io/messaging/{area}/bottouser/messages/forFacebookid/{facebookId}
    - ex: http://api.cvd.io/messaging/stikers/bottouser/messages/forFacebookid/952942371481416
-->

* [When a real user message is presented with a bot message](#GetUserChallengeMessagesAction):
  * [x] POST http://api.cvd.io/messaging/{area}/MessageAction/{action}/fordevice/{deviceId}
    * the message is shown to the user (action=viewed):
      - ex: POST http://api.cvd.io/messaging/stikers/MessageAction/viewed/fordevice/f659161979f91172
    * user choose her preferred message (action=preferredMessage):
      - ex: POST http://api.cvd.io/messaging/stikers/MessageAction/preferredMessage/fordevice/f659161979f91172
    * user guess which one is the bot message (action=isBotMessage):
      - ex: POST http://api.cvd.io/messaging/stikers/MessageAction/isBotMessage/fordevice/f659161979f91172
        

* [Get matching users list for a user](#GetSuggestedUsers)
  * [x] GET http://api.cvd.io/messaging/{area}/SuggestedUsers/fordevice/{deviceId}?max={number}
    - ex: http://api.cvd.io/messaging/stickers/SuggestedUsers/fordevice/30a2af95828b0eb2?max=10&showUsersWhoDoNotParticipate=yes
    
 
* [Get popular men leaderboards](#GetPopularMenLeaderBoards)
  * [ ] GET http://api.cvd.io/messaging/{area}/LeaderBoards/popular/men/fordevice/{deviceId}?max={number}
    - ex: http://api.cvd.io/messaging/stickers/LeaderBoards/popular/men/fordevice/30a2af95828b0eb2?max=10
    
* [Get popular women leaderboards](#GetPopularWomenLeaderBoards)
  * [ ] GET http://api.cvd.io/messaging/{area}/LeaderBoards/popular/women/fordevice/{deviceId}?max={number}
    - ex: http://api.cvd.io/messaging/stickers/LeaderBoards/popular/women/fordevice/30a2af95828b0eb2?max=10
    
* [Get status of my messages](#GetMyMessagesStatuses)
  * [x] GET http://api.cvd.io/messaging/{area}/SentMessagesStatus/{deviceId}?maxItems={maxItems}
    - ex : http://api.cvd.io/messaging/stickers/SentMessagesStatus/fordevice/30a2af95828b0eb2?max=10

    

<a name="PostUserToUserMessage">
Send User To User Message
----------------------------

### Description
A user (man) send a selected card (text+image couple) as a message to an other user (woman).

exemple:

    POST http://api.cvd.io/messaging/stikers/usertouser/message
    {
      "sender": {
        "deviceId":"30a2af95828b0eb2",
        "facebookId":"10153830470651564"
      },
      "recipient" : {
        "deviceId":"",
        "facebookId":"952942371481416"
      },
      "message": {
        "textId":"9BC6CA",
        "gender":"male",
        "type":"direct",
        "isUserCustom":false,
        "content":"",
        "imageName":"306043_10151330260424252_2113533977_n.jpg",
        "localTimestamp":1470150873
      }
    }
    
    result:
    HTTP 200 OK
    {
      "status":"saved",
      "messageId":"FF402256-5812-4F32-9BC8-45AE69BDD5AE"
    }
  
### Interface 

    POST http://api.cvd.io/messaging/{area}/usertouser/message
    BODY application/json
  
### Inputs

Path : 

* {area} : area name of the current application doing the call

Posted Body:

expected format is `application/json` with the folling form:

    {
      "sender": {
        "deviceId":string,
        "facebookId":string
      },
      "recipient" : {
        "deviceId":string,
        "facebookId":string
      },
      "message": {
        "textId":string,
        "gender":"male"|"female",
        "type":"game"|"direct",
        "isUserCustom":boolean,
        "content":string,
        "imageName":string,
        "localTimestamp":long
      }
    }

properties:

* __sender__ : id of the man sending the message. deviceid must be provided. facebook id should be provided if known.
* __recipient__ : id of the womand recipient of the message. facebook id should be provided, deviceid if known.
* __message__ : definition of the message to send.
  * __textid__: id of the choosen text (this must be the text id, not the prototypeid). if the message is completely created by the user (without a source text as a base of the message) then this can be left empty. 
  * __gender__ : gender of message sender, "male" or "female"
  * __type__ : context type of the message, can be "direct" for messages sent directly from one user to another or "game" if the message * __content__ : if the text is the original one, this can be empty. If the message was customized by the user then the new content must be specified here.
  * __isUserCustom__ : if the message was customized by the user then this should be set to `true`.
  * __imageName__ : the name of the image to send (only the name, not full path). If the image is a personal user picture then "UserImage" should be provided instead.
  * __localTimestamp__ : the datetime of the creation of the message

  
### Output

The result can be a success or a failure:

__success__:
the result sould be `OK` and contain the status `saved` and the Id of the saved message:

    HTTP 200 OK
     {
       "status": string,
       "messageId: string guid,
     }

    
__failure__:
the http status is anything but OK and the result should contain the error message:

    HTTP 400 BadRequest
    {
      "error":string
    }
  


<a name="GetUserToUserMessages">
Get all messages for a user 
----------------------------

### Description
A user (woman/man) get all messages sent by real users. Messages are typed as "direct" for the ones sent directly or "game" for the ones involved in the game. For each user message where type="game", there is also a bot message.

exemple:

    GET http://api.cvd.io/messaging/stikers/usertouser/messages/forDevice/f659161979f91172?start=2016-09-01
    
    result:
    HTTP 200 OK
    [
      {
       "sender": {
         "deviceId":"30a2af95828b0eb2",
         "facebookId":"10153830470651564"
       },
       "message": {
         "messageId":"1C318DA2-01F6-4ADF-A599-08DC129B92D6"
         "textId":"9BC6CA",
         "gender":"male",
         "type":"game",
         "isUserCustom":false,
         "content":"bla bla bla",
         "imageName":"306043_10151330260424252_2113533977_n.jpg",
         "timestamp":1470150873,
         "actions":[{ name="viewed",value="true"},{name="setIsPreferred",value="8D8D193E-C13D-4B76-8AA5-8744C23FDD39"}]
       },
       "botMessage": {
         "messageId":"8D8D193E-C13D-4B76-8AA5-8744C23FDD39"
         "textId":"AZERT",
         "content":"bla bla bla",
         "imageName":"306043_10151330260424252_2113533977_n.jpg"
       }
      },
      {
       "sender": {
         "deviceId":"30a2af95828b0eb2",
         "facebookId":"10153830470651564"
       },
       "message": {
         "messageId":"8D8D193E-C13D-4B76-8AA5-8744C23FDD39",
         "textId":"",
         "gender":"male",
         "type":"direct",
         "isUserCustom":true,
         "content":"hello world",
         "imageName":"306043_10151330260424252_2113533977_n.jpg",
         "timestamp":1470150800,
         "actions":[]
       }
      }
    ]
  
The pattern to get the messages would be:
- if the user has actually no messages within the app, ask for all messages
- if the user already have messages, take the date of the last message and provide it in the {start} parameter (ex: ?start='2016-09-01')
  
### Interface 

Get messages for a device:

    GET http://api.cvd.io/messaging/{area}/usertouser/messages/forDevice/{deviceId}?start={startdate}

Get messages for a facebook id:

    GET http://api.cvd.io/messaging/{area}/usertouser/messages/forFacebookId/{facebookId}?start={startdate}
 
these interface are equivalents, they only differ on the id used.


### Inputs

Path : 

* {area} : area name of the current application doing the call
* {deviceId} : device id of the current user doing the call
* {facebookId} : facebook id of the current user doing the call

QueryString:

* {start} : (optional) only return the messages after this date. format must be iso : 'yyyy-mm-dd'

### Output

The result can be a success or a failure:

__success__:
the result sould be `OK` and contain an array of messages for user

    HTTP 200 OK
    [
      {
        "sender": {
          "deviceId":string,
          "facebookId":string
        },
        "message": {
          "messageId":string,
          "textId":string,
          "gender":"male"|"female",
          "type":"game"|"direct",
          "isUserCustom":boolean,
          "content":string,
          "imageName":string,
          "timestamp":long,
          "actions":(string*string) array
        },
        "botMessage": {
          "messageId":string,
          "textId":string,
          "content":string,
          "imageName":string,
          "timestamp":long
        }
      }
    ]

properties:

* __sender__ : it should have at least the deviceId and if exists the facebook id (which should always be the case)
* __message__ : 
  * __messageId__ : the id of the message, this must be used for any communications involving the message (like [When a real user message is presented with a bot message apis](#GetBotUserChallengeAction))
  * __textId__ : id of the original text if it's not a user creation
  * __gender__ : gender of message sender, "male" or "female"
  * __type__ : context type of the message, can be "direct" for messages sent directly from one user to another or "game" if the message is sent in the context of the game
  * __isUserCustom__ : indicates if the user changed the content
  * __content__ : it always have the content of the message to avoid you to load the message by yourself with other api (while on POST interface you don't need it)
  * __imageName__ : name of the image used (you have to recompose the path by your self from static repository)
  * __timestamp__ : this is the timestamp from the server when saved
  * __actions__ : list of actions (name,value) already done with the message (from the [challenge actions](#GetUserChallengeMessagesAction)), this can be actually named ["viewed","setPreferred","setIsBot"]. the value property contains the id of the message for "setIsPreferred" and "setIsBot" and "true" for "viewed".
* __botMessage__ : when message is typed as "game", then there is a bot message generated to be presented along the original user message for the game (only one always the same, generated when the user message is saved)
  * properties : they are the same as the `message` minus the ones specific to the user not needed.

__failure__:
if the http status is anything but OK then the result should contain the error message:

    HTTP 400 BadRequest
    {
      "error":string
    }
  



<!-- 
<a name="GetBotToUserMessages">
Get bot messages for a user (woman)
----------------------------

### Description
A user (woman) get computed messages from the bot Huggy to present along the real user messages.

exemple:

    GET http://api.cvd.io/messaging/stikers/bottouser/messages/forDevice/f659161979f91172
    
    result:
    HTTP 200 OK
    [
      {
       "message": {
         "messageId":"1C318DA2-01F6-4ADF-A599-08DC129B92D6"
         "textId":"9BC6CA",
         "isBotGenerated":true,
         "content":"bla bla bla",
         "imageName":306043_10151330260424252_2113533977_n.jpg,
         "timestamp":1470150873
       }
      },
      {
       "message": {
         "messageId":"1C318DA2-01F6-4ADF-A599-08DC129B92D6"
         "textId":"9BC6CA",
         "isBotGenerated":true,
         "content":"bla bla bla",
         "imageName":306043_10151330260424252_2113533977_n.jpg,
         "timestamp":1470150873
       }
      }
    ]
  

  
### Interface 

Get messages for a device:

    GET http://api.cvd.io/messaging/{area}/bottouser/messages/forDevice/{deviceId}

Get messages for a facebook id:

    GET http://api.cvd.io/messaging/{area}/bottouser/messages/forFacebookId/{facebookId}
 
these interface are equivalents, they only differ on the id used.


### Inputs

Path : 

* {area} : area name of the current application doing the call
* {deviceId} : device id of the current user doing the call
* {facebookId} : facebook id of the current user doing the call


### Output

The result can be a success or a failure:

__success__:
the result sould be `OK` and contain an array of messages for user

    HTTP 200 OK
    [
      {
        "message": {
          "messageId":string,
          "textId":string,
          "isBotGenerated":boolean,
          "content":string,
          "imageName":string,
          "timestamp":long
        }
      }
    ]

Notes:

* there is no `Sender` property because it's always the same for the bot.

properties:

* __message__ : 
  * __messageId__ : the id of the message, this must be used for any communications involving the message (like [When a real user message is presented with a bot message apis](#GetBotUserChallengeAction))
  * __textId__ : id of the original text if it's not a user creation
  * __isBotGenerated__ : indicates that the message has been created by the bot
  * __content__ : it always have the content of the message to avoid you to load the message by yourself with other api (while on POST interface you don't need it)
  * __imageName__ : name of the image used (you have to recompose the path by your self from static repository)
  * __timestamp__ : this is the timestamp from the server when saved
    
__failure__:
if the http status is anything but OK then the result should contain the error message:

    HTTP 400 BadRequest
    {
      "error":string
    }
  
-->


<a name="GetUserChallengeMessagesAction">
When a real user message is presented with a bot message
----------------------------

### Description
This interface is a generic endpoint for the actions you can do when you present the messages to the users. The challenge message is always a combination of two messages shown to the user

exemple:
"the user saw the user and bot messages:"

    POST POST http://api.cvd.io/messaging/stikers/MessageAction/viewed/fordevice/f659161979f91172
    {
      "facebookId":"952942371481416",
      "firstMessage":"1C318DA2-01F6-4ADF-A599-08DC129B92D6",
      "secondMessage":"1C318DA2-01F6-4ADF-A599-08DC129B92D6"
    }
    
    result:
    HTTP 200 OK {}
  
"then user choose it's prefered message:"

    POST http://api.cvd.io/messaging/stikers/MessageAction/preferredMessage/fordevice/f659161979f91172
    {
      "facebookId":"952942371481416",
      "firstMessage":"1C318DA2-01F6-4ADF-A599-08DC129B92D6",
      "secondMessage":"1C318DA2-01F6-4ADF-A599-08DC129B92D6",
      "preferred":"1C318DA2-01F6-4ADF-A599-08DC129B92D6"
    }
    
    result:
    HTTP 200 OK {} 
  
"and finally try to guess which is from a bot:"

    POST http://api.cvd.io/messaging/stikers/MessageAction/isBotMessage/fordevice/f659161979f91172
    {
      "facebookId":"952942371481416",
      "firstMessage":"1C318DA2-01F6-4ADF-A599-08DC129B92D6",
      "secondMessage":"1C318DA2-01F6-4ADF-A599-08DC129B92D6",
      "isBot":"1C318DA2-01F6-4ADF-A599-08DC129B92D6"
    }
    
    result:
    HTTP 200 OK {} 
    
    
### Interface 

View messages:

    POST http://api.cvd.io/messaging/{area}/MessageAction/viewed/fordevice/{deviceId}
    BODY application/json
    BODY application/json
    {
      "facebookId":string,
      "firstMessage":string,
      "secondMessage":string
    }
    
Set preferred message:

    POST http://api.cvd.io/messaging/{area}/MessageAction/preferredMessage/fordevice/{deviceId}
    BODY application/json
    {
      "facebookId":string,
      "firstMessage":string,
      "secondMessage":string,
      "preferred":string
    }
    
Guess bot message:

    POST http://api.cvd.io/messaging/{area}/MessageAction/isBotMessage/fordevice/{deviceId}
    BODY application/json
    BODY application/json
    {
      "facebookId":string,
      "firstMessage":string,
      "secondMessage":string,
      "isBot":string
    }

### Inputs

Path : 

* {area} : area name of the current application doing the call
* {deviceId} : device id of the current user doing the call

Posted Body:

expected format is `application/json`, the properties could be the following:

* __facebookId__ : facebook id of the current userd doing the call
* __firstMessage__: the id of the first message presented to the user (order is from top to bottom and left to right)
* __secondMessage__: the id of the second message
* __preferredMessage__ : the id of the message the user prefer
* __isBot__ : the id of the message considered to be a bot



### Output

The result can be a success or a failure:

__success__:
the result sould be `OK` and contains nothing else than an empty object

    HTTP 200 OK
    {}

__failure__:
if the http status is anything but OK then the result should contain the error message:

    HTTP 400 BadRequest
    {
      "error":string
    }
  




<a name="GetSuggestedUsers">
Get a list of suggested user profiles for a user
----------------------------
   
### Description
A user get selected profiles to communicate with. This endpoint can also be queried with a browser to display a user friendly view of the results. 

exemple:

    GET http://api.cvd.io/messaging/stickers/SuggestedUsers/fordevice/30a2af95828b0eb2?max=10
    
    result:
    HTTP 200 OK
    [
      {
        "DeviceId": "ca4419ffa1299f9d",
        "FacebookId": "699518193558537",
        "LastConnection": "2016-12-13T14:58:49.197",
        "Score": 40,
        "Age": null,
        "ConjugalSituation": "Single",
        "Country": null,
        "FacebookFirstName": "Daniel Gerardo",
        "Gender": "male",
        "InitialMBTIKnowledge": "Yes",
        "MBTISelected": "????",
        "MBTIYesOrNo": "No",
        "ppAlmostNeverLate": null,
        "ppDecisionsAriseFrom": "Feelings",
        "ppEnergeticAfter": "WithPeople",
        "ppI-like-you": "CA9F15",
        "ppI-love-you": "27D6A2",
        "ppI-miss-you": "B1F6B1",
        "ppImportantQuality": "Positive",
        "ppjokes": "589D98",
        "ppJusticeOverPity": "Justice",
        "ppLanguage": null,
        "ppNotificationToken": "cK4tUSVIsp4:APA91bGl-KGRxPVVEZ8o80X6DYGzrG7GUS1mn1lJq8OSQ11bFfkw0cepmYEZG47gYQNFDKrMtRGzJytE-46xpKdP",
        "ppOpenedOrSettled": "Settled",
        "ppParticipateBattleStickers": null,
        "ppPreferBooksToParties": "Books",
        "ppPreferGoals": "Flexible",
        "ppReceptiveTo": "Facts",
        "ppSocialInteraction": "Naturally",
        "ppthank-you": "812D47",
        "pptu-me-plais": null,
        "SetLanguage": null,
        "UserAnimal": "iStock_000057902672_Medium.jpg",
        "UserDescriptionPrototypeId": null,
        "UserEmail": null,
        "UserFlower": "shutterstock_13695319.jpg",
        "UserLandscape": "bridges.jpg",
        "UserPresentation": null,
        "LastUpdated": "2016-12-07T14:27:04.45"
      },
       ... Other profiles removed ...
     ]
  

  
### Interface 

Get (structured) profiles for a device: profiles are structured but not complete

    GET http://api.cvd.io/messaging/{area}/SuggestedUsers/forDevice/{deviceId}?maxItems={maxItems}&maxHours={maxHours}&gender={gender}&showUsersWhoDoNotParticipate={showUsersWhoNotParticipate}


(2nd option)
Get (flat) profiles for a device: all properties returned but in a flat format

    GET http://api.cvd.io/messaging/{area}/SuggestedUsers/forDevice/{deviceId}/flat?maxItems={maxItems}&maxHours={maxHours}&gender={gender}&showUsersWhoDoNotParticipate={showUsersWhoNotParticipate}



### Inputs

Path : 

* **{area}** : area name of the current application doing the call (used later to filter the users returned
* **{deviceId}** : device id of the current user doing the call

QueryString :

* **{maxItems}** : number max of profiles to return, 20 by default.
* **{maxHours}** : define the period of time to look for user's last connection. By default we returned only users connected within the last day (24 hours)
* **{showUsersWhoDoNotParticipate}** : null by default, if set to 'yes' then include all users of all apps instead of returning only the users that have the property `ppParticipateInBattleStickers` set to `yes` (that's mainly for development purposes)
* **Filters** : (if null, you don't need to provide the filter, it'll be ignored)
     * **{gender}** : setup the type of gender(s) to return, values can be:
         - opposite (default) : return only users of the opposite of the user doing the call
         - same : return only users with the same gender of the user doing the call
         - both : return everyone (cats included ;-)
     * **{country}** : return only users from the specified country
     * **{ppReceptiveTo}** : filter by ReceptiveTo user property
     * **{ppDecisionsAriseFrom}** : filter by "Decisions Arise From" user property
     * **{ppOpenedOrSettled}** : filter by "Opened Or Settled" user property
     * **{ppPreferBooksToParties}** : filter by "Prefer Books To Parties" user property
     * **{ppEnergeticAfter}** : filter by "Energetic After" user property
     

### Output

The result can be a success or a failure:

__success__:
the result sould be `OK` and contain an array of profiles with user properties. the profile is defined by a facebookid or deviceId or both.

    HTTP 200 OK
    
      [
       {
         "DeviceId": string,
         "FacebookId": string,
         "LastConnection": datetime,
         "Score": int,
         "Age": int,
         "ConjugalSituation": string,
         "Country": string,
         "FacebookFirstName": string,
         "Gender":string,
         "InitialMBTIKnowledge": string,
         "MBTISelected": string,
         "MBTIYesOrNo": string,
         "ppAlmostNeverLate": string,
         "ppDecisionsAriseFrom": string,
         "ppEnergeticAfter": string,
         "ppI-like-you": string,
         "ppI-love-you": string,
         "ppI-miss-you": string,
         "ppImportantQuality": string,
         "ppjokes": string,
         "ppJusticeOverPity": string,
         "ppLanguage": string,
         "ppNotificationToken": string,
         "ppOpenedOrSettled": string,
         "ppParticipateBattleStickers": string,
         "ppPreferBooksToParties": string,
         "ppPreferGoals": string,
         "ppReceptiveTo": string,
         "ppSocialInteraction": string,
         "ppthank-you": string,
         "pptu-me-plais":string,
         "SetLanguage": string,
         "UserAnimal": string,
         "UserDescriptionPrototypeId": string,
         "UserEmail":string,
         "UserFlower":string,
         "UserLandscape": string,
         "UserPresentation": string,
         ... (properties are dynamic and other can appear in the future)
         "LastUpdated": date"
       }, ...
    ]

The results are ordered by the `Score` property DESC. The `Properties` hastable is easy access to the main properties and avoid other calls but content is subject to change.

__failure__:
if the http status is anything but OK then the result should contain the error message:

    HTTP 400 BadRequest
    {
      "error":string
    }
   



<a name="GetPopularMenLeaderBoards">
Get popular men leaderboards
----------------------------
### Description
A men leaderboard based on popularity. This board is computed for your profile, that means the leaderboard is not an absolute one but can be different depending on your country for exemple. 
_note: the definition of popularity is not yet defined and can change in time_

exemple:

    GET http://api.cvd.io/messaging/stickers/LeaderBoards/popular/men/fordevice/30a2af95828b0eb2?max=10
    
    result:
    HTTP 200 OK
    [
        { "facebookId":"10154168878366564", "score":9},
        { "facebookId":"1208267635874542", "score":4},
        { "facebookId":"10206903354925671", "score":3},...
    ]
  

### Interface 

Get board for a device:

    GET http://api.cvd.io/messaging/{area}/LeaderBoards/popular/men/fordevice/{deviceId}?maxItems={maxItems}


### Inputs

Path : 

* {area} : area name of the current application doing the call
* {deviceId} : device id of the current user doing the call
* {maxItems} : number max of profiles to return, 20 by default.

### Output

The result can be a success or a failure:

__success__:
the result sould be `OK` and contain an array of profiles with scoring. the profile is defined by a facebookid or deviceId or both.

    HTTP 200 OK
    [
      { "facebookId":string, "score":float},...
    ]


__failure__:
if the http status is anything but OK then the result should contain the error message:

    HTTP 400 BadRequest
    {
      "error":string
    }
   



<a name="GetPopularWomenLeaderBoards">
Get popular women leaderboards
----------------------------
  
### Description
A women leaderboard based on popularity. This board is computed for your profile, that means the leaderboard is not an absolute one but can be different depending on your country for exemple. 
_note: the definition of popularity is not yet defined and can change in time_

exemple:

    GET http://api.cvd.io/messaging/stickers/LeaderBoards/popular/women/fordevice/30a2af95828b0eb2?max=10
    
    result:
    HTTP 200 OK
    [
        { "facebookId":"1037267389698761", "score":9},
        { "facebookId":"1044828568936873", "score":4},
        { "facebookId":"10209947279466450", "score":3},...
    ]
  

### Interface 

Get board for a device:

    GET http://api.cvd.io/messaging/{area}/LeaderBoards/popular/women/fordevice/{deviceId}?maxItems={maxItems}


### Inputs

Path : 

* {area} : area name of the current application doing the call
* {deviceId} : device id of the current user doing the call
* {maxItems} : number max of profiles to return, 20 by default.

### Output

The result can be a success or a failure:

__success__:
the result sould be `OK` and contain an array of profiles with scoring. the profile is defined by a facebookid or deviceId or both.

    HTTP 200 OK
    [
      { "facebookId":string, "score":float},...
    ]


__failure__:
if the http status is anything but OK then the result should contain the error message:

    HTTP 400 BadRequest
    {
      "error":string
    }
   


<a name="GetMyMessagesStatuses">
Get my messages statuses
----------------------------
   
### Description
A user gets the statuses of it's messages (actions applied to). He get the full list of it's messages with an array of actions applied to each message.

exemple:

    GET http://api.cvd.io/messaging/stickers/SentMessagesStatus/fordevice/30a2af95828b0eb2?max=10
    
    result:
    HTTP 200 OK
    [
        { 
          "messageId":"1C318DA2-01F6-4ADF-A599-08DC129B92D6", 
          "actions":[{ name="viewed",value="true"},{name="setIsPreferred",value="8D8D193E-C13D-4B76-8AA5-8744C23FDD39"}] 
        },
        { 
          "messageId":"8D8D193E-C13D-4B76-8AA5-8744C23FDD39", 
          "actions":[{ name="viewed",value="true"}] 
        }
    ]
  
here, message `"1C318DA2-01F6-4ADF-A599-08DC129B92D6"` was shown to the user (`viewed`), user set it's preferrence between this message and the bot message (`setIsPreferred`) and user played to guess which one was the bot message (`setIsBot`).

  
### Interface 

Get profiles for a device:

    GET http://api.cvd.io/messaging/{area}/SentMessagesStatus/{deviceId}?maxItems={maxItems}



### Inputs

Path : 

* {area} : area name of the current application doing the call
* {deviceId} : device id of the current user doing the call
* {maxItems} : number max of profiles to return, 20 by default.

### Output

The result can be a success or a failure:

__success__:
the result sould be `OK` and contain an array of messages with action statuses. 

    HTTP 200 OK
    [
      { 
        "messageId":string guid, 
        "actions": (string*string) array },
    ]

properties:

* __messageId__ : id of the message (received from api when the message was sent)
* __actions__ : list of actions (name,value) already done with the message (from the [challenge actions](#GetUserChallengeMessagesAction)), this can be actually named ["viewed","setPreferred","setIsBot"]. the value property contains the id of the message for "setPreferred" and "setIsBot" and "true" for "viewed".



__failure__:
if the http status is anything but OK then the result should contain the error message:

    HTTP 400 BadRequest
    {
      "error":string
    }
   

