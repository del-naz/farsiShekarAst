'use strict';
describe('Controller: MainCtrl', function () {

  // Define global references for injections.
  var ctrl, $scope;

  beforeEach(module('medrecordTestApp'));
  beforeEach(module('medrecordTestApp.services'));

  beforeEach(inject(function ($controller, $rootScope) {
    // Instantiate the controller with an object of the dependencies
    $scope = $rootScope.$new();
    ctrl = $controller('MainCtrl', {
      $scope: $scope
    });
  }));

  it('should initializze patient record number to a number', function () {
    expect($scope.patientRecord).toBeDefined();
  });
});
