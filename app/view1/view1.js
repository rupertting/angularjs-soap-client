'use strict';

angular.module('myApp.view1', ['ngRoute', 'angularSoap'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    });
  }])

  .factory("testService", ['$soap', function ($soap) {
    var proxy_url = "http://127.0.0.1:8080/"
    var base_url = "https://www.dataaccess.com/webservicesserver/NumberConversion.wso"

    return {
      NumberToWords: function (number) {
        return $soap.post(proxy_url + base_url, "NumberToWords", { number: number });
      }
    }
  }])
  
  .controller('View1Ctrl', function ($scope, testService) {

    $scope.returnHello = function(number){
      console.log('return hello');
      $scope.message = 'Return Hello' + number;
      }

    $scope.returnWords = function(number) {
      console.log("return words");

      testService.NumberToWords(number).then(function (response) {
        $scope.result = response;
      }); 
    }
  })