# Apis for popular texts and images

They list texts and images that are sent often for a given intention, texts that are sent often with a given image, images that are sent often with a given text. 

These apis are hosted under [http://api.cvd.io/popular/](http://api.cvd.io/popular/).

The following combination of elements are available within the service:

<!-- 
Texts:
* [Texts that are sent often to express a given intention](#TextsForIntention):
      * ex : http://api.cvd.io/popular/liptip/populartexts/intention/67CC40
      * ex : http://api.cvd.io/popular/liptip/populartexts/intention/all
* [Texts that are sent often with a given image](#MatchinTextsForImage): 
      * ex : http://api.cvd.io/popular/liptip/matchingtexts/image/shutterstock_188418881.jpg
      
Images:
* [Images that are sent often to express a given intention](#ImagesForIntentions):
      * ex : http://api.cvd.io/popular/liptip/popularimages/intention/67CC40
* [Images that are sent often with a given text](#ImagesForPrototypes):
      * ex : http://api.cvd.io/popular/liptip/matchingimages/intention/67CC40
      * ex : http://api.cvd.io/popular/liptip/matchingimages/intention/all
      * ex : http://api.cvd.io/popular/liptip/matchingimages/prototypeids/686367,2D21F1,6D8D36
-->
Popular (among users of a given app : MBTIStickers in this example):
* [Texts that are most sent to express a given intention in an area](#TextsForArea):
  - ex : http://api.cvd.io/popular/MyAppName/populartexts/MBTIStickers
      
Popular (in intention):
* Texts that are sent often to express a given intention](#TextsForIntention):
  - ex : http://api.cvd.io/popular/yourapp/populartexts/intention/67CC40
  - ex : http://api.cvd.io/popular/yourapp/populartexts/intention/all/stickers
* [Images that are sent often to express a given intention](#ImagesForIntentions):
  - ex : http://api.cvd.io/popular/yourapp/popularimages/intention/67CC40

Popular (for user properties):
* [Texts that are often send by a MBTI profile](#TextsForMbtiProfile):
  - ex : http://api.cvd.io/popular/yourapp/populartexts/UserProperty/MBTISelected/INTP?maxrank=3&culture=fr-FR
* [Images that are often selected and send by a MBTI profile](#ImagesForMbtiProfile)
  - ex : http://api.cvd.io/popular/yourapp/popularimages/UserProperty/MBTISelected/ENTP?maxrank=3&culture=fr-FR
      

Matching (between texts/images):
* [Texts that are sent often with a given image](#MatchingTextsForImage): 
  - ex : http://api.cvd.io/popular/liptip/matchingtexts/image/shutterstock_188418881.jpg
* [Images that are sent often with a given text](#MatchingImagesForPrototypes):
  - ex : http://api.cvd.io/popular/yourapp/matchingimages/intention/67CC40
  - ex : http://api.cvd.io/popular/yourapp/matchingimages/intention/all/liptip
  - ex : http://api.cvd.io/popular/yourapp/matchingimages/prototypeids/686367,2D21F1,6D8D36




<a name="TextsForArea">

## Popular  texts for an entire area


### Description
Get the texts in your culture for the best prototypes for the whole area. The selection is based on the texts within the intentions of the area but the selection and sorting is done for whole area not by intention. 
You get in return an array of texts with their scoring. 

The scoring is based on the number of times texts are displayed and selected in a message (internally it's an aggregate at the text protype level then the best text for the prototype is choosen):

      GET http://api.cvd.io/popular/liptip/populartexts/liptip?maxrank=2&culture=en-EN
      
              [
          {
            "Scoring": {
              "NbShares": 703,
              "NbDisplays": 1000,
              "Score": 0.001422475106,
              "Rank": 1,
              "DenseRank": 1
            },
            "Text": {
              "TextId": "03997F",
              "IntentionId": "D19840",
              "IntentionSlug": "come-over-for-dinner",
              "IntentionPrototypeSlug": "come-over-for-dinner",
              "IntentionLabel": "come-over-for-dinner",
              "PrototypeId": "F0ACFF",
              "Content": "Ideally we should all eat at least five portions of fruit and vegetables a day. I've got chips and tomato sauce to go with the steak, so that's two already...maybe if you could bring some other vegetable - like, er, chocolate - we could be really healthy. Come on over!",
              "Author": "Unknown",
              "Updated": "2015-04-12T09:02:00",
              "Created": "2014-05-23T17:41:00",
              "SortBy": 15,
              "Sender": "N",
              "Target": "I",
              "PoliteForm": "I",
              "Impersonal": "false",
              "Proximity": "P",
              "Abstract": "",
              "ReferenceUrl": "",
              "ImageUrl": "http://gw-static.azurewebsites.net/specialoccasions/come-over-for-dinner/default/small/iStock_000007368976_Medium.jpg",
              "Culture": "en-EN",
              "IsQuote": false,
              "Status": "published",
              "TagIds": [
                "C2D9A4",
                "E40677",
                "FC0342"
              ],
              "AvailableCultures": [
                "fr-FR"
              ],
              "OtherRealizationIds": [
                "5FD729",
                "F88479"
              ],
              "SuggestedImages": []
            }
          }, ... other texts ...
        ]

### Content:

The returned content has the following properties for each intention:

* Texts: the array with the most popular texts in your culture for the intention with the followin properties:
  * Scoring : the scoring properties for the text:
       * NbShares : number of times the image has been selected in a message for the texts in this intention,
       * NbDisplays : number of times the text prototype has been displayed while showing texts for this intention,
       * Score : score calculated from the number of shares and of displays,
       * Rank : the rank of the text prototype for this intention (1 to each text, no equal ranks),
       * DenseRank : the real rank of the text prototype (doubles appear with the same rank),
* Text : full text object content


### Apis

Get the best texts for an area:

     GET http://api.cvd.io/popular/{area-info}/populartexts/{area-Id}?
     
     With : 
          - area-info    = identifier name of your area (for loggin purposes, no effect on the query)
          - area-id      = identifier of the area for which you want the data
    

### Options

You can add to your query the following parameters:

* **maxrank** : setup how many texts to get for each intention, by default it's `16`.
  * exemple : http://gw-popular.azurewebsites.net/liptip/populartexts/liptip?maxrank=3 (get the 3 most popular texts for the area liptip)
* **culture** : the culture is automatically get from the headers sent with app/browser but you can override it by passing the culture in the querystring
  * exemple : http://gw-popular.azurewebsites.net/liptip/populartexts/liptip?maxrank=2&culture=en-EN (get 2 most popular texts in english for area liptip)
 







<a name="TextsForIntention">

## Popular  texts for Intention

### Description
Get the texts in your culture for the best prototypes for one intention. 
You get in return an array of intentions with their scoring and the corresponding list of texts identifiers and scoring. 

The scoring is based on the number of times texts are displayed and selected in a message (internally it's an aggregate at the text protype level then the best text for the prototype is choosen):

      GET http://api.cvd.io/popular/liptip/populartexts/intention/67CC40?maxrank=2&culture=en-EN
      [
        {
          "Texts": [
            {
              "TextId" : "DEF987",
              "PrototypeId": "ABC123",
              "Scoring": {
                   "NbShares": 22,
                   "NbDisplays": 999,
                   "Score": 0.022,
                   "Rank": 1,
                   "DenseRank": 1
               }
            }, //... (other texts) ...
          ],
          "IntentionId": "67CC40",
          "IntentionSlug": "positive-thoughts",
        }
      ]

### Content:

The returned content has the following properties for each intention:

* Texts: the array with the most popular texts in your culture for the intention with the followin properties:
  * PrototypeId : identifier of the text prototype
  * TextId : identifier of the best matching text in your culture for the prototype
  * Scoring : the scoring properties for the text:
       * NbShares : number of times the image has been selected in a message for the texts in this intention,
       * NbDisplays : number of times the text prototype has been displayed while showing texts for this intention,
       * Score : score calculated from the number of shares and of displays,
       * Rank : the rank of the text prototype for this intention (1 to each text, no equal ranks),
       * DenseRank : the real rank of the text prototype (doubles appear with the same rank),
* IntentionId : id of the actual intention,
* IntentionSlug : the generic slug for the selected intention,


### Apis

Get the best texts for all intentions in your area:

     GET http://api.cvd.io/popular/{area-name}/populartexts/intention/all/{area}
     
     With : 
          - area-name    = identifier name of your area (for info)
          - area         = the area id for which you want the texts
     
Or  You can get the texts for one intention only:

    GET http://api.cvd.io/popular/{area-name}/populartexts/intention/{intentionID}
    
    With : 
          - area-name   = identifier name of your area
          - intentionId = the id of the selected intention
    

### Options

You can add to your query the following parameters:

* **maxrank** : setup how many texts to get for each intention, by default it's `10`.
  * exemple : http://gw-popular.azurewebsites.net/liptip/populartexts/intention/67CC40?maxrank=3 (get the 3 most popular texts for each intention)
* **culture** : the culture is automatically get from the headers sent with app/browser but you can override it by passing the culture in the querystring
  * exemple : http://gw-popular.azurewebsites.net/liptip/populartexts/intention/67CC40?maxrank=2&culture=en-EN (get 2 most popular texts in english for each intention with intention labels in English too)
 


  


<a name="#ImagesForIntentions">

## Popular Images for Intention


### Description
Get the most popular images for each intention. You get in return an array of intentions with their scoring and for each an array of images with their special scoring:
      
      GET http://api.cvd.io/popular/liptip/popularimages/intention/67CC40
      [
        {
          "Images": [
            {
              "ImageName": "shutterstock_188418881.jpg",
              "ImageLink": "http://gw-static.azurewebsites.net/canonical/shutterstock_188418881.jpg",
              "Scoring": {
                   "NbShares": 22,
                   "NbDisplays": 999,
                   "Score": 0.022,
                   "Rank": 1,
                   "DenseRank": 1
               }
            }, // ... other images ...
          ],
          "IntentionId": "67CC40",
          "IntentionSlug": "Pensées positives"
        }
      ]

The scoring is actually based on the number of times an image has been displayed and selected by users to send with a message.

### Apis

Get the best images for all intentions in your area:

     GET http://api.cvd.io/popular/{area-name}/intentions/popularimages
    
     With : 
          - area-name   = identifier name of your area
          
Or  You can get images for one intention:

     GET http://api.cvd.io/popular/{area-name}/intention/popularimages/{intentionID}

     With : 
          - area-name   = identifier name of your area
          - intentionId = the id of the selected intention
          
### Content:

The returned content has the following properties for each intention:

* Images: the array with the best of images for the intention
  * ImageName : the name of the image for reference
  * ImageLink : a working link to the image in our images repository,
  * Scoring : scoring properties for the image:
       * NbShares : number of times the image has been shared in a message conveying this intention,
       * NbDisplays : number of times an image has been displayed with the texts of this intention,
       * Score : image score related to these totals,
       * Rank : the rank of the image in this intention (1 to each image, no equal ranks),
       * DenseRank : the real rank of the image in case of doubles ,
* IntentionId : id of the intention,
* IntentionLabel : the label of the intention for your culture,

### Options

You can define the following parameters:

* **maxrank** : setup how many images to get for each intention, by default it's `10`.
* **culture** : the culture is automatically get from the headers sent with app/browser but you can override it by passing the culture in the querystring

  

<a name="MatchingTextsForImage">

## Matching  texts for Image

### Description
It returns the best prototypes for one image with the most appropriate realization in your culture

      GET http://api.cvd.io/popular/liptip/matchingtexts/image/0x550_2.jpg?maxrank=3&culture=en-EN
      {
        "ImageName": "0x550_2.jpg",
        "ImageLink": "http://gw-static.azurewebsites.net/canonical/0x550_2.jpg",
        "Texts": [
          {
            "TextId": "8514EF",
            "PrototypeId":"432233",
            "Scoring": {
                   "NbShares": 22,
                   "NbDisplays": 999,
                   "Score": 0.022,
                   "Rank": 1,
                   "DenseRank": 1
               }
          }, // -- other texts --
        ]
      }

### Content:

The returned content has the following properties:

* ImageName : the name of the image asked
* ImageLink : a canonical link to the image
* Texts: the array with the best of texts in your culture for the image
     * Scoring : the scoring properties of the text:
       * NbShares : number of times the text has been selected in a message with this image,
       * NbDisplays : number of times the text prototype has been displayed with this image,
       * Score : score calculated from the number of shares and of displays,
       * Rank : the rank of the text prototype within this image (1 to each text, no equal ranks),
       * DenseRank : the real rank of the text prototype within this image (doubles appear with the same rank),
  * PrototypeId : identifier of the text prototype
  * TextId : identifier of the best matching text in your culture for the prototype

### Apis

Get the best texts for one image:

    GET http://api.cvd.io/popular/{area-name}/matchingtexts/image/{image_name}
    
    With:
          - area-name   = identifier name of your area
          - image_name = the name of the selected image (with extention, without path)

### Options

You can define the following parameters:

* **maxrank** : setup how many texts to get for each intention, by default it's `10`.
* **culture** : the culture is automatically get from the headers sent with app/browser but you can override it by passing the culture in the querystring



<a name="#MatchingImagesForPrototypes">

## Matching Images for a text Prototypes


### Description
Get the best matching images for each text prototype (for one, for all in a list or for all in an intention). 
You get in return an array of texts with their scoring and for each an array of images with their special scoring:
      
      GET http://api.cvd.io/popular/liptip/matchingimages/prototypeIds/686367,2D21F1,6D8D36
      [
        {
          "PrototypeId": "686367",
          "Images": [
            {
              "ImageName": "shutterstock_188418881.jpg",
              "ImageLink": "http://gw-static.azurewebsites.net/canonical/shutterstock_188418881.jpg",
              "Scoring": {
                   "NbShares": 22,
                   "NbDisplays": 999,
                   "Score": 0.022,
                   "Rank": 1,
                   "DenseRank": 1
               }
            }, // ... other images ...
          ]
        }
      ]

The scoring is actually based on the number of times an image has been displayed and selected by users to send with a message.

### Apis

Get the best images for all text prototype ids provided as argument:

     GET http://api.cvd.io/popular/{area-name}/matchingimages/prototypeIds/{prototype-ids}
    
     With : 
          - area-name   = identifier name of your area
          - prototype-ids = comma separated list of prototype identifiers
          
     Returns an array of `image with score`
 
Get the best images for all text prototype ids in one intention:

     GET http://api.cvd.io/popular/{area-name}/matchingimages/intention/{intentionid}
    
     With : 
          - area-name   = identifier name of your area
          - intentionid = id of the intention where the texts you want belongs to
          
     Returns an array of `image with score`

Get the best images for all text prototype ids in all intentions in your area:

     GET http://api.cvd.io/popular/{area-name}/matchingimages/intention/all
    
     With : 
          - area-name   = identifier name of your area
          
     Returns an array of `intentions with for each an array of image with score`
          
### Content:

The returned content has the following properties for each intention:

* PrototypeId : the id of one prototype of the list
* Images: the array with the best of images for the intention
  * ImageName : the name of the image for reference
  * ImageLink : a working link to the image in our images repository,
  * Scoring : scoring properties for the image:
       * NbShares : number of times the image has been shared in a message conveying this intention,
       * NbDisplays : number of times an image has been displayed with the texts of this intention,
       * Score : image score related to these totals,
       * Rank : the rank of the image in this intention (1 to each image, no equal ranks),
       * DenseRank : the real rank of the image in case of doubles

### Options

You can define the following parameters:

* **maxrank** : setup how many images to get for each intention, by default it's `10`.
* **culture** : the culture is automatically get from the headers sent with app/browser but you can override it by passing the culture in the querystring



   

