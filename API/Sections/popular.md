# Apis for popular texts and images

They provide a simple way to access usage data computed everyday

These apis are hosted in [http://gw-popular.azurewebsites.net](http://gw-bestof.azurewebsites.net).

## Popular Images for Intention

### Description
Get the most popular images for each intention. You get in return an array of intentions with their scoring and for each an array of images with 
their special scoring:
      
      GET http://gw-bestof.azurewebsites.net/liptip/intention/67CC40/popularimages
      [
        {
          "Images": [
            {
              "ImageName": "shutterstock_188418881.jpg",
              "ImageLink": "http://gw-static.azurewebsites.net/canonical/shutterstock_188418881.jpg",
              "NbSharesForIntention": 22,
              "NbDisplaysForIntention": 999,
              "ScoreForIntention": 0.022,
              "RankForIntention": 1,
              "DenseRankForIntention": 1,
              "GlobalRank": 262
            }, ...
          ],
          "IntentionId": "67CC40",
          "IntentionLabel": "Pensées positives",
          "TotalLinksForIntention": 14494,
          "IntentionRank": 3
        }
      ]

The scoring is actually based on the number of times an image has been displayed and selected by users to send with a message.

### Apis

Get the best images for all intentions in your area:

    GET http://gw-bestof.azurewebsites.net/{area-name}/intentions/popularimages
    
Or  You can get images for one intention:

    GET http://gw-bestof.azurewebsites.net/intention/{intentionID}/popularimages

### Content:

The returned content has the following properties for each intention:

* Images: the array with the best of images for the intention
  * ImageName : the name of the image for reference
  * ImageLink : a working link to the image in our images repository,
  * NbSharesForIntention : number of times the image has been shared in a message conveying this intention,
  * NbDisplaysForIntention : number of times an image has been displayed with the texts of this intention,
  * ScoreForIntention : image score related to these totals,
  * RankForIntention : the rank of the image in this intention (1 to each image, no equal ranks),
  * DenseRankForIntention : the real rank of the image in case of doubles ,
  * GlobalRank : the global rank of the image accross all intentions
* IntentionId : id of the intention,
* IntentionLabel : the label of the intention for your culture,

### Options

You can define the following parameters:

* **maxrank** : setup how many images to get for each intention, by default it's `10`.
  * exemple : http://gw-bestof.azurewebsites.net/liptip/intentions/popularimages?maxrank=3 (get the 3 most popular images for each intention)
* **culture** : the culture is automatically get from the headers sent with app/browser but you can override it by passing the culture in the querystring
  * exemple : http://gw-bestof.azurewebsites.net/liptip/intention/67CC40/popularimages?maxrank=2&culture=es-ES (get 2 most popular images for each intention with intention labels in spanish)
  
  
## Popular  texts for Intention

### Description
Get the texts in your culture for the best prototypes for each intention. You get in return an array of intentions with their scoring and
texts with the usual content and their special scoring too. The scoring is based on the number of times texts are displayed and selected in a message (internally it's an aggregate at the text protype level then the best text for the prototype is choosen):

      GET http://gw-bestof.azurewebsites.net/liptip/intention/67CC40/populartexts?maxrank=2&culture=en-EN
      [
        {
          "Texts": [
            {
              "NbSharesForIntention": 11,
              "NbDisplaysForIntention": 39,
              "ScoreForIntention": 0.2821,
              "RankForIntention": 1,
              "DenseRankForIntention": 0,
              "GlobalRank": 19,
              -- other usual text properties ommited here for brievety --
             
            }, ...
          ],
          "IntentionId": "67CC40",
          "IntentionLabel": "positive-thoughts",
          "TotalLinksForIntention": 18093,
          "IntentionRank": 3
        }
      ]

### Content:

The returned content has the following properties for each intention:

* Texts: the array with the best of texts in your culture for the intention
  * NbSharesForIntention : number of times the image has been selected in a message for the texts in this intention,
  * NbDisplaysForIntention : number of times the text prototype has been displayed while showing texts for this intention,
  * ScoreForIntention : score calculated from the number of shares and of displays,
  * RankForIntention : the rank of the text prototype for this intention (1 to each image, no equal ranks),
  * DenseRankForIntention : the real rank of the text prototype in case of doubles ,
  * GlobalRank : the global rank of the text prototype accross all intentions
  * _other properties are the usual text properties_
* IntentionId : id of the actual intention,
* IntentionLabel : the label of the intention for your culture,


### Apis

Get the best texts for all intentions in your area:

    GET http://gw-bestof.azurewebsites.net/{area-name}/intentions/populartexts
    
Or  You can get the texts for one intention only:

    GET http://gw-bestof.azurewebsites.net/intention/{intentionID}/populartexts

### Options

You can define the following parameters:

* **maxrank** : setup how many texts to get for each intention, by default it's `10`.
  * exemple : http://gw-bestof.azurewebsites.net/liptip/intentions/populartexts?maxrank=3 (get the 3 most popular texts for each intention)
* **culture** : the culture is automatically get from the headers sent with app/browser but you can override it by passing the culture in the querystring
  * exemple : http://gw-bestof.azurewebsites.net/liptip/intention/67CC40/populartexts?maxrank=2&culture=en-EN (get 2 most popular texts in english for each intention with intention labels in English too)
   

