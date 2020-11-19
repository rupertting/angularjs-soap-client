'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
}])

  .controller('View3Ctrl', ['$scope', '$http', function($scope, $http) {
    
    var proxy_url = "http://127.0.0.1:8080/";
    var base_url = "https://joke-api-strict-cors.appspot.com/random_joke";
    var local_url = "jokes/ham-sandwich.json"
    
    $http.get(proxy_url + base_url)
       .then(function (joke) {
         $scope.setup = joke.data.setup;
         $scope.punchline = joke.data.punchline;
       },
         function (response){
           alert(response.data.message);
           return undefined;
         }
       )
}]);