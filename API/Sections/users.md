# Apis - Users informations queries

Users Api is defined as an endpoint to provide count and user list based on users properties queries. For ex: count the number of users of application X in country Y that are in the 18-35 years age range.

These apis are hosted under [http://api.cvd.io/{area}/users/](http://api.cvd.io/{area}/users/).

The following endpoints are actually available within the service:

* [X] [Count users corresponding to the provided properties in querystring](#countforproperties)
      * [x] ex : http://api.cvd.io/liptip/users/count?country=Algeria&gender=male
* [X] [Get the list of facebookids of the users corresponding to the provided properties in querystring](#facebookidsforproperties)
      * [x]  ex : http://api.cvd.io/liptip/users/facebookids?country=Algeria&gender=female&conjugalsituation=InACouple
* [X] [Get all the properties of a user by it's id](#userproperties)
      * [x] ex : http://api.cvd.io/liptip/users/withfacebookid/10154292021876564
      

Notes:
* this service is hosted by the http://gw-usersproperties.azurewebsites.net/ app service in isolation
* an url rewrite is used to provide the host under api.cvd.io
* queries are cached
* __actually there is no automated job to compute these data !!!__

<a name="countforproperties">
Count users for properties
----------------------------

### Description
return the number of users corresponding to some properties

### Content:

The api is available as a webpage and in json the format returned is the following:

      {
        "total":123
      }

### Api

Get the best texts for all intentions in your area:

     GET http://api.cvd.io/{areaId}/users/count?{querystring}
     
     With in path: 
          - areaId    = identifier name of your area
     With in querystring: 
          - age
          - gender
          - country
          - setlanguage
          - conjugalsituation
    
   The values for each parameter are the ones used in the apps
     
<a name="facebookidsforproperties">
Get FacebookId of users for properties
----------------------------

### Description
return an array of facebook id for users corresponding to some properties

### Content:

The api is available as a webpage and in json the format returned is the following:

      [
        "123",
        "456",
        "789"
      ]

### Api

Get the best texts for all intentions in your area:

     GET http://api.cvd.io/{areaId}/users/facebookids?{querystring}
     
     With in path: 
          - areaId    = identifier name of your area
     With in querystring: 
          - age
          - gender
          - country
          - setlanguage
          - conjugalsituation
    
   The values for each parameter are the ones used in the apps



<a name="userproperties">
Properties for a user by id
----------------------------

### Description
return all existing properties for a user by it's facebook id (actual only user auth available)

### Content:

The api is available as a webpage and in json the format returned is the following:

          {
            "UserId": "10154292021876564",
            "Properties": {
              "Age": "18–39",
              "ConjugalSituation": "Single",
              "Country": "United Kingdom",
              "Gender": "male",
              "InitialMBTIKnowledge": "No",
              "MBTISelected": "INTP",
              "MBTIYesOrNo": "Yes",
              "SetLanguage": "fr"
            }
          }

Note that some properties may be null if the user didn't set them before.
### Api

Get the properties for the user by facebook id (as identifier of the user)

     GET http://api.cvd.io/{area}/users/withfacebookid/{facebookid}
     
     
