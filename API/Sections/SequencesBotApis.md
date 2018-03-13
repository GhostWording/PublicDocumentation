# BotApis sequences

## TL;DR

* UserProperties : 
   * set user property : http://api.cvd.io/botapis/user/setproperty
   * get user property: http://api.cvd.io/botapis/user/property
   * get all properties for a user:  http://api.cvd.io/botapis/user/properties
* Sequences : 
   * get one fragment by Id or tag :  http://api.cvd.io/botapis/sequences/fragment
   * get next sequence for user : http://api.cvd.io/botapis/sequences/next

Note for the following apis that:
* a botName must be provided to identify the context you're working on (the name of the bot not the app name)
* a deviceid and a facebook id should always be provided, at least one of them will be mandatory. If you have both, send both for information but facebook id will be used to identify users, if you have only one it will be used as unique id.

## User Properties

In order to do some specific actions and decisions on the bot engine, bot apis need to know the user profile properties. The idea is to call these apis from the clients (along with the usual SetUserProperty sent with events)

### SET
I want to set a user property for a user using a Bot:

```
POST http://api.cvd.io/botapis/user/setproperty
 {
     "BotName" : "test", 
     "DeviceId" : "123", 
     "FacebookId" : "456", 
     "PropertyName": "greeting", 
     "PropertyValue" : "Hello" 
}
```
You’ll get in return either

* an Http OK
* an Http NotFound


### GET 

I want to get a user property for a user using a bot:

```
POST http://api.cvd.io/botapis/user/property
{ 
   "BotName" :"test", 
   "DeviceId" : "123", 
   "FacebookId" : "456", 
    "PropertyName" : "greeting" 
}
```

You’ll get in return either

* an Http OK with an object with {PropertyName,PropertyValue}
* an Http NotFound if there is no match for user/bot/property


### GET ALL
I want to get all properties for a user using a Bot

```
POST http://api.cvd.io/botapis/user/properties
{ 
   "BotName" : "test", 
   "DeviceId" : "123", 
   "FacebookId" : "456"
}
```

You’ll get in return either

* an Http OK with a list of key/value pairs for this this user
* an Http BadRequest if there is no matching values for bot/device


## Fragments

### By ID
I want to get a specific sequence Fragment by it’s ID:

```
POST http://api.cvd.io/botapis/sequences/fragment
{ 
   "BotName":"test", 
    "DeviceId" : "123", 
    "FacebookId": "456", 
    "ParentSequencePath":"HowAreYou",
    "FragmentPath" : "funnySequence"
}
```

You’ll get in return either

* an Http OK with the Json sequence
* an Http NotFound with a message identifying the error (see [Errors section](#errors))

Note:
* ParentSequencePath : is the sequence path you're actually executing that is referencing the fragment. a sequence path is the combination of all elements representing your position in the sequence tree `sequenceId/subElementId/subElementId`
* this SequencePath is not actually used for finding the fragment but it is a useful information for further understanding of the executed conversation

### By TAG
I want to get a random sequence Fragment by Tag(s):

```
POST http://api.cvd.io/botapis/sequences/fragment
{ 
   "BotName":"test", 
   "DeviceId": "123", 
   "FacebookId": "456", 
   "ParentSequencePath":"HowAreYou",
   "Tags" : ["funny","penguins"]
}
```

You’ll get in return either

* an Http OK with the Json sequence
*  an Http BadRequest with a message identifying the error (see [Errors section](#errors))


## Sequences

I want to get the next sequence:

```
POST http://api.cvd.io/botapi/sequences/next
{ 
   "BotName":"test", 
   "DeviceId": "123", 
   "FacebookId": "456"
}
```

You’ll get in return either

* an Http OK with the Json sequence
*  an Http BadRequest with a message identifying the error (see [Errors section](#errors))

Note:
* LastSequenceId : is optional and is the id of the sequence you've just finished
* the next sequence is calculated based on the order of the referenced sequences in the master file, the information on your profile and the history of the previously executed sequences.
* each time you call the service and that the service provides you a new sequences it will be added to user's history of executed sequences.

## Huggy Events

Please note that the json sequence you're receiving contains additional context information that you MUST use to send huggy events, ex :

    "MasterName": "botname",
    "MasterGroup": "Survey",
    "MasterOrder": 10
    
    
MasterName and Order define place of the sequence in a bot configuration file. **You have to send them in the `ActionLocation` field of the huggy events by composing it like that `{MasterName}-{MasterOrder}`**, for exemple `botname-10`.

**MasterGroup must be send to huggy events in the `TargetType` field**
The MasterGroup represent a logical group of sequences with a specific meaning. It's also the ONLY WAY to identify a sequence as being a Survey for exemple: In the survey pony bot, not all sequences are surveys, only the ones within the **Survey** group, the conversation introduction sequences should be in a **start** group).


## Errors

In Case of any identified  error you'll receive an `HTTP 400 BadRequest` error code with a payload containing the problem found:

``
{
    "TypeId": 0,
    "Type": "UnknownBotName",
    "Message": "there is no sequences registred for this [surveyapps] bot"
}
```

It contains a `TypeId` which is the id of the error and `Type` which is the technical name of the error. You can use both to match the error on your side and create the right behavior accordingly.
You also have a `Message` which is the textual explanation of the error.

The types of errors you can have are the following:

* 0 : UnknownBotName, => the bot name is not valid
* 1 : NoMoreSequencesAvailable, => the request is valid but there is no more sequences available for your user
* 2 : NoFragmentMatchingCondition, => a fragment may have been found but it's conditions don't match the user profile
* 3 : NoFragmentFound, => no fragments have been found
* 4 : InternalErrorForThisQuery, => anything else ...


``
