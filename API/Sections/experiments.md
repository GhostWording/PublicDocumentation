# Experiments

## Actual Api Experiment

Actually, there is a small endpoint giving you the information about the actual api version experiment name.

### Endpoint

    GET http://api.cvd.io/{appName}/experiment/current
    accept:application/json
    
    
### Response

Response contains an object with actual experiment name and variation:

     {
        "ExperimentId": "{name}",
        "VariationId": {number},
        "Area": "{appName}"
      }
      
where:
 
* name : name of the actual experiment
* number : the number of the current experiment's variation
* areaName : the name of your app

This experiment is managed by admin. 

