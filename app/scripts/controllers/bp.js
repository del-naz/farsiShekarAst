'use strict';

/**
 * @ngdoc function
 * @name medrecordTestApp.controller:BpCtrl
 * @description
 * # BpCtrl
 * Controller for setting options and data for Blood Pressure Chart and loading its data
 */
angular.module('medrecordTestApp')
  .controller('BpCtrl', ['$scope', 'PatientData', 'OmhUtils', function BpCtrl($scope, PatientData, OmhUtils) {

    var colors = ['#2ca02c', '#ff7f0e'];

    $scope.chartTitle = "Blood Pressure";
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
        useInteractiveGuideline: false,
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
          axisLabel: 'Blood Pressure (mm[Hg])',
          axisLabelDistance: -10
        },
        tooltip: {
          contentGenerator: function(d) {
            var item = d.point.sourceItem,
              dateVal = new Date(item.effective_time_frame.date_time),
              dt = d3.time.format('%x')(dateVal),
              tm = d3.time.format('%H:%M')(dateVal),
              rows =
              "<tr>" +
              "<td class='key' colspan='2' >" + 'Date: ' + "</td>" +
              "<td class='x-value'>" + dt + "</td>" +
              "</tr>" +
              "<tr>" +
              "<td class='key'  colspan='2' >" + 'Time: ' + "</td>" +
              "<td class='x-value'>" + tm + "</td>" +
              "</tr>" +
              "<tr>" +
              "<td class='legend-color-guide'><div style='background-color: " + colors[0] + ";'></div></td>" +
              "<td class='key'>" + 'Systolic: ' + "</td>" +
              "<td class='x-value'><strong>" + item.systolic_blood_pressure.value + "</strong></td>" +
              "</tr>" +
              "<tr>" +
              "<td class='legend-color-guide'><div style='background-color: " + colors[1] + ";'></div></td>" +
              "<td class='key'>" + 'Diastolic: ' + "</td>" +
              "<td class='x-value'><strong>" + item.diastolic_blood_pressure.value + "</strong></td>" +
              "</tr>";

            return "<table><tbody>" + rows + "</tbody></table>";
          }
        }
      },
    };


    function loadData() {
      PatientData.getData({
        ehrId: $scope.patientRecord,
        procedure: 'bloodpressure'
      }).then(function onSuccess(response) {
        var data = response.data,
          mArray = data.data;

        $scope.successFul = true;
        $scope.dateRange = OmhUtils.getStartDate(mArray) + " to " +  OmhUtils.getEndDate(mArray);
        $scope.data = [{
            values: OmhUtils.getMeasurementValues(mArray, data.settings.measures.systolic_blood_pressure.valueKeyPath),
            key: 'Systolic',
            strokeWidth: 2,
            color: colors[0]
          },
          {
            values: OmhUtils.getMeasurementValues(mArray, data.settings.measures.diastolic_blood_pressure.valueKeyPath),
            key: 'Diastolic',
            color: colors[1],
            classed: 'dashed'
          }
        ];
      });
    }

    loadData();

  }]);
