'use strict';

/**
 * @ngdoc function
 * @name medrecordTestApp.controller:BmiCtrl
 * @description
 * # BmiCtrl
 * Controller for setting options and data for BMI Chart and loading its data
 */
angular.module('medrecordTestApp')
  .controller('BmiCtrl', ['$scope', 'PatientData', 'OmhUtils', function BmiCtrl($scope, PatientData, OmhUtils) {

    var colors = ['#2ca02c', '#ff7f0e'];

    $scope.chartTitle = "Body Mass Index";
    $scope.dateRange = '';
    $scope.options = {
      chart: {
        type: 'lineWithFocusChart',
        height: 450,
        margin: {
          top: 20,
          right: 20,
          bottom: 40,
          left: 55
        },
        focusEnable: true,
        focusHeight: 80,
        focusShowAxisX: true,
        focusShowAxisY: false,
        x: function(d) {
          return d.x;
        },
        y: function(d) {
          return d.y;
        },
        useInteractiveGuideline: true,
        transitionDuration: 500,
        xAxis: {
          axisLabel: 'Date/Time',
          staggerLabels: true,
          axisLabelDistance: 15,
          tickFormat: function(d) {
            return d3.time.format('%x %H:%M')(new Date(d));
          }
        },
        x2Axis: {
          tickFormat: function(d) {
            return d3.time.format('%b %Y')(new Date(d));
          },
          showMaxMin: false
        },
        yAxis: {
          axisLabel: 'BMI (kg/m2)',
          axisLabelDistance: -10
        }
      },
    };

    function loadData() {
      PatientData.getData({
        ehrId: $scope.patientRecord,
        procedure: 'bmi'
      }).then(function onSuccess(response) {
        var data = response.data,
          mArray = data.data,
          valueKey = data.settings.measures.body_mass_index.valueKeyPath;

        $scope.dateRange = OmhUtils.getStartDate(mArray) + " to " + OmhUtils.getEndDate(mArray);
        $scope.data = [{
          values: OmhUtils.getMeasurementValues(mArray, valueKey),
          key: 'BMI',
          strokeWidth: 2,
          color: colors[0]
        }];
      });
    }

    loadData();
  }]);
