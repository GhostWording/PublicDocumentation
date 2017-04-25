# Relation Types

A relation type defines a relation between people by defining the relation with the recipient you target and a gender. For exemple the relation type `Mum` is defined when you want to send a message to the recipient `Parent` and the gender is `F`(Female).

To Get the actual relations, issue a request to this service:

    GET http://api.cvd.io/{appName}/relationtypes
    
Where [appName] is the name of your application. 

You'll get an Array of RelationTypes with the following properties

* Id : the identifier you need to use to reference the relation
* RecipientTypeId : the id of the recipient type (from the tags)
* Gender : 'H' = male, 'F' = female, or Null
* UsualRecipient : bool
* SubscribableRecipient : bool
* PoliteForm : 'T','V' or Null
* Importance : int. you should divide by 100 to get a float value (the x100 to get an int is used to simplify json exchanges)
* Labels : 
  * Culture
  * UserLabel
  * AppLabel
  

For exemple: 

    GET http://api.cvd.io/MyAppName/relationtypes
    
    
    [
      {
        "Id": "CloseFriends",
        "RecipientTypeId": "3B9BF2",
        "Gender": null,
        "UsualRecipient": true,
        "SubscribabeRecipient": false,
        "PoliteForm": "T",
        "Importance": 250,
        "Labels": [
          {
            "RelationTypeId": "CloseFriends",
            "Culture": "en-EN",
            "UserLabel": "Your close Friends",
            "AppLabel": "Close Friends"
          },
          {
            "RelationTypeId": "CloseFriends",
            "Culture": "fr-FR",
            "UserLabel": "Vos copains et copines",
            "AppLabel": "Ami(e) proche"
          }
        ]
      },
      {
        "Id": "SweetheartF",
        "RecipientTypeId": "9E2D23",
        "Gender": "F",
        "UsualRecipient": true,
        "SubscribabeRecipient": false,
        "PoliteForm": "T",
        "Importance": 100,
        "Labels": [
          {
            "RelationTypeId": "SweetheartF",
            "Culture": "en-EN",
            "UserLabel": "Your Sweet Hear",
            "AppLabel": "My Sweet Heart"
          },
          {
            "RelationTypeId": "SweetheartF",
            "Culture": "fr-FR",
            "UserLabel": "Votre chérie",
            "AppLabel": "Ma chérie"
          }
        ]
      },
      {
        "Id": "SweetheartM",
        "RecipientTypeId": "9E2D23",
        "Gender": "H",
        "UsualRecipient": true,
        "SubscribabeRecipient": false,
        "PoliteForm": "T",
        "Importance": 200,
        "Labels": [
          {
            "RelationTypeId": "SweetheartM",
            "Culture": "en-EN",
            "UserLabel": "Your Sweet Hear",
            "AppLabel": "My Sweet Heart"
          },
          {
            "RelationTypeId": "SweetheartM",
            "Culture": "fr-FR",
            "UserLabel": "Votre chéri",
            "AppLabel": "Mon chéri"
          }
        ]
      }
    ]
