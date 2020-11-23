'use strict';

angular.module('soap', ['proxy'])
      .factory("soapService", ['$http', 'proxyURL', function ($http, proxyURL) {
    
          var proxy_url = proxyURL;
          
    return {
      soapRequest: function (body, soap_url, soapVersion) {
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
        
        if (soapVersion === null) {
          alert("SOAP version required.");
          return;
        }
        
        if (soapVersion === "1") {
          return $http.post(proxy_url + soap_url, sr11, { headers: { 'Content-Type': 'text/xml' } });
        }
        return $http.post(proxy_url + soap_url, sr12, { headers: { 'Content-Type': 'application/soap+xml' } });
      }
    }
  }])