'use strict';

angular.module('xml', [])
      .factory("xmlService", [function () {
    return {
        xmlToJson: function (xmlString, tab) {
            var xml = parseXml(xmlString);
            return xml2json(xml, tab);
      }
    }
  }])