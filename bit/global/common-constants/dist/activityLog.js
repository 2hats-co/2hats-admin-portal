'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var ACTIVITY_LOG_TYPES = (exports.ACTIVITY_LOG_TYPES = [
  'course-started',
  'learn-world-certificate',
  'course-completed',
  'assessment-started',
  'assessment-submitted',
  'assessment-pass',
  'assessment-fail',
  'job-applied',
  'event-booked',
  'ac-booked',
  'ac-completed',
  'book-ac',
  'system',
]);

var ACTIVITY_LOG_LABELS = (exports.ACTIVITY_LOG_LABELS = ACTIVITY_LOG_TYPES.reduce(
  function(a, v) {
    var _extends2;

    var label = v
      .replace('learn-world', 'LearnWorlds')
      .replace('-', ' ')
      .replace('ac', 'assessment centre')
      .replace('pass', 'passed')
      .replace('fail', 'failed');
    label = label.charAt(0).toUpperCase() + label.slice(1);

    return _extends(
      {},
      a,
      ((_extends2 = {}),
      _defineProperty(_extends2, v, label),
      _defineProperty(_extends2, 'system', ''),
      _extends2)
    );
  },
  {}
));

//# sourceMappingURL=activityLog.js.map
