'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (options) {
  options = (0, _objectAssign2.default)(defaultOptions(), options);

  return _eventStream2.default.through(function (vFile) {
    if (!vFile.isNull()) {
      vFile = (0, _transformer.transformation)([_js2.default, _js4.default], vFile, options);
    }
    this.emit('data', vFile);
  });
};

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _eventStream = require('event-stream');

var _eventStream2 = _interopRequireDefault(_eventStream);

var _js = require('../builders/js');

var _js2 = _interopRequireDefault(_js);

var _js3 = require('../directives/js');

var _js4 = _interopRequireDefault(_js3);

var _transformer = require('../transformer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function defaultOptions() {
  return { precompile: false };
}

/**
 * @params {Object} options .
 */
/**
 * @fileoverview JavaScript stream.
 */