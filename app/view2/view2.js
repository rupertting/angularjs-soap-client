'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

  .controller('View2Ctrl', ['$scope', '$http', function($scope, $http) {
    
    var proxy_url = "http://127.0.0.1:8080/";
    var base_url = "https://joke-api-strict-cors.appspot.com/random_joke";
    
    $scope.fetchJoke = function (callback) {
     $http.get(proxy_url + base_url)
       .then(function (response) {
         callback(response.data);
        })
    }

    $scope.setup = "";
    $scope.punchline = "";
    
    $scope.processJoke = function (joke) {
       $scope.setup = joke.setup;
       $scope.punchline = joke.punchline;
    }
}]);