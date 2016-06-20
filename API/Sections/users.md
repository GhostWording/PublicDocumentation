# Apis - Users informations queries

Users Api is defined as an endpoint to provide count and user list based on users properties queries. For ex: count the number of users of application X in country Y that are in the 18-35 years age range.

These apis are hosted under [http://api.cvd.io/{area}/users/](http://api.cvd.io/{area}/users/).

The following endpoints are actually available within the service:

* List of users:
     * [X] [Count users corresponding to the provided properties in querystring](#countforproperties)
           * [x] ex : http://api.cvd.io/liptip/users/count?country=Algeria&gender=*
     * [X] [Get the list of facebookids of the users corresponding to the provided properties in querystring](#facebookidsforproperties)
           * [x]  ex : http://api.cvd.io/liptip/users/facebookids?country=*&gender=female&conjugalsituation=InACouple
     * [X] [Get a list of users with their properties](#userlistwithproperties)
           * [X] get the properties for the users that I provided facebook ids
               * ex : http://api.cvd.io/liptip/users/list/facebookids/10154292021876564,10154292021876563,10154292021876569
           * [X] get the properties for the users matching the search criteria
               * ex : http://api.cvd.io/liptip/users/list?contry=Tunisia&MBTISelected=*
           * [X] get the properties for the users matching the search criteria for one area only
               * ex : http://api.cvd.io/justforinfo/users/list/stickers?contry=Tunisia&MBTISelected=*
* One User :
     * [X] [Get all the properties of a user by it's id](#userproperties)
           * [x] ex with Facebook id : http://api.cvd.io/liptip/users/withfacebookid/10154292021876564
           * [x] ex with Device Id   : http://api.cvd.io/liptip/users/withdeviceid/c91df9b2e0620bcb
           

Notes:
* this service is hosted by the http://gw-usersproperties.azurewebsites.net/ app service in isolation
* an url rewrite is used to provide the host under api.cvd.io
* queries are cached
* __actually there is no automated job to compute these data !!!__

<a name="countforproperties">
Count users for properties
----------------------------

### Description
return the number of users corresponding to the searched properties

### Content:

The api is available as a webpage and in json the format returned is the following:

      {
        "total":123
      }

### Api

It returns the user count for the search.

     GET http://api.cvd.io/{areaId}/users/count?{querystring}
     
     With in path: 
          - areaId    = identifier name of your area
     With in querystring: 
          - age
          - gender
          - country
          - setlanguage
          - conjugalsituation
          - ...
    
The values for each parameter are the exact same ones used in the apps.

**Catch all search**:
If you want to search for a property and don't care about the value but only want to know if there is a value, you can use `*` as search value.

ex:
     
     country=*&gender=Female&setLanguage=fr
     
This means : give me all female speaking french that I know the country, whatever the contry is.

     
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
          - ...
    
The values for each parameter are the exact ones used in the apps

**Catch all search**:
If you want to search for a property and don't care about the value but only want to know if there is a value, you can use `*` as search value.

ex:
     
     country=*&gender=Female&setLanguage=fr
     
This means : give me all female speaking french that I know the country, whatever the contry is.

   

<a name="userproperties">
Properties for a user by id
----------------------------

### Description
return all existing properties for a user by an id. That id is something that allows us to identify an user like the `facebookId` if the user is authentified with Facebook or the `deviceId` that identifies the device where the app is running if you don't have anything else.

### Content:

The api is available as a webpage and in json the format returned is the following:

          {
                "UserId": "1045848478801118",
                "DeviceId": "c91df9b2e0620bcb",
                "FacebookId": "1045848478801118",
                "Properties": {
                  "DeviceId": "c91df9b2e0620bcb",
                  "FacebookId": "1045848478801118",
                  "Age": "18–39",
                  "ConjugalSituation": "InACouple",
                  "Country": "Ukraine",
                  "FacebookFirstName": null,
                  "Gender": "male",
                  "InitialMBTIKnowledge": "Yes",
                  "MBTISelected": "????",
                  "MBTIYesOrNo": "Yes",
                  "SetLanguage": "en",
                  "UserAnimal": "10623538_924399740908222_584042635526052415_o.jpg",
                  "UserFlower": "shutterstock_119283466.jpg",
                  "UserLandscape": "10987377_662955520525947_5015081769844664549_n.jpg",
                  "UserPresentation": "F641BB",
                  ... (other properties defined in the future)...
                }
              }

Note that some properties may be null if the user didn't set them before, we return all the known properties defined for a user.

Actually the `UserId` field is kept for compatibility, it contains the id you used to query the api. In the returned content, you'll get the facebookid and the deviceid also. 

### Api
All the apis return the same content defined before.

Get the properties for the user by facebook id (as identifier of the user)

     GET http://api.cvd.io/{area}/users/withfacebookid/{facebookid}
     
 
Get the properties for the user by device id (as identifier of the device)

     GET http://api.cvd.io/{area}/users/withdeviceid/{deviceid}
     
<a name="userlistwithproperties  ">
Properties for a user by id
----------------------------   

### Description
return all existing properties for a list of users. The list of users can be defined either by providing a list of facebook ids or by searching the properties

### Content:

The api is returning a json array with users and properties, the format  is the following:

          [
            {
                "DeviceId": "c91df9b2e0620bcb",
                "FacebookId": "1045848478801118",
                "Properties": {
                  "DeviceId": "c91df9b2e0620bcb",
                  "FacebookId": "1045848478801118",
                  "Age": "18–39",
                  "ConjugalSituation": "InACouple",
                  "Country": "Ukraine",
                  "FacebookFirstName": null,
                  "Gender": "male",
                  "InitialMBTIKnowledge": "Yes",
                  "MBTISelected": "????",
                  "MBTIYesOrNo": "Yes",
                  "SetLanguage": "en",
                  "UserAnimal": "10623538_924399740908222_584042635526052415_o.jpg",
                  "UserFlower": "shutterstock_119283466.jpg",
                  "UserLandscape": "10987377_662955520525947_5015081769844664549_n.jpg",
                  "UserPresentation": "F641BB",
                  ... (other properties defined in the future)...
                }
            },
            {
                "DeviceId": "c91df9b2e0620bcb",
                "FacebookId": "1045848478801118",
                "Properties": {
                  "DeviceId": "c91df9b2e0620bcb",
                  "FacebookId": "1045848478801118",
                  "Age": "18–39",
                  "ConjugalSituation": "InACouple",
                  "Country": "Ukraine",
                  "FacebookFirstName": null,
                  "Gender": "male",
                  "InitialMBTIKnowledge": "Yes",
                  "MBTISelected": "????",
                  "MBTIYesOrNo": "Yes",
                  "SetLanguage": "en",
                  "UserAnimal": "10623538_924399740908222_584042635526052415_o.jpg",
                  "UserFlower": "shutterstock_119283466.jpg",
                  "UserLandscape": "10987377_662955520525947_5015081769844664549_n.jpg",
                  "UserPresentation": "F641BB",
                  ... (other properties defined in the future)...
                }
            },... other users
        ]

Note that some properties may be null if the user didn't set them before, we return all the known properties defined for a user.

Actually the `UserId` field is kept for compatibility, it contains the id you used to query the api. In the returned content, you'll get the facebookid and the deviceid also. 

### Api
All the apis endpoints return the same content defined above.

1. Get the properties for the users by providing the list of facebook id for the users you want to have the properties:

     GET http://api.cvd.io/{area}/users/list/facebookids/{facebookids}
     
* Where:
    * {facebookids} : list of comma separated values of facebook ids
* Exemple:
    * http://api.cvd.io/liptip/users/list/facebookids/10154292021876564,10154292021876563,10154292021876569
    

2. Get the user list by searching the properties
By providing a list of search criterias in the query string, you'll get in return a list of matching users with their properties.

**Note:_take care of the volume of data! you can have a huge list of users if your search is not precise enough and with a full list of properties for each user, it can be huge. Please as for a count for your search before_.**

    GET http://api.cvd.io/{area}/users/list?{queryString}

* Where :
    * area : this first area in the path is NOT used to filter the results, it's just an information to identify your app
    * queryString:
        * key value pairs to search for (ex: country=Tunisia)
        * catch all operator applies: to get all users with a property set regardless of the value (ex : country=*)

3. Get the user list by searching the properties with area filter
this Api work the same way as (2) but it only returns the users of one area:

    GET http://api.cvd.io/{area}/users/list/{filterArea}?{queryString}
     
* Where :
    * area : informative
    * filterArea : app area to filter users
    * queryString : search terms
    

