'use strict';

angular.module('myApp.view1', ['ngRoute', 'proxy', 'soap', 'xml'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    });
  }])

  .controller('View1Ctrl', ['$scope', 'soapService', 'xmlService', function($scope, soapService, xmlService) {
    $scope.input = {
      version: null,
      versions: [
        { id: "1", name: '1.1' },
        { id: "2", name: '1.2' }
      ],
      body: null,
      soapUrl: null
    }
    
    $scope.soapSubmit = function (callback) {
      soapService.soapRequest($scope.input.body, $scope.input.soapUrl, $scope.input.version)
        .then(function (response) {
          callback(response.data);
      })
    }

    $scope.xmlToJson = function (xml) {
      $scope.result = xmlService.xmlToJson(xml, " ");
    }

    $scope.reset = function () {
      $scope.input.version = null;
      $scope.input.body = null;
      $scope.input.soapUrl = null;
    }
    
  }]);