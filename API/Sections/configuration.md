# Shared Configurations

This api contains configurations and definitions to be shared by all applications.
  
## Recipient - relation types

**[OBSOLETE] _this paragraph is still here for a limited time, but the updated version you should use is not any more a shared configuration but data you get from the api._ Get more information on [Relation Types](relationtypes.md).**

**Description** : defining an id for the a relation type + gender

The main properties you are interested in are then:

- Id is the id for the recipient type (for example Mother or SweetheartM,)
- RecipientTypeTag is the id for the relation type id (for example parents, sibling, loveinterest, sweetheart)
- Gender is F for Female and H for Male (Homme in French)

For example, when the relation type id the id for Parent and the Gender is Female, the recipient type is Mother
For example, when the relation type id the id for Sweetheart and the Gender is Male the recipient type is SweetheartM

Content example

        { "Id": "Mother",            "RecipientTypeTag": "64C63D", "Gender": "F"} 
        { "Id": "Father",             "RecipientTypeTag": "64C63D", "Gender": "H"} 
        { "Id": "SweetheartF",    RecipientTypeTag": "9E2D23", "Gender": "F"},
        { "Id": "SweetheartM",   "RecipientTypeTag": "9E2D23", "Gender": "H"},


**Call** : 

    GET http://gw-static-apis.azurewebsites.net/recipients/RelationTypes.json

**Returned Data** : 
An object with relation types array property:

    {
      "relationTypes": [
        {
          "Id": "SweetheartF",
          "RecipientTypeTag": "9E2D23",
          "Gender": "F",
          "usualRecipient": true,
          "subscribableRecipient": true,
          "dashLabel": "Ma chérie",
          "MailLabel": "mailVotre chérie",
          "LocalLabel": "Votre chérie",
          "TuOuVous": "T",
          "Importance": 1
        },
        ..
        ]
    }
 

   
## Data Quizz - LoveQuizz

**Description** : Array of ids of prototypes of texts to be used in the love quizz. Then the quizz will get later all the realizations of the texts in the user culture

This configuration is used on  [http://www.commentvousdire.com/en/loveQuizz](http://www.commentvousdire.com/en/loveQuizz)

**Call** :

    GET http://gw-static-apis.azurewebsites.net/data/quizz/lovequizz.json

**Returned Data**:
An object with PrototypIds property (which is an csv list in string of text ids)

    {"PrototypeIds" : "01C699,53F203,94A261,B00253,E44511,F440F4"}
    
