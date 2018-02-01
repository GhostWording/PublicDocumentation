# HuggyEvents

HuggyEvents are a special category of events send by bot apps through regular [user events](https://github.com/GhostWording/PublicDocumentation/blob/master/API/Sections/useractions.md).

As it's a regular userevent, the payload is exactly the same as defined in user events page, we'll only discuss here about the values of these properties.

For publishing the event you should send a `POST` TO `http://gw-usertracking.azurewebsites.net/userevent/batch` with the following `JSON` payload:

    {
        "ActionType":"HuggySequenceStart",
        "ActionLocation":"",
        "TargetType":"id of seq",
        "TargetId":"Page",
        "TargetParameter":null,
        "AreaId":"bot name",
        "UserId":null,
        "DeviceId":"4e115472",
        "RecipientId":"",
        "LanguageCode":"fr",
        "ClientTime":"2016-01-11T15:56:57.2233538Z",
        "FacebookId":"2xxxx",
        "VersionNumber":1,
        "OsType":"app os",
        "ExperimentId":3,
        "VariationId":4,
        "IsNewInstall":true,
        "IntentionId":""
        "Last":0
    }
    
## Exemples of payloads
(for brievety, I only put here useful fields for the event, the rest is as usual)

* I start showing the user the sequence "HowAreYou", that is on position 30 on master file "mybotmaster.json" within the group "Survey", for the bot named `testBot` :

    
      {
        "ActionType":"HuggySequenceStart",
        "AreaId":"testBot",
        "ActionLocation":"mybotmaster-30",
        "Context":"HowAreYou",
        "Last":0,
        "TargetId":"HowAreYou",
        "TargetType":"Survey",
        "TargetParameter":"Hello, world! how are you?",
        "RecipientId":0
      }


* (still in HowAreYou sequence), After executing the first node in the sequence tree, I finished by executing commands and asking something to the user. After the user selection, we'll start executing the command selected and send a `HuggySequenceNext` event:

    
      {
        "ActionType":"HuggySequenceNext",
        "AreaId":"testBot",
        "ActionLocation":"mybotmaster-30",
        "Context":"HowAreYou",
        "Last":0,
        "TargetId":"ImFine",
        "TargetType":"Survey",
        "TargetParameter":"1",
        "RecipientId":1
      }
    
    
    ## Details
    
    The valuable properties for huggy events are defined as this:
    
    * **ActionType**:
      * it defines the type of the action for the event
      * it can be HuggyConversationStart | HuggySequenceStart | HuggySequenceNext (...)
    * **AreaId**: the name of the bot you're executing
    * **ActionLocation**: 
      * in information about the reference to this sequence (which master file reference this sequence ? and in what order within?)
      * it's a combination of these 2 info in one field separated by a dash -> `"{masterFile}-{order}"`
    * **Context**: SequenceId. In order to reconstitute the executing path we need to be able to link events that happened during the execution of the sequence, that's why you need to keep in this context field the Id of the current sequence
    * **Last**: 
      * if the element is the last element of the sequence tree, then it's marked `Last=1`, if not then it's `0`. 
      * in a simpler way, then if the element is a node (an element with children) then it's 0, if its a Leaf then its a terminal element and value is 1.
    * **TargetId**: contains the id of the current executing element in the tree
    * **TargetType**: 
      * it contains a contextual information of the sequence. as sequences are stored in groups, it should be the group name (for exemple: Start,Survey...). 
      * If you don't have this info, it could be `App` for mobile apps or `Bot` for chat bots.
    * **TargetParameter**: some additional information about the current node
      * if sequenceStart: it contains the label of the question sent to the user within the root node (if you have it)
      * if sequenceNext: it contains the `ElementValue` field of the node
    * **RecipientId**:
      * `Attention`: this field doesn't means what it means, for simplicity we reused an existing field in user events not used here.
      * For HuggySequenceNext only
      * it contains the degree of interaction with the user: if we started the sequence and ask a first question, then when user click on command it's its first interaction in this sequence, then we'll send a `RecipientId=1`. after that we'll show him some steps, continue with a linksto and ask a new question. Then, after user selection, when we'll start executing the next command we'll send a `RecipienId=2`.
      * it's not directly the level of the curring executing node because the second question answered can be in a node at 4 or 5 degree of depth.
      
      
  
    
    
    
    
    
    
    
    