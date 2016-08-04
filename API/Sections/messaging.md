__This is a pre-release documentation to open discussion on interfaces, nothing is functional actually__

# APIS for Messaging

these apis provide interfaces for users to send message cards (text+image) to other users and other related actions.

Index of end points:

* [User (man|woman) send a message to other user (woman)](#PostUserToUserMessage):
  * [ ] POST http://api.cvd.io/messaging/{area}/usertouser/message
    - ex: http://api.cvd.io/messaging/stikers/usertouser/message

* [User (woman|woman) get all her messages](#GetUserToUserMessages):
  * [ ] GET http://api.cvd.io/messaging/{area}/usertouser/messages/forDevice/{deviceId}
    - ex: http://api.cvd.io/messaging/stikers/usertouser/messages/forDevice/f659161979f91172
  * [ ] GET http://api.cvd.io/messaging/{area}/usertouser/messages/forFacebookid/{facebookId}
    - ex: http://api.cvd.io/messaging/stikers/usertouser/messages/forFacebookid/952942371481416

<!--
* [User (woman) get messages from bot to show along real messages](#GetBotToUserMessages):
  * [ ] GET http://api.cvd.io/messaging/{area}/bottouser/messages/forDevice/{deviceId}
     - ex: http://api.cvd.io/messaging/stikers/bottouser/messages/forDevice/f659161979f91172
  * [ ] GET http://api.cvd.io/messaging/{area}/bottouser/messages/forFacebookid/{facebookId}
    - ex: http://api.cvd.io/messaging/stikers/bottouser/messages/forFacebookid/952942371481416
-->

* [When a real user message is presented with a bot message](#GetUserChallengeMessagesAction):
  * [ ] POST http://api.cvd.io/messaging/{area}/UserChallengeMessages/{action}/fordevice/{deviceId}
    * the message is shown to the user (action=viewed):
      - ex: POST http://api.cvd.io/messaging/stikers/UserChallengeMessages/viewed/fordevice/f659161979f91172
    * user choose her preferred message (action=preferredMessage):
      - ex: POST http://api.cvd.io/messaging/stikers/UserChallengeMessages/preferredMessage/fordevice/f659161979f91172
    * user guess which one is the bot message (action=isBotMessage):
      - ex: POST http://api.cvd.io/messaging/stikers/UserChallengeMessages/isBotMessage/fordevice/f659161979f91172
        

* [Get matching women list for a user](#GetMatchingWomen)
  * [ ] GET http://api.cvd.io/messaging/{area}/MatchingWomen/fordevice/{deviceId}?max={number}
    - ex: http://api.cvd.io/messaging/stickers/MatchingWomen/fordevice/30a2af95828b0eb2?max=10
    
* [Get matching man list for a user](#GetMatchingMen)
  * [ ] GET http://api.cvd.io/messaging/{area}/MatchingMen/fordevice/{deviceId}?max={number}
    - ex: http://api.cvd.io/messaging/stickers/MatchingMen/fordevice/30a2af95828b0eb2?max=10
    
 
* [Get popular men leaderboards](#GetPopularMenLeaderBoards)
  * [ ] GET http://api.cvd.io/messaging/{area}/LeaderBoards/popular/men/fordevice/{deviceId}?max={number}
    - ex: http://api.cvd.io/messaging/stickers/LeaderBoards/popular/men/fordevice/30a2af95828b0eb2?max=10
    
* [Get popular women leaderboards](#GetPopularWomenLeaderBoards)
  * [ ] GET http://api.cvd.io/messaging/{area}/LeaderBoards/popular/women/fordevice/{deviceId}?max={number}
    - ex: http://api.cvd.io/messaging/stickers/LeaderBoards/popular/women/fordevice/30a2af95828b0eb2?max=10
    
* [Get status of my messages](#GetMyMessagesStatuses)
  * [ ] GET http://api.cvd.io/messaging/{area}/MyMessagesStatuses/{deviceId}?maxItems={maxItems}
    - ex : http://api.cvd.io/messaging/stickers/MyMessagesStatuses/fordevice/30a2af95828b0eb2?max=10

    

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
        "imageName":306043_10151330260424252_2113533977_n.jpg,
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

    GET http://api.cvd.io/messaging/stikers/usertouser/messages/forDevice/f659161979f91172
    
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
         "imageName":306043_10151330260424252_2113533977_n.jpg,
         "timestamp":1470150873,
         "actions":[]
       },
       "botMessage": {
         "messageId":"1C318DA2-01F6-4ADF-A599-08DC129B92D6"
         "textId":"AZERT",
         "content":"bla bla bla",
         "imageName":306043_10151330260424252_2113533977_n.jpg
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
         "imageName":306043_10151330260424252_2113533977_n.jpg,
         "timestamp":1470150800,
         "actions":["viewed","preferred"]
       }
      }
    ]
  

  
### Interface 

Get messages for a device:

    GET http://api.cvd.io/messaging/{area}/usertouser/messages/forDevice/{deviceId}

Get messages for a facebook id:

    GET http://api.cvd.io/messaging/{area}/usertouser/messages/forFacebookId/{facebookId}
 
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
          "actions":string array
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
  * __actions__ : list of actions already done with the message (from the [challenge actions](#GetUserChallengeMessagesAction)), this can be actually ["viewed","setPreferred","setIsBot"]
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

    POST POST http://api.cvd.io/messaging/stikers/UserChallengeMessages/viewed/fordevice/f659161979f91172
    {
      "facebookId":"952942371481416",
      "firstMessage":"1C318DA2-01F6-4ADF-A599-08DC129B92D6",
      "secondMessage":"1C318DA2-01F6-4ADF-A599-08DC129B92D6"
    }
    
    result:
    HTTP 200 OK {}
  
"then user choose it's prefered message:"

    POST http://api.cvd.io/messaging/stikers/UserChallengeMessages/preferredMessage/fordevice/f659161979f91172
    {
      "facebookId":"952942371481416",
      "firstMessage":"1C318DA2-01F6-4ADF-A599-08DC129B92D6",
      "secondMessage":"1C318DA2-01F6-4ADF-A599-08DC129B92D6",
      "preferred":"1C318DA2-01F6-4ADF-A599-08DC129B92D6"
    }
    
    result:
    HTTP 200 OK {} 
  
"and finally try to guess which is from a bot:"

    POST http://api.cvd.io/messaging/stikers/UserChallengeMessages/isBotMessage/fordevice/f659161979f91172
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

    POST http://api.cvd.io/messaging/{area}/BotUserChallengeMessage/viewed/fordevice/{deviceId}
    BODY application/json
    BODY application/json
    {
      "facebookId":string,
      "firstMessage":string,
      "secondMessage":string
    }
    
Set preferred message:

    POST http://api.cvd.io/messaging/{area}/BotUserChallengeMessage/preferredMessage/fordevice/{deviceId}
    BODY application/json
    {
      "facebookId":string,
      "firstMessage":string,
      "secondMessage":string,
      "preferred":string
    }
    
Guess bot message:

    POST http://api.cvd.io/messaging/{area}/BotUserChallengeMessage/isBotMessage/fordevice/{deviceId}
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
  




<a name="GetMatchingWomen">
Get matching women list for a user
----------------------------
   
### Description
A user (man) get selected (women) profiles to communicate with.

exemple:

    GET http://api.cvd.io/messaging/stickers/MatchingWomen/fordevice/30a2af95828b0eb2?max=10
    
    result:
    HTTP 200 OK
    [
        { "facebookId":"952942371481416", "score":8},
        { "facebookId":"10209947279466450", "score":6},
        { "facebookId":"1037267389698761", "score":3},...
    ]
  

  
### Interface 

Get profiles for a device:

    GET http://api.cvd.io/messaging/{area}/MatchingWomen/forDevice/{deviceId}?maxItems={maxItems}



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
   

<a name="GetMatchingMen">
Get matching Men list for a user
----------------------------
   
### Description
A user (woman) get selected (men) profiles to communicate with.

exemple:

    GET http://api.cvd.io/messaging/stickers/MatchingMen/fordevice/30a2af95828b0eb2?max=10
    
    result:
    HTTP 200 OK
    [
        { "facebookId":"952942371481416", "score":8},
        { "facebookId":"10209947279466450", "score":6},
        { "facebookId":"1037267389698761", "score":3},...
    ]
  

  
### Interface 

Get profiles for a device:

    GET http://api.cvd.io/messaging/{area}/MatchingMen/forDevice/{deviceId}?maxItems={maxItems}



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

    GET http://api.cvd.io/messaging/stickers/MyMessagesStatuses/fordevice/30a2af95828b0eb2?max=10
    
    result:
    HTTP 200 OK
    [
        { "messageId":"1C318DA2-01F6-4ADF-A599-08DC129B92D6", "actions":["viewed","preferred","setIsBot"] },
        { "messageId":"8D8D193E-C13D-4B76-8AA5-8744C23FDD39", "actions":["viewed",] },...
    ]
  
here, message `"1C318DA2-01F6-4ADF-A599-08DC129B92D6"` was shown to the user (`viewed`), user set it's preferrence between this message and the bot message (`preferred`) and user played to guess which one was the bot message (`setIsBot`).

  
### Interface 

Get profiles for a device:

    GET http://api.cvd.io/messaging/{area}/MyMessagesStatuses/{deviceId}?maxItems={maxItems}



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
        "actions": string array },
    ]

properties:

* __messageId__ : id of the message (received from api when the message was sent)
* __actions__ : an array with all the actions applied. 



__failure__:
if the http status is anything but OK then the result should contain the error message:

    HTTP 400 BadRequest
    {
      "error":string
    }
   

