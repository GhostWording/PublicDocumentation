__This is a pre-release documentation to open discussion on interfaces, nothing is functional actually__

# APIS for Messaging

these apis provide interfaces for users to send message cards (text+image) to other users and other related actions.

Index of end points:

* [User (man) send a message to other user (woman)](#PostUserToUserMessage):
  * [ ] POST http://api.cvd.io/messaging/{area}/usertouser/message
    - ex: http://api.cvd.io/messaging/stikers/usertouser/message
    
    
    

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

* success: the result sould be `OK` and contain the status `saved` and the Id of the saved message:
    
    HTTP 200 OK
    {
      "status": string,
      "messageId: string guid,
    }
    
* failure: the http status is anything but OK and the result should contain the error message:

  HTTP 400 BadRequest
  {
    "error":string
  }
  
