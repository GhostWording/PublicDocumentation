## Get all intentions for your app

Intentions is one of the logical ways of grouping Text entities

As an Intention is available in more than one Area and in order to provide specific information or content depending on this area, you need to provide the
Area name when you call for an Intention or a list of Intentions.

Your call should be:

    GET /{areName}/intentions

As an Intention contains one or more labels, the resulting intentions that the server returns is dependent on the culture of the client browser. It will automatically choose the right one but you can override it by providing the
`Accept-Language header` of your choice.

You will get a collection of Intentions with a format like these:

  
    [{
        "IntentionId": "1CEE9B",
        "UpdateDate": "2013-11-12T18:01:07.443",
        "SortOrder": 160,
        "MediaUrl": null,
        "Culture": "fr-FR",
        "AreaIds": ["CBDDEB"],
        "OtherCultureLabels": [],
        "Slug": "lettre-type-assurance",
        "Label": "Lettres types assurances",
        "MostRecentTextUpdate": "0001-01-01T00:00:00"
      }, {
        "IntentionId": "B47AE0",
        "UpdateDate": "2013-11-12T18:01:07.443",
        "SortOrder": 150,
        "MediaUrl": null,
        "Culture": "fr-FR",
        "AreaIds": ["CBDDEB", "3C834C"],
        "OtherCultureLabels": [],
        "Slug": "condoleances",
        "Label": "Condoléances",
        "MostRecentTextUpdate": "0001-01-01T00:00:00"
      }, {
        "IntentionId": "FFF937",
        "UpdateDate": "2013-11-12T18:01:07.443",
        "SortOrder": 155,
        "MediaUrl": null,
        "Culture": "fr-FR",
        "AreaIds": ["CBDDEB"],
        "OtherCultureLabels": [],
        "Slug": "formules-de-politesse",
        "Label": "Formules de politesse",
        "MostRecentTextUpdate": "0001-01-01T00:00:00"
    }]

The response should have a `200 OK` code, or `404 NOT FOUND` if not found.

Notes:

* The Slug will be used as an identifier for your localized intention:
  
    Slug = IntentionId + Culture
    
* The UpdateDate is the last modification of the intention for this label
* AreaIds contains a list of the areas where that Intention is present
* OtherCultureLabels contains a list of the other cultures existing for that Intention
* MostRecentTextUpdate gives you a freshness indication about the most recent date of modification of a text for this intention.

## Get One

### Get By ID

You may need to get information for one intention from its id:

    GET /{areaName}/intention/{intentionId}
    
exemple:
    
    GET /TestArea/intention/030FD0


### Get By Slug

You can get an indention by it's prototype slug:

    GET /{areaName}/{intentionSlug}
    
exemple:
    
    GET /TestArea/thank-you
    
    
## All areas and intentions

In case you need to have a list of all intentions available, you can get an exhaustive list of all the intentions without any area classification with this simple call:

    GET /intentions

It will return a complete list of intentions with all the details as in the exemples below


