__This is a pre-release documentation to open discussion on interfaces, nothing is functional actually__

# APIS for Messaging

these apis provide interfaces for users to send message cards (text+image) to other users and other related actions.

Index of end points:

* [User (man) send a message to other user (woman)](#PostUserToUserMessage):
  * [ ] POST http://api.cvd.io/messaging/{area}/usertouser/message
    - ex: http://api.cvd.io/messaging/stikers/usertouser/message

* [User (woman) get all her messages](#GetUserToUserMessages):
  * [ ] GET http://api.cvd.io/messaging/{area}/usertouser/messages/forDevice/{deviceId}
    - ex: http://api.cvd.io/messaging/stikers/usertouser/messages/forDevice/f659161979f91172
  * [ ] GET http://api.cvd.io/messaging/{area}/usertouser/messages/forFacebookid/{facebookId}
    - ex: http://api.cvd.io/messaging/stikers/usertouser/messages/forFacebookid/952942371481416

* [User (woman) get messages from bot to show along real messages](#GetBotToUserMessages):
  * [ ] GET http://api.cvd.io/messaging/{area}/bottouser/messages/forDevice/{deviceId}
     - ex: http://api.cvd.io/messaging/stikers/bottouser/messages/forDevice/f659161979f91172
  * [ ] GET http://api.cvd.io/messaging/{area}/bottouser/messages/forFacebookid/{facebookId}
    - ex: http://api.cvd.io/messaging/stikers/bottouser/messages/forFacebookid/952942371481416
    
* [When a real user message is presented with a bot message](#GetBotUserChallengeAction):
  * [ ] POST http://api.cvd.io/messaging/{area}/BotUserChallengeMessage/{action}/fordevice/{deviceId}
    * the message is shown to the user (action=viewed):
      - ex: POST http://api.cvd.io/messaging/stikers/BotUserChallengeMessage/viewed/fordevice/f659161979f91172
    * user choose her preferred message (action=preferredMessage):
      - ex: POST http://api.cvd.io/messaging/stikers/BotUserChallengeMessage/preferredMessage/fordevice/f659161979f91172
    * user guess which one is the bot message (action=isBotMessage):
      - ex: POST http://api.cvd.io/messaging/stikers/BotUserChallengeMessage/isBotMessage/fordevice/f659161979f91172
        

* [Get matching women list for a user](#GetMatchingWomen)
  * [ ] GET http://api.cvd.io/messaging/{area}/MatchingWomen/fordevice/{deviceId}?max={number}
    - ex: http://api.cvd.io/messaging/stickers/MatchingWomen/fordevice/30a2af95828b0eb2?max=10
    
 
* [Get popular men leaderboards](#GetPopularMenLeaderBoards)
  * [ ] GET http://api.cvd.io/messaging/{area}/LeaderBoards/popular/men/fordevice/{deviceId}?max={number}
    - ex: http://api.cvd.io/messaging/stickers/LeaderBoards/popular/men/fordevice/30a2af95828b0eb2?max=10
    
* [Get popular women leaderboards](#GetPopularWomenLeaderBoards)
  * [ ] GET http://api.cvd.io/messaging/{area}/LeaderBoards/popular/women/fordevice/{deviceId}?max={number}
    - ex: http://api.cvd.io/messaging/stickers/LeaderBoards/popular/women/fordevice/30a2af95828b0eb2?max=10
    
     
    

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
        "isUserMessage":false,
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
        "isUserMessage":boolean,
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
  * __content__ : if the text is the original one, this can be empty. If the message was customized by the user then the new content must be specified here.
  * __isUserMessage__ : if the message was customized by the user then this should be set to `true`.
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
Get all messages for a user (woman)
----------------------------




<a name="GetBotToUserMessages">
Get bot messages for a user (woman)
----------------------------


<a name="GetBotUserChallengeAction">
When a real user message is presented with a bot message
----------------------------



<a name="GetMatchingWomen">
Get matching women list for a user
----------------------------




<a name="GetPopularMenLeaderBoards">
Get popular men leaderboards
----------------------------



<a name="GetPopularWomenLeaderBoards">
Get popular women leaderboards
----------------------------




