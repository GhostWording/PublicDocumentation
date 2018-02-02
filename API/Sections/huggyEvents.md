# HuggyEvents

HuggyEvents are a special category of events send by bot apps through regular [user events](https://github.com/GhostWording/PublicDocumentation/blob/master/API/Sections/useractions.md). We'll only discuss here the specificities of these events

The objective of the HuggyEvents is to see the path taken by the users, to see when they stop and globally what are the best sequences. For that we need to see when a sequence is presented to a user, when a user interacts with it and if he finishes it.

* **[Presented]**: a sequence is presented when you start executing it and start showing the first elements to the user. You'll send an event with `ActionType=HuggySequenceStart`. 
* **[Started]**: a sequence is started when the user reacts (click/select) for the first time to something in the sequence (a menu is shown). You'll send an event with `ActionType=HuggySequenceNext` and specify the **Recipient=1** (we re-use that field **RecipientId** just to not create a new one, but that means _number of interractions with the user_)
* **[Finished]**: a sequence is finished when you arrive at the end of the sequence in a leaf and that there is nothing more to show. You'll send an event with `ActionType=HuggySequenceNext`, specify the number of interraction and set the field `Last=1`
* **other interactions**: between the start and finish you're supposed to send an `ActionType=HuggySequenceNext` each time a user clicks on something to continue (specifying the Nth of times the user did something in this sequence).

Please refer to the details below for the other specific values of the event.


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


* (still in HowAreYou sequence), After executing the first node in the sequence tree, I continue by executing commands and asking something to the user. After the user selection, we'll start executing the command selected and send a `HuggySequenceNext` event:

    
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
    
    
* (still in HowAreYou sequence). in the previous node of the sequence I shown a menu, the user click on an item. as this one is the last one of the sequence I'll send a `HuggySequenceNext` event with `Last=1` and `RecipientId=2` (because this step result is the second interaction of the user with the sequence).


      {
        "ActionType":"HuggySequenceNext",
        "AreaId":"testBot",
        "ActionLocation":"mybotmaster-30",
        "Context":"HowAreYou",
        "Last":1,
        "TargetId":"ILikeCookies",
        "TargetType":"Survey",
        "TargetParameter":"1",
        "RecipientId":2
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
      
      
## Special notes for Fragments

Sequence Fragments can be load within sequences via the LinksToFragment property. That means that these special sequences must be considered as **part of the original sequence** and not as a new sequence.

this implies for the properties sent when you're sending an event for a fragment:

* Context : you must put here the id of the parent sequence (not the id of the fragment)
* RecipientId: as it should contain the degree of interaction with the user, we expect here a continuation of the value from the parent sequence. If you start the fragment after 2 interactions with the user and ask a question, then the value of the SequenceNext should be 3
* ActionType: when you start a fragment, it's not a real start, so the value for the fragment should always be `HuggySequenceNext` even if it's the root of the fragment.
* ActionLocation: it should also contain the value of master-order of the parent sequence as we are continuing the sequence. 


    
    
    
    
    
