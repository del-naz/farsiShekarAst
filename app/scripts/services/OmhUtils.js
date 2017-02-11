'use strict';

angular.module('medrecordTestApp.services', []).
factory('OmhUtils', function() {
  return {
    getStartDate: function(list) {
      if (list && list.length > 0) {
        return d3.time.format('%b %Y')(new Date(list[0].body.effective_time_frame.date_time));

      }
      return '';
    },
    getEndDate: function(list) {
      if (list && list.length > 0) {
        return d3.time.format('%b %Y')(new Date(list[list.length - 1].body.effective_time_frame.date_time));
      }
      return '';
    },

    getMeasurementValues: function(list, key) {
      var length = list.length,
        values = [],
        dt, item;

      for (var i = 0; i < length; i++) {
        item = list[i];
        dt = new Date(item.body.effective_time_frame.date_time);
        values.push({
          x: dt,
          y: eval('item.' + key),
          sourceItem: item.body
        });
      }
      return values;
    }
  };
});
