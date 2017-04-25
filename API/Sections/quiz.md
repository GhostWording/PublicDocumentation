# Apis to get quiz questions for users
Those questions typicaly allow to build a portrait of a user by asking how he would like to be told things

## Getting intentions and texts for quizzes

### Description
for some Intentions such as "I love you", texts can be used to quiz users : they choose which texts they prefer or try to guess what others will prefer. 
In most cases, a specific area such as LipTipQuiz will be use to list intentions participating in a Quiz
### Main Api

Get quiz texts for an intention

    GET http://api.cvd.io/{area-name}/quiz/intention/{intentionID}/texts
    Area name is the area name of the app, for example LipTip or StatusHero

### Other Apis

Get all available quiz texts for all intentions of an area (number of texts will vary depending on the culture you provide)

    GET http://api.cvd.io/LipTipQuiz/quiz/intentions/texts
    GET http://api.cvd.io/StickersQuiz/quiz/intentions/texts
    Area name is the area name of the app, for example LipTip or StatusHero
 
Get one randomly selected intention which has quiz texts available (number of texts will vary depending on the culture you provide)

    GET http://api.cvd.io/{areaname}/quiz/area/todayintention

Get quiz texts for one automatically selected Intention (number of texts will vary depending on the culture you provide)

    GET http://api.cvd.io/{area-name}/quiz/area/texts
    
  
### Content:

The returned content is a list of texts in their usual form for all text apis.

When an api, provides quiz texts for several intentions, the texts are grouped by intention:

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

There are actually no additional parameter appart from the Culture provided in the hearder
