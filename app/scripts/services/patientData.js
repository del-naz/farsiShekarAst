'use strict';

angular.module('medrecordTestApp.services').
factory('PatientData', ['$http', function PatientData($http) {
  return {
    getData: function(params) {
      return $http.get('https://dev.medrecord.nl/mrprd/ehr/' + params.ehrId +
        '/procedure/' + params.procedure + '/omh', {
          params: {
            authToken: 'helloletmeinplease'
          }
        });
    }
  };
}]);
