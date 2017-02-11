'use strict';

/**
 * @ngdoc overview
 * @name medrecordTestApp
 * @description
 * # medrecordTestApp
 *
 * Main module of the application.
 */
angular
  .module('medrecordTestApp', [
    'ui.router',
    'nvd3',
    'medrecordTestApp.services'
  ])
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise("/bp");
      $stateProvider
        .state('bmi', {
          url: '/bmi',
          templateUrl: 'views/chart.html',
          controller: 'BmiCtrl'
        })
        .state('bp', {
          url: '/bp',
          templateUrl: 'views/chart.html',
          controller: 'BpCtrl'
        })
        .state('acq', {
          url: '/acq',
          templateUrl: 'views/chart.html',
          controller: 'AcqCtrl'
        });
    }
  ])
  .controller('MainCtrl', ['$scope',
    function MainCtrl($scope) {
      $scope.patientRecord = 452;
    }
  ]);
