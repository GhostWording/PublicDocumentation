# Shared Configurations

This api contains configurations and definitions to be shared by all applications.

## Areas - relation types for area and default Folder Path

**Description**: define relation types, or sexed recipients, with some additional attributes (for exemple for the recipient type Sweetheart and gender female)

**Call** :

    GET http://gw-static-apis.azurewebsites.net/area/defaultImageFolderPathForRecipient.json
  
**Returned data**: 
An array of relation types for the area

    [
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
        "Importance": 1,
        "defaultImageFolderPath": ""
      },
      ...
    ]
  
## Recipient - relation types

**Description** : defining the different relation types with genders and importance

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

**Description** : Array of ids of texts to be used in the love quizz

**Call** :

    GET http://gw-static-apis.azurewebsites.net/data/quizz/lovequizz.json

**Returned Data**:
An object with PrototypIds property (which is an csv list in string of text ids)

    {"PrototypeIds" : "01C699,53F203,94A261,B00253,E44511,F440F4"}
    
