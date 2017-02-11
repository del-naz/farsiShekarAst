'use strict';
describe('OMHUtils factory', function() {
  var OmhUtils,
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

  beforeEach(inject(function(_OmhUtils_) {
    OmhUtils = _OmhUtils_;
  }));

  it('should exist', function() {
    expect(OmhUtils).toBeDefined();
  });

  describe('.getStartDate()', function() {
    it('should exist', function() {
      expect(OmhUtils.getStartDate).toBeDefined();
    });

    it('should return the start date formatted as month Year', function() {
      expect(OmhUtils.getStartDate(sampleData.data)).toEqual('Jan 2015');
    });
    describe('.getEndDate()', function() {
      it('should exist', function() {
        expect(OmhUtils.getEndDate).toBeDefined();
      });

      it('should return the start date formatted as month Year', function() {
        expect(OmhUtils.getEndDate(sampleData.data)).toEqual('Feb 2017');
      });
    });
    describe('.getMeasurementValues()', function() {
      it('should exist', function() {
        expect(OmhUtils.getMeasurementValues).toBeDefined();
      });

      it('should return an array of coordinate values (x,y)', function() {
        var result =  OmhUtils.getMeasurementValues(sampleData.data,
          'body.systolic_blood_pressure.value');
          expect(result.length).toEqual(2);
          expect(result[0].y).toEqual(107);
      });
    });

  });
});
