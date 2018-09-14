# BotApis sequences offline

these apis allows you to download all sequences/fragments in a given context in order to preload everything for use offline.


## TL;DR 
* get all fragments for a certain topic :  GET http://api.cvd.io/botapis/sequences/master/fragmentsForName?topic=britishmuseum
* get a full master file with all sequences embedded : GET http://api.cvd.io/botapis/sequences/master/sequencesForMaster?botname=britishmuseum
   
Note for the following apis that:
* as you are pre-downloading everything for an offline use you'll get everything that is defined without any filter.  
It's up to you to evaluate the sequence for a specific user based on it's context and conditions if needed.

## Fragments

### All fragments for a topic
I want to get all fragments for a topic in one call:

```
GET http://api.cvd.io/botapis/sequences/master/fragmentsForName?topic={topic}
```

You’ll get in return either

* an Http OK with an array of json sequences
* an Http NotFound with a message identifying the error (see [Errors section](#errors))


## Sequences

I want to get all the sequences for a master file (identified by a bot name)

```
GET http://api.cvd.io/botapis/sequences/master/sequencesForMaster?botname={botname}
```

You’ll get in return either

* an Http OK with the master file model and embedded sequences
*  an Http BadRequest with a message identifying the error (see [Errors section](#errors))

Note:
* sequences are organized by "lines" as they appear in original master files. Each line belongs to a group (`GroupName`) in the master file, have
an order (`Order`) and a list of sequences (`SequencesForLine`).
* in the app you'll to pick randomly one sequuence in SequencesForLine
* but also present all lines randomly for a same `Order`

## Errors

In Case of any identified  error you'll receive an `HTTP 400 BadRequest` error code with a payload containing the problem found:

```
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
