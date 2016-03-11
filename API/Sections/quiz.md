# Apis for providing information and content for quiz
These apis are intent to provide content and help to build quizzes withing your apps.

## Best texts for intentions

### Description
in order to help you present the best content for the quiz, we have these apis that select the best texts to present.
The definition of `best text` is actually the sort order defined manually by the texts editor.

### Apis

Get the best texts for all intentions in your area in your culture:

    GET http://api.cvd.io/{area-name}/quiz/intentions/texts
   
Get the best texts for 1 intention in your culture:

    GET http://api.cvd.io/{area-name}/quiz/intention/{intentionID}/texts

Get the best texts for 1 intention automatically selected in your culture:

    GET http://api.cvd.io/{area-name}/quiz/area/texts
 
Get the intention of the day:
    GET http://api.cvd.io/{areaname}/quiz/area/todayintention
    
  
### Content:

The returned content is a list of texts in their usual form for all text apis.

For the `` api, the texts are grouped by intention:

{
    "IntentionId": "016E91",
    "IntentionLabel": "I-think-of-you",
    "Texts": [
        {
            "ImageUrl":"http://...",
            "Text": {
              "TextId": "27F3BB",
              -- other properties --
        },
        -- other texts --
    ]
}



For the intention of the day it's an information about the sorted intention:

      {
        "AreaId": "474865",
        "Name": "LipTip",
        "IntentionId": "F4566D",
        "ModuloRank": 12,
        "MaxRank": 12
      }


### Options

There actually no additional parameter overwise the Culture detected from your browser headers
