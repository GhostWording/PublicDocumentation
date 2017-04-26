# Apis - Users informations queries

Users Api is defined as an endpoint to provide count and user list based on users properties queries. For ex: count the number of users of application X in country Y that are in the 18-35 years age range.

These apis are hosted under [http://api.cvd.io/{appName}/users/](http://api.cvd.io/{appName}/users/).

The following endpoints are actually available within the service:

* List of users:
  * [Count users corresponding to the provided properties in querystring](#countforproperties)
    * ex : http://api.cvd.io/MyAppName/users/count?country=Algeria&gender=*
  * [Get the list of facebookids of the users corresponding to the provided properties in querystring](#facebookidsforproperties)
    * ex : http://api.cvd.io/MyAppName/users/facebookids?country=*&gender=female&conjugalsituation=InACouple
  * [Get a list of users with their properties](#userlistwithproperties)
    * get the properties for the users that I provided facebook ids
      * ex : http://api.cvd.io/MyAppName/users/list/facebookids/10154292021876564,10154292021876563,10154292021876569
    * get the properties for the users matching the search criteria
      * ex : http://api.cvd.io/MyAppName/users/list?contry=Tunisia&MBTISelected=*
    * get the properties for the users matching the search criteria for one area only
      * ex : http://api.cvd.io/MyAppName/users/list/stickers?contry=Tunisia&MBTISelected=*
* One User :
  * [Get all the properties of a user by it's id](#userproperties)
    * ex with Facebook id : http://api.cvd.io/MyAppName/users/withfacebookid/10154292021876564
    * ex with Device Id   : http://api.cvd.io/MyAppName/users/withdeviceid/c91df9b2e0620bcb
           

Notes:

* this service is hosted by the http://gw-usersproperties.azurewebsites.net/ app service in isolation
* an url rewrite is used to provide the host under api.cvd.io
* queries are cached for 1h by default
* since 2016-11-02, all the queries involving a list of users are filtered by the date of last connection of the users: we only count or return users connected on the last x hours (x=72h by default)


<a name="countforproperties">

## Count users for properties

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

Additional parameters:

* nbhours = nb hours since the last connection of the user from now. by default it is 72h.

**Catch all search**:
If you want to search for a property and don't care about the value but only want to know if there is a value, you can use `*` as search value.

ex:
     
     country=*&gender=Female&setLanguage=fr
     
This means : give me all female speaking french that I know the country, whatever the contry is.

     
<a name="facebookidsforproperties">

## Get FacebookId of users for properties


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

Get the facebook ids of the users corresponding to the parameters in the querystring:

     GET http://api.cvd.io/{areaId}/users/facebookids?{querystring}
     
     With in path: 
          - areaId    = identifier name of your area
          
     With in querystring (user properties): 
          - age
          - gender
          - country
          - setlanguage
          - conjugalsituation
          - ...
    
The values for each parameter are the exact ones used in the apps

Additional parameters:

* nbhours = nb hours since the last connection of the user from now. by default it is 72h.
* maxusers = nb max of facebook ids to return. List is ordered by last connection time desc, so the last ones are the ones that have been unactive for longuer time. 

**Catch all search**:
If you want to search for a property and don't care about the value but only want to know if there is a value, you can use `*` as search value.

**Filtering**
additionally to the user properties to filter, you can define these parameters:

* nbhours : nb hours max of the last connection of the user from now (default = 72h)
* maxusers : nb max of facebookids to return (default = 50)


ex:
     
     country=*&gender=Female&setLanguage=fr
     
This means : give me all female speaking french that I know the country, whatever the contry is.

   

<a name="userproperties">

## Properties for a user by id

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
     

## Properties for a user by id

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


Additional parameters:

* nbhours = nb hours since the last connection of the user from now. by default it is 72h.
* maxusers = nb max of facebook ids to return. List is ordered by last connection time desc, so the last ones are the ones that have been unactive for longuer time. 

**Filtering**
additionally to the user properties to filter, you can define these parameters:

* nbhours : nb hours max of the last connection of the user from now (default = 72h)
* maxusers : nb max of facebookids to return (default = 50)



3. Get the user list by searching the properties with area filter
this Api work the same way as (2) but it only returns the users of one area:

    GET http://api.cvd.io/{area}/users/list/{filterArea}?{queryString}
     
* Where :
    * area : informative
    * filterArea : app area to filter users
    * queryString : search terms
    

