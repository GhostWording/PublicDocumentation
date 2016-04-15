# Apis - Users informations queries

Users Api is defined as an endpoint to provide count and user list based on users properties queries. For ex: count the number of users of 
application X in country Y that are in the 18-35 years age range.

These apis are hosted under [http://api.cvd.io/{area}/users/](http://api.cvd.io/{area}/users/).

The following endpoints are actually available within the service:

* [X] Count users corresponding to the provided properties in querystring
      * [x] ex : http://api.cvd.io/liptip/users/count?country=Algeria&gender=male
* [X] Get the list of facebookids of the users corresponding to the provided properties in querystring
      * [x]  ex : http://api.cvd.io/liptip/users/facebookids?country=Algeria&gender=female&conjugalsituation=InACouple

Notes:
* this service is hosted by the http://gw-usersproperties.azurewebsites.net/ app service in isolation
* an url rewrite is used to provide the host under api.cvd.io
* queries are cached
* ** actually there is no automated job to compute these data !!! **

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
    
