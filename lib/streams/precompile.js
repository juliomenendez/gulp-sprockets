'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return _eventStream2.default.through(function (vFile) {
    var file = new _file2.default(vFile);

    _manifest2.default.save(file);
    vFile.path = file.outputRealPath;

    this.emit('data', vFile);
  });
};

var _eventStream = require('event-stream');

var _eventStream2 = _interopRequireDefault(_eventStream);

var _file = require('../common/file');

var _file2 = _interopRequireDefault(_file);

var _manifest = require('../manifest');

var _manifest2 = _interopRequireDefault(_manifest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @fileoverview Precompile stream.
 */

;