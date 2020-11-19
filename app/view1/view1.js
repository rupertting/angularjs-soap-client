'use strict';

angular.module('myApp.view1', ['ngRoute'])

  
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    });
  }])

  .factory("soapService", ['$http', function ($http) {
    
    var proxy_url = "http://127.0.0.1:8080/"

    return {
      soap: function (body, soap_url, soapVersion) {
            // build SOAP request
            var sr11 =
                '<?xml version="1.0" encoding="utf-8"?>' +
                  '<soap:Envelope ' +
                  'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
                    '<soap:Body>' + 
                      body +
                    '</soap:Body>' +
                '</soap:Envelope>';
        
            var sr12 =
                '<?xml version="1.0" encoding="utf-8"?>' +
                  '<soap12:Envelope xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">' +
                    '<soap12:Body>' + 
                      body +
                    '</soap12:Body>' +
                '</soap12:Envelope>';
        
        if (soapVersion === "1") {
          return $http.post(proxy_url + soap_url, sr11, { headers: { 'Content-Type': 'text/xml' } });
        }
        return $http.post(proxy_url + soap_url, sr12, { headers: { 'Content-Type': 'text/xml' } });
      }
    }
  }])

  .controller('View1Ctrl', ['$scope', 'soapService', function($scope, soapService) {

    $scope.input = {
      version: null,
      versions: [
        { id: "1", name: '1.1' },
        { id: "2", name: '1.2' }
      ],
      body: null,
      soapUrl: null
    }
    console.log($scope.input);
    $scope.soapSubmit = function () {
      soapService.soap($scope.input.body, $scope.input.soapUrl, $scope.input.version).then(function (response) {
        $scope.result = response.data;
      })
    }
    
  }]);