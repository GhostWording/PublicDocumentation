# Apis for popular texts and images

They provide a simple way to access usage data computed everyday

These apis are hosted in [http://gw-bestof.azurewebsites.net](http://gw-bestof.azurewebsites.net).

## Popular Images for Intention

### Description
Get the most popular images for each intention. You get in return an array of intentions with their scoring and for each an array of images with 
their special scoring:
      
      --GET http://gw-bestof.azurewebsites.net/intention/67CC40/images
      GET http://gw-bestof.azurewebsites.net/intention/67CC40/popularimages
      [
        {
          "Images": [
            {
              "ImageName": "shutterstock_188418881.jpg",
              "ImageLink": "http://gw-static.azurewebsites.net/canonical/shutterstock_188418881.jpg",
              "TotalImageForIntention": 22,
              "TotalImageDisplays": 999,
              "ImageIntentionScore": 0.022,
              "ImageRankInIntention": 1,
              "ImageDenseRankInIntention": 1,
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

You can get all intentions with their popular images:

    -- GET http://gw-bestof.azurewebsites.net/intentions/images -- we probably don't want that one
 
** not yet working ** Or the best images for all intentions in your area:

    GET http://gw-bestof.azurewebsites.net/{area-name}/intentions/popularimages
    
Or  You can get images for one intention:

    GET http://gw-bestof.azurewebsites.net/intention/{intentionID}/popularimages

### Content:

The returned content has the following properties for each intention:

* Images: the array with the best of images for the intention
  * ImageName : the name of the image for reference
  * ImageLink : a working link to the image in our images repository,
  --* TotalImageForIntention : number of times the image has been shared in a message conveying this intention,
  * NbSharesForIntention : number of times the image has been shared in a message conveying this intention,
  --* TotalImageDisplays : number of times an image has been displayed with the texts of this intention,
  * NbDisplaysForIntention : number of times an image has been displayed with the texts of this intention,
  --* ImageIntentionScore : image score related to these totals,
  * ScoreForIntention : image score related to these totals,
  --* ImageRankInIntention : the rank of the image in this intention (1 to each image, no equal ranks),
  * RankForIntention : the rank of the image in this intention (1 to each image, no equal ranks),
  --* ImageDenseRankInIntention : the real rank of the image in case of doubles ,
  * DenseRankForIntention : the real rank of the image in case of doubles ,
  * GlobalRank : the global rank of the image accross all intentions
* IntentionId : id of the intention,
* IntentionLabel : the label of the intention for your culture,
-- * TotalLinksForIntention : sum of all selections for the intention, -- we don't want that
-- * IntentionRank : the rank of the intention based on it's displays/links accross all intentions -- we don't want that

### Options

You can define the following parameters:

* **maxrank** : setup how many images to get for each intention, by default it's `10`.
  * exemple : http://gw-bestof.azurewebsites.net/intentions/popularimages?maxrank=3 (get the 3 best images for each intention)
* **culture** : the culture is automatically get from the headers sent with app/browser but you can override it by passing the culture in the querystring
  * exemple : http://gw-bestof.azurewebsites.net/intention/67CC40/popularimages?maxrank=2&culture=es-ES (get 2 best images for each intention with intention labels in spanish)
  
  
## Best texts for Intention

### Description
Get the texts in your culture for the best prototypes for each intention. You get in return an array of intentions with their scoring and
texts with the usual content and their special scoring too. The scoring is based on the number of times texts are displayed and selected in
a message (internally it's an aggregate at the text protype level then the best text for the prototype is choosen):

      GET http://gw-bestof.azurewebsites.net/intention/67CC40/texts?maxrank=2&culture=en-EN
      [
        {
          "Texts": [
            {
              "TotalTextLinksForIntention": 11,
              "TotalPrototypeDisplays": 39,
              "PrototypeIntentionScore": 0.2821,
              "PrototypeRankInIntention": 1,
              "PrototypeDenseRankInIntention": 0,
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
  * TotalTextLinksForIntention : number of times the image has been selected in a message for the texts in this intention,
  * TotalPrototypeDisplays : number of times an image has been displayed with the texts of this intention,
  * PrototypeIntentionScore : image score related to these totals,
  * PrototypeRankInIntention : the rank of the image in this intention (1 to each image, no equal ranks),
  * PrototypeDenseRankInIntention : the real rank of the image in case of doubles ,
  * GlobalRank : the global rank of the image accross all intentions
  * _other properties are the usual text properties_
* IntentionId : id of the actual intention,
* IntentionLabel : the label of the intention for your culture,
* TotalLinksForIntention : sum of all selections for the intention,
* IntentionRank : the rank of the intention based on it's displays/links accross all intentions


### Apis

You can get all intentions with their texts:

    GET http://gw-bestof.azurewebsites.net/intentions/texts
 
** not yet working ** Or the best texts for all intentions in your area:

    GET http://gw-bestof.azurewebsites.net/{area-name}/intentions/texts
    
Or  You can get the texts for one intention only:

    GET http://gw-bestof.azurewebsites.net/intention/{intentionID}/texts

### Options

You can define the following parameters:

* **maxrank** : setup how many texts to get for each intention, by default it's `10`.
  * exemple : http://gw-bestof.azurewebsites.net/intentions/texts?maxrank=3 (get the 3 best texts for each intention)
* **culture** : the culture is automatically get from the headers sent with app/browser but you can override it by passing the culture in the querystring
  * exemple : http://gw-bestof.azurewebsites.net/intention/67CC40/texts?maxrank=2&culture=en-EN (get 2 best texts in english for each intention with intention labels in english too)
   
  



