// ***************************************
// Main
// ***************************************
var gwDemo = angular.module('gwDemo',['ngResource']);
var appNameArea = 'DocDemo';
var userLanguage = 'fr-FR';

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
  
};
 
gwDemo.service("api", api);

// ***************************************
// Controllers
// ***************************************
gwDemo.controller('intentionsController', function ($scope, api, $http) {
  $scope.intentions  = api.intentions.getAll();
  
  console.log($scope.intentions);
});