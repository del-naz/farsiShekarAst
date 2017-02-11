'use strict';
describe('Controller: BP', function () {

  var $controller, $scope, $compile, mockPatientData, $httpBackend, mockOmhUtils,
  sampleData =
  {
    'settings': {
      'measures': {
        'systolic_blood_pressure': {
          'units': 'mm[Hg]',
          'valueKeyPath': 'body.systolic_blood_pressure.value',
          'range': {
            'min': 30,
            'max': 200
          },
          'thresholds': {
            'min': null,
            'max': 120
          }
        },
        'diastolic_blood_pressure': {
          'units': 'mm[Hg]',
          'valueKeyPath': 'body.diastolic_blood_pressure.value',
          'range': {
            'min': 30,
            'max': 200
          },
          'thresholds': {
            'min': null,
            'max': 80
          }
        }
      }
    },
    'data': [
      {
        'header': {
          'id': '71',
          'creation_date_time': '2017-02-10T05:02:46.433+01:00',
          'acquisition_provenance': {
            'source_name': 'Unknown'
          },
          'user_id': '452',
          'schema_id': {
            'namespace': 'omh',
            'name': 'blood-pressure',
            'version': '1.0'
          }
        },
        'body': {
          'effective_time_frame': {
            'date_time': '2015-01-02T19:22:33Z'
          },
          'systolic_blood_pressure': {
            'unit': 'mmHg',
            'value': 107
          },
          'diastolic_blood_pressure': {
            'unit': 'mmHg',
            'value': 71
          }
        }
      },
      {
        'header': {
          'id': '516',
          'creation_date_time': '2017-02-10T05:02:46.433+01:00',
          'acquisition_provenance': {
            'source_name': 'Unknown'
          },
          'user_id': '452',
          'schema_id': {
            'namespace': 'omh',
            'name': 'blood-pressure',
            'version': '1.0'
          }
        },
        'body': {
          'effective_time_frame': {
            'date_time': '2017-02-04T22:01:17.61Z'
          },
          'systolic_blood_pressure': {
            'unit': 'mmHg',
            'value': 105
          },
          'diastolic_blood_pressure': {
            'unit': 'mmHg',
            'value': 70
          }
        }
      }
    ]
  };

  beforeEach(module('medrecordTestApp'));
  beforeEach(module('medrecordTestApp.services'));

  beforeEach(function () {
    angular.mock.inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      mockPatientData = $injector.get('PatientData');
      mockOmhUtils = $injector.get('OmhUtils');
      $scope = $injector.get('$rootScope').$new();
      $controller = $injector.get('$controller');
      $compile = $injector.get('$compile');
    });

    $httpBackend.when('GET','https://dev.medrecord.nl/mrprd/ehr/452/procedure/bloodpressure/omh?authToken=helloletmeinplease')
    .respond(200, sampleData);

    spyOn(mockPatientData, 'getData').and.callThrough();

    $scope.patientRecord = 452;
    $controller('BpCtrl', {
      '$scope': $scope,
      PatientData : mockPatientData,
      OmhUtils: mockOmhUtils
    });
    $httpBackend.flush();
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have the chart title defined', function () {
    expect($scope.chartTitle).toBeDefined();
  });

  it('should call PatientData.getData', function () {
    expect(mockPatientData.getData).toHaveBeenCalled();
  });

  it('should have created chart data', function () {
    expect($scope.data.length).toBe(2);
  });

  it('should create an html that has a heading saying blood pressure', function () {
    var element = $compile("<nvd3 options='options' data='data'></nvd3>")($scope);
    $scope.$digest();
    expect(element.html()).toContain("nv-lineChart");
  });

});
