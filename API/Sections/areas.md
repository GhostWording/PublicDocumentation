The root container for GW Apis is the list of areas, this is the place to start.

An area is a virtual application definition containing a list of intentions, a list of available cultures and some other things.

Depending on your account and rights, you'll have access to one or more areas allowing you to have a logical grouping of your intentions.

So what is an intention? An intention is a way to group texts

To start, you should query the areas:

  
    GET /areas
          

You get in return a collection of Areas with an HTTP Status code 

    200 OK.

Note :

- you'll only see the areas you can see with your account.
- The content varies depending on the culture of the client browser. You can override it by providing directly the 

    Accept-Language : myculture in your query

This is the format of what you'll get:

      [
        {
        "AreaId": "3C834C",
        "Name": "General",
        "Intentions": [],
        "AvailableCultures": [{
            "Name": "English",
            "Code": "en-EN",
            "AreasInCulture": [],
            "IntentionsInCulture": []
            }, {
            "Name": "Français",
            "Code": "fr-FR",
            "AreasInCulture": [],
            "IntentionsInCulture": []
            }]
        }, {
        "AreaId": "CBDDEB",
        "Name": "Formalities",
        "Intentions": [],
        "AvailableCultures": [{
            "Name": "Français",
            "Code": "fr-FR",
            "AreasInCulture": [],
            "IntentionsInCulture": []
            }]
        }
      ]

Once you know your area you should get more detail for that area and have a list of intentions. You should get the area with a 

GET on that name:

    GET /{areaName}
        

You'll get a more complete 

Area entity in return with the list of defined intentions for that area with an HTTP Status code 

    200 OK.

The area name is not case sensitive. If you provide a wrong area name, you'll get a 

    404 NOT FOUND code.

The format of the 

Area is the one in that exemple:

    {
        "AreaId": "CBDDEB",
        "Name": "Formalities",
        "Intentions": [{
            "IntentionId": "1CEE9B",
            "CreationDate": "2013-11-12T18:01:07.407",
            "UpdateDate": "2013-11-12T18:01:07.407",
            "LastUpdateBy": null,
            "Comment": null,
            "SortOrder": 160,
            "MediaUrl": null,
            "Areas": [],
            "Labels": [],
            "LabelCultures": [],
            "AreaIds": [],
            "Archived": 0
        }, {
            "IntentionId": "9B2807",
            "CreationDate": "2013-11-12T18:01:07.407",
            "UpdateDate": "2013-11-12T18:01:07.407",
            "LastUpdateBy": null,
            "Comment": null,
            "SortOrder": 200,
            "MediaUrl": null,
            "Areas": [],
            "Labels": [],
            "LabelCultures": [],
            "AreaIds": [],
            "Archived": 0
        }],
        "AvailableCultures": [{
            "Name": "Français",
            "Code": "fr-FR",
            "AreasInCulture": [],
            "IntentionsInCulture": []
        }]
    }
