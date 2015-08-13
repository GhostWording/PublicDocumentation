## Store

Store, is a generic purpose device to server key value store. 
It is build for being able to do simple backups from an identified device to servers

### Store a value

You store values (string or stringified json value), for a key and a storeid. 
Storeid is an id managed by you, it represents the user or the device or both. 
No security is done here, you should use a guid or equivalent to be sure that the store id is unique for your device/client.

      POST /centralstore/{storeid}
      {
      'key':'name of the key',
      'value':'json string'
      }
      
      //returns:
      {
          "Context": "name of the key",
          "Status": "success", //or "error"
          "Message": null      //or the error message    
      }

An exemple:

    POST /centralstore/{storeid}
    {
     'key':'profile',
     'value':'{ age:"35-45",name:"Rui", sex:"male", counter:4}'
    }
    
    //result:
    {
        "Context": "profile",
        "Status": "success",
        "Message": null         
    }

You use the same interface for adding or updating a key, you don't need to care about that

### Get a value for a Key

You just need to provide your storeid and the key you want to read. 
Note that in return you get a full record object, the value is a property inside

    GET /centralstore/{storeid}/{key}
    //returns
    {
        "StoreId": "your store id",
        "Key": "the key",
        "Value": "json string value",
        "Context": null,
        "Created": "2014-03-07T13:37:34.257",
        "Id": "internal id you don't care only usefull for debug"
    }

An exemple:

    GET /centralstore/rui123/profile
    {
        "StoreId": "rui123",
        "Key": "profile",
        "Value": "{ age:\"35-45\", name:\"Rui Carvalho\", sex:\"male\", counter:5}",
        "Context": null,
        "Created": "2014-03-07T13:37:34.257",
        "Id": "12345"
    }
    
    
### Additional information

This store is a very simple key/value store, it's not optimized for queries (requests to get multiple key/values, etc...).
