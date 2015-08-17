// ***************************************
// Main
// ***************************************
var gwDemo = angular.module('gwDemo',['ngResource']);
var appNameArea = 'DocDemo';
var userLanguage = 'en-EN';

// ***************************************
// Services
// ***************************************
var api = function ($resource) {
  this.intentions = $resource("http://api.cvd.io/"+appNameArea+"/intentions",{},{
    getAll:
    {
      method:'GET',
      cache:true,
      isArray : true,
      headers: {
        "Accept":"application/json", 
        "Accept-Language":userLanguage},
      params:{}
    }
    //note: if you don't set accept-language manually, it
    // will take the one automatically provided by your browser
  }); 
  
  this.texts = $resource("http://api.cvd.io/"+appNameArea+"/:intention/texts",{intention:'@intention'},{ 
    getAll:
    {
      method:'GET',
      cache:true,
      isArray : true,
      headers: {
        "Accept":"application/json",
        "Accept-Language":userLanguage},
      params:{}
    }
  });
  
};
 
gwDemo.service("api", api);
gwDemo.filter('slice', function() {
  return function(arr, start,end) {
    
    if(arr===undefined)
      {
        return arr;
      }
    
    return arr.slice(start, end);
  };
});


// ***************************************
// Controllers
// ***************************************
gwDemo.controller('intentionsController', function ($scope, api, $http) {
  $scope.intentions  = api.intentions.getAll();
  
  console.log($scope.intentions);
  
  $scope.select = function(intention){
    if(intention.texts !== undefined)
      {
        intention.texts = undefined;
      } else
      {
        console.log(intention.texts);
        intention.texts = api.texts.getAll({intention:intention.SlugPrototypeLink});
      }
  };
});