'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (options) {
  options = (0, _objectAssign2.default)(defaultOptions(), options);

  return _eventStream2.default.through(function (vFile) {
    vFile = _scss2.default.transform(vFile, options);
    this.emit('data', vFile);
  });
};

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _eventStream = require('event-stream');

var _eventStream2 = _interopRequireDefault(_eventStream);

var _scss = require('../builders/scss');

var _scss2 = _interopRequireDefault(_scss);

var _transformer = require('../transformer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @fileoverview SCSS stream.
 */

function defaultOptions() {
  return { precompile: false };
}

/**
 * @params {Object} options .
 */