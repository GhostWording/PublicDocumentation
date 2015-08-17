## Definitions

A Text, as presented to the user is called a TextProjection and it is the aggregate between a TextPrototype 
containing core and shared information and a TextRealization corresponding to a version of that prototype 
for a specific culture and with specific attributes. 

Under a same TextPrototype you can have different related realizations : 

* in french from Man to woman, 
* in french from woman to man, 
* in english with no male-female distinctions,
* ...

As for intentions, you need to always specify the Area (or Application Name) in order for the APIs to know what 
application is running

Some text actions are related to culture. The Culture Code is automatically get from your browser. 
That parameter takes the following form:

    en-EN;q=0.4,fr-FR;q=0.6. 
    
The `q` parameter defines the preference (or Affinity): here the fr-FR will be prefered because it's affinity is 0.6 
and en-EN is only 0.4.

You can also, by your choice, specify explicitely the culture in your ajax query with the `Accept-Language` 
definied in the headers you'll send:

    Accept-Language : en-EN;q=0.4,fr-FR;q=0.6

## Get all texts for an intention

When you have an intention, you'll want to get the texts for it. 
From client side, you'll get the text projections for that intention and in the specified culture. 
You can retrieve texts for an intention by intention id or intention slug name

### By Id

A query to get that will have the following form

    GET /{areaName}/intention/{intentionId}/texts
    
exemple:

    GET http://api-cvd-dev.azurewebsites.net/General/intention/BD7387/texts

##### By intention Slug name

A query to get that will have the following form

    GET /{areaName}/{intentionSlug}/texts
    
exemple:
    
    GET http://api-cvd-dev.azurewebsites.net/General/thanks/texts

### By intention Slug and relation type

if you need an additional filtering of the intention with the relation type this is the right api. You can also provide 
optionaly the gender in the query parameters:

    GET /{areaName}/{intentionSlug}/{relationType}/texts?relationtgender={gender}
    
exemple:

    GET http://api.cvd.io/HelloMum/facebook-status/64C63D/texts?relationtgender=H

### Get a projection

Sometimes you should need to reload a text projection, you should do it like that:

    GET /{areaName}/text/{realizationId}

exemple:

    GET http://api-cvd-dev.azurewebsites.net/General/text/014E19

Note that the id passed is the one of the realization, not the one for the prototype

### Get all realizations of a Text prototype

You can also get all the realizations of a same text

    GET /{areaName}/text/realizations/{prototypeId}
    
exemple:
    
    GET http://api-cvd-dev.azurewebsites.net/General/text/realizations/014E19

Note that the id passed is the one of the prototype
