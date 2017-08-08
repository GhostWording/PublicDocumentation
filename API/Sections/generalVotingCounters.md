# General Voting counters api

This is a simple api to store shared counters between apps. This is different than the [users Voting Counters](usersVotingCounters.md)
in the sense that they are really generic and not related to a user.

Please read the usage part first and then go the api details.

## Usage

### Naming
Before going further, it is important to keep consistant naming accross the counters. This is a very simple api with nothing more than the name of the counter to qualify it, so it has to be precise, human redeable, and possibly computer compliant if we want to extract information from the name.

This is the rules to follow:

* always use `-` to separate words
* all words should be in lower case but they can keep their internal Upper case letters if needed (ppDecisionsAriseFrom-Thinking)
* identification and more specific part have to come after the more generic ones from left to right.
* values with ids (like texts) should always be prefixed with their type.
* exemples:
   * count the likes and dislikes for text 012345
   
          - text-012345-like-yes
          - text-012345-like-no
          
   * count votes for photo Aaa.jpg
   
          - photo-aaa.jpg
          
   * count nb of ok/not ok when profiles presented
   
          - ppProfileLooksGood-yes
          - ppProfileLooksGood-no
          - ppProfileLooksGood-INTP-yes ...
          
    

### Create the counter
There is no method _Create_ counter in the sense that the counter would be automatically created if it not exist, but you can create
a counter with the value 0 by calling the method `Initialize`:

Exemple : I want to create a counter for PhotoA but with no votes yet, I want a global counter and one by country:

- create counter for PhotoA:

          POST /vote/GlobalCounters/Initialize
           { 
                  "counterNames" : ["votesForPhotoA","votesForPhotoAForFrance"]
           }
_(You'll get in return the incremented list of actual counter values)_

### Voting
You can create and vote for a counter on the fly, counter will be created if it not exist.

Exemple : Voting for gif xyz and voting for xyz as a man

           POST /vote/GlobalCounters/Set
           { 
                  "counterNames" : ["gif-xyz","gif-xyz-gender-male"]
           }
_(You'll get in return the incremented list of actual counter values)_

![#f03c15](https://placehold.it/12/f03c15/000000?text=+) **Note**: please not use `/` in your counter names because they won't be correctly recognized with you'll try to read them by a get


### Read counters
If you need to read a counter without voting, you can simply get it's value by doing a get on `/vote/GlobalCounters/{counterName}` api:

exemple : Getting value for counter xyz

        GET /vote/GlobalCounters/gif-xyz

### Reset
For some reason you may need to reset a counter.

exemple: user decided to remove photo A, you want to reset the photo A counter:

        POST /vote/GlobalCounters/Reset
           { 
                  "counterNames" : ["votesForPhotoA","votesForPhotoAForFrance"]
           }


### AppName
appname is not actually used to distinguish a counter from another but we'll keep that info to see what app created the counter if 
needed. As it's not mandatory this value can be passed to the api as a querystring : `appName=stickers`



## Api Details


## POST /vote/GlobalCounters/Set

* **definition** : vote for "something" identified by a counter name or many identifiers (you are responsible for creating many labels as you need to segment your values)
* **when to use** : when you need to count something in your apps
* **payload** : 

      { 
         "counterNames" : ["list","of","labels"]
      }

* **return** : It returns the provided list of labels with their updated values, value will `-1` if something wrong happend with a counter.

      [
          {
              "Label": "counter1",
              "Value": 12
          },
          {
              "Label": "counter1-fr",
              "Value": 1
          }
      ]


## POST /vote/GlobalCounters/Reset

* **definition** : Reset counters identified by their labels. 
* **when to use** : when you need to reset the counter value to start something new with it.
* **payload** : 

      { 
         "counterNames" : ["list","of","labels"]
      }


* **return** : 
     * It returns the provided list of labels with their values set to 0.
     * if something wrong happened with one counter, value will be set to `-1`


## POST /vote/GlobalCounters/Initialize

* **definition** : initialize counters identified by their labels. 
* **when to use** : when you need to create manually a counter without first voting for it (ie: you want it's value set to 0).
* **payload** : 

      { 
         "counterNames" : ["list","of","labels"]
      }


* **return** : 
     * It returns the provided list of labels with their values set to 0.
     * if something wrong happened with one counter, value will be set to `-1`



## GET /vote/GlobalCounters/{counterName}

* **definition** : get the value of a counter by it's counter's name
* **when to use** : when you need to show it's actual value without voting for it
* **path** : 
  * counterName : name of the counter 

* **return** : 
      
      {
          "Label": "counter1",
          "Value": 12
      }

