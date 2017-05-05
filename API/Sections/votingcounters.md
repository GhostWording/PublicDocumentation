# Votes and counters api

This is a simple api to store shared counters between apps and users driven by votes.
Please read the usage part first and then go the api details.

## Usage

### Voting
Users can vote for photos of other users. Each time a user photo get a vote, the global counter of a user should be updated too (that's the responsability of the client to do that).

Exemple : Voting for photo A of Facebook user yyzz

- increment photo counter:

          POST /vote/MyAppName/ForUser
         { 
                "recipient" : {
                      "deviceId" : "123", 
                      "facebookId" : "yyzz", }, 
                 "counterName" : "votesForPhotoA" 
         }

- increment user's global counter:

         POST /vote/MyAppName/ForUser
        { 
                "recipient" : { 
                       "deviceId" : "123", 
                       "facebookId" : "yyzz", }, 
                "counterName" : "votesForAnyPhoto" 
         }

### Read counters
Once votes have been done, we'll want to show the counters to the users.

exemple : Getting votes for photo A and B of Facebook user yyzz

- counter for photo A:

         GET /vote/MyAppName/votesForPhotoA/forFacebookId/yyzz

- counter for photo B:

         GET /vote/MyAppName/votesForPhotoB/forFacebookId/yyzz

- user's global counter:

         GET /vote/MyAppName/votesForAnyPhoto/forFacebookId/yyzz


### Get users
In order to decide what users to show to other users, you may need to get a list of users based on the values of the counters.

exemple : find users with less votes for their global counter:

        GET /vote/MyAppName/users/ByCounterName/votesForAnyPhoto?direction=asc&max=10


### Reset
For some reason you may need to reset a counter for a user.

exemple: user decided to remove photo A, you want to reset the photo A counter:

        POST /vote/MyAppName/ForUser/Reset
        { 
                "recipient" : { 
                       "deviceId" : "123", 
                       "facebookId" : "yyzz", }, 
                "counterName" : "votesForAnyPhoto"
         }





## Api Details


* ![#f03c15](https://placehold.it/12/f03c15/000000?text=+) _note : for all endpoints where we need to identify users, at least one of device or facebook id should be provided. If present, facebookId will be used preferably_.

## POST /vote/{appName}/ForUser

* **definition** : vote for "something" identified by a counter name for a user (recipient) defined by it's facebookid or deviceid . This thing can be a name, a photo url, whatever.
* **when to use** : when a vote is done by one user for another on a specific item identified by "label".
* **payload** : 

      { 
          "recipient" : { 
             "deviceId" : "", 
             "facebookId" : "",
          }, 
          "counterName" : "label name"
      }

* **return** : 
      
      { "status":"saved or error"}

## GET /vote/{appName}/{label}/forFacebookId/{facebookId}
## GET /vote/{appName}/{label}/forDeviceId/{deviceId}

* **definition** : get votes for a user for something identified by a label.
* **when to use** : when you need to show the specific "label" counter to the user.

* **return** : 
      
      { 
           "counter": {
              "counterName" : "",
              "value" : 0
           }
       }


## POST /vote/{appName}/ForUser/Reset

* **definition** : Reset the counter previously created identified by a label for a user (recipient) defined by it's facebookid or deviceid . 
* **when to use** : when you need to reset the counter value to start something new with it.
* **payload** : 

      { 
          "recipient" : { 
             "deviceId" : "", 
             "facebookId" : "",
          }, 
          "counterName" : "label name"
      }

* **return** : 
      
      { "status":"reset or error"}


## GET /vote/{appName}/users/ByCounterName/{name}?direction=desc&max=10

* **definition** : get a list of users that have less or more votes for a counter identified by it's name
* **when to use** : when you need to show a list of users to interact with, you may want  to interact first with the ones that have less been used in the system or show the users most voted
* **path** : 
  * appName : name of the app doing the call
  * counterName : name of the counter 
* **querystring** : 
   * direction : desc or asc, defining the direction of the sort and the content returned (desc = from most voted to less, asc = from less to most voted)
   * max : number of users to return

* **return** : 
      
      [
            { "facebookId":"", "appName":"", "counter":0},
            { "facebookId":"", "appName":"", "counter":0}
      ]


![#009900](https://placehold.it/12/009900/000000?text=+) **Note**
_this would be the base of the work for [votingcounters.md](https://github.com/GhostWording/PublicDocumentation/tree/master/API/Sections) documentation file_
