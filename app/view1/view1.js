'use strict';

angular.module('myApp.view1', ['ngRoute'])

  
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    });
  }])

  .factory("soapService", [function () {
    var base_url = "https://www.dataaccess.com/webservicesserver/NumberConversion.wso"
    var proxy_url = "http://127.0.0.1:8080/"

    return {
      soap: function () {
        var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', proxy_url + base_url, true);

            // build SOAP request
            var sr =
                '<?xml version="1.0" encoding="utf-8"?>' +
                  '<soap:Envelope ' +
                  'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
                    '<soap:Body>' + 
                      '<NumberToWords xmlns="http://www.dataaccess.com/webservicesserver/">' +
                        '<ubiNum>500</ubiNum>' +
                      '</NumberToWords>' +
                    '</soap:Body>' +
                  '</soap:Envelope>';

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                  if (xmlhttp.status == 200) {
                      alert(xmlhttp.responseText);
                    }
                }
            }
            // Send the POST request
            xmlhttp.setRequestHeader('Content-Type', 'text/xml');
            xmlhttp.send(sr);
            // send request
            // ...
      }
    }
  }])

  .controller('View1Ctrl', ['$scope', 'soapService', function($scope, soapService) {

    $scope.soap = function () {
      return soapService.soap();
    }
    
  }]);