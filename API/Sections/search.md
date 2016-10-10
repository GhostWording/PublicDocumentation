Search
=================

These apis allow you to get text and images content by doing search in full text mode, keywords match or any other rules.

Service key points:

* [I want to get the best texts by entering a free text search](#FreeTextSearch)
   * get matching texts for text query: 
       * [http://api.cvd.io/search/stickers/fulltextsearch/?text=want to drink&culture=en-EN&gender=H&top=3](http://api.cvd.io/search/stickers/fulltextsearch/?text=want to drink&culture=en-EN&gender=H&top=3)
* [I want to get one random card(text+image) by entering a keyword or free text](#RandomCard)
   * get card (text+image) suggestion for keywords or free text: 
       * [http://api.cvd.io/search/stickers/randomCard/forKeyword/?text=cats and dogs&culture=en-EN](http://api.cvd.io/search/stickers/randomCard/forKeyword/?text=cats and dogs&culture=en-EN)
       
       
<a name="FreeTextSearch">
Free text search
----------------

### Scenario
When I enter some free text I want to have the best suggested texts based on my context.

Exemple: give me the `2` best texts about `have a drink` for my english `en-EN` culture and assuming the recipient is Male (M):

    GET http://api.cvd.io/search/stickers/fulltextsearch/?text=have a drink&culture=en-EN&gender=M&top=2
    
    [
            {
                "Rank": 199,
                "IntentionId": "2E2986",
                "PrototypeId": "482781",
                "TextId": "4AF16F",
                "Content": "Being drunk is like having diplomas. You don't remember much but you're sort of glad."
            },
            {
                "Rank": 144,
                "IntentionId": "F82B5C",
                "PrototypeId": "B05EB7",
                "TextId": "7D3A99",
                "Content": "The last time I asked somebody their news, their wife had left them for their best friend, he was having an operation on his prostate to have the vesicle removed, he was about to lose his licence and job due to being drunk - usually so sober, he was drinking to his father who had been lost at sea.  Since then, I no longer ask for people's news.  But don't hesitate to tell me yours!  Especially if its good news!"
            }
    ]
 
### Definitions

Endoint (GET)
 
     GET http://api.cvd.io/search/{areaInfo}/fulltextsearch/?{querystring}
     
Path options:
     
     * areaInfo : the name of your app (not relevant for the search)
     * querystring:
         * text: text to search
         * culture: language code (en-EN,fr-FR,es-ES)
         * gender: recipient gender (H,M,Male) or (F,Female)
         * top: max number of matching results to return
         
Endpoint (POST)

      POST http://api.cvd.io/search/{areaInfo}/fulltextsearch
      Body: 
      {
         text: string,
         top: int,
         culture: string,
         gender: string
      }
      
Path options:
     
     * areaInfo : the name of your app (not relevant for the search)
      
Return:
     - array of ranked texts
     
Define:
     - ranked text: {
                "Rank": int,
                "IntentionId": string,
                "PrototypeId": string,
                "TextId": string,
                "Content": string
            }
     
     
 

<a name="RandomCard">
Random Card
----------------

### Scenario

When I provide some text or keywords I want in return a card (combination of text + image).

Exemple: when I say `cats and dogs` and my culture is `en-EN`, I get a random card (by full text search):

       GET http://api.cvd.io/search/stickers/randomCard/?text=cats and dogs&culture=en-EN
      
       {
          "IntentionId": "2E2986",
          "PrototypeId": "BA5A34",
          "TextId": "EE0A4F",
          "Content": "Dogs have masters. Cats have staff.",
          "ImageName": "407817_10150426479762606_189882407605_8753160_1282724423_n.jpg",
          "ImageLink": "http://gw-static.azurewebsites.net/canonical/407817_10150426479762606_189882407605_8753160_1282724423_n.jpg",
          "Context": {
            "status": "found",
            "type": "search",
            "image": "RandomMatchingImageForText"
          }
        }
 
### Definitions
 
Endpoint (GET)

      GET http://api.cvd.io/search/{area}/randomCard/?{querystring}
      
Path options:
     
     * areaInfo : the name of your app (not relevant for the search)
     * querystring:
         * text: searched text
         * culture: language code (en-EN,fr-FR,es-ES)
         * gender: gender recipient as (H,M,Male) or (F,Female)
         * top: max number of matching results to return
               
Return:
     - text image card : {
          "IntentionId": string,
          "PrototypeId": string,
          "TextId": string,
          "Content": string,
          "ImageName": string,
          "ImageLink": string,
          "Context": {
            "status": "found" | "notfound",
            "type": "search" | "keyword",
            "image": "PopularImageForText" | "RandomMatchingImageForText" | "RandomPopularImageForIntention" | "NoMatchingImageFoundAtAll"
          }
        }
     
     
 ### Internal workflow
 
 Internaly the service can work with predifined keywords or by doing full text search.
 If the search term matches a keyword in the keywords list then we'll take a random popular text within the intention associated with the keyword.
 If no keyword is found for the search then a full text search is done and a random card is picked among the best matches.
 
 This is the workflow:

- capture parameters
- call keywords service from cache or file (cache for 24h if not in)
- if keyword found then
   - call most popular X texts with their Y images from cache or sql (cache for 24h of not in), X=50 and Y = 20 by default but they can be defined by querystring as maxTexts and maxImages
    - if values found for intention
         - pick one random text
         - pick one random popular image for the text
         - if no image found for the text
                - call popular images for intention service from cache or sql (cache for 24h if not in)
                - if popular images found for intention of the selected text
                     - pick one random and add it to the card with the text
                - if not
                     - call popular images found for the default intention
                     - pick one random and add it to the card
                     - if no image found then fail (it can't happened)
     - if no values found for intention then ask for a popular text/image for default intention
- if no keywords found then do full text search
    - call search service for N best text matches for the search (N=15 by default but can be overrided by querystring param `top=20`   
    - if found some texts
          - pick one random
          - call cache or sql for all popular texts/images (cache for 24h if not) to get most popular images for selected text
           - if images found for text 
               - pick one random and create card
           - if not, call popular images for intention of the selected text
                  - if images found for intention
                        - pick one random and create card
                  - if not, call service for default intention
                        - pick one random and create card

The resulting card will have these properties (ex: 'prendre une bière') :

     {
            "IntentionId": "938493",
            "PrototypeId": "D3DF05",
            "TextId": "396AC7",
             "Content": "Je pense que le nombre de litres de bières consommés en ta compagnie a été à un niveau scandaleusement bas cette année... Je te propose de remonter la jauge l'année prochaine. \r\n\r\n",
              "ImageName": "shutterstock_345984209.jpg",
              "ImageLink": "http://gw-static.azurewebsites.net/canonical/shutterstock_345984209.jpg",
               "Context": {
                    "status": "found",
                    "type": "search",
                    "image": "RandomMatchingImageForText"
               }
      }   

The context contains informations about the search:

* type :  indicate how the text was found : "search" or "keyword" 
* image :  indicate how the image was found

in the exemple we can see that a result was found by doing a full text search and that a popular image associated with the text was found.


