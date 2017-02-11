'use strict';
describe('PatientData', function() {
  var mockPatientDataResource, $httpBackend,
    sampleData = {
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
      'data': [{
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

  beforeEach(function() {
    angular.mock.inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend');
      mockPatientDataResource = $injector.get('PatientData');
    });
  });
  afterEach(inject(function($httpBackend) {
    //These two calls will make sure that at the end of the test, all expected http calls were made
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  }));
  it('mock http call to get data for a procedure and a patient', inject(function($httpBackend, PatientData) {
    $httpBackend.expectGET('https://dev.medrecord.nl/mrprd/ehr/452/procedure/bloodpressure/omh?authToken=helloletmeinplease')
      .respond(200, sampleData);
    PatientData.getData({
      ehrId: 452,
      procedure: 'bloodpressure'
    });
    $httpBackend.flush();
  }));
});
