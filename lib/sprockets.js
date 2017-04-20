'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('babel-polyfill');

var _css = require('./streams/css');

var _css2 = _interopRequireDefault(_css);

var _js = require('./streams/js');

var _js2 = _interopRequireDefault(_js);

var _precompile = require('./streams/precompile');

var _precompile2 = _interopRequireDefault(_precompile);

var _scss = require('./streams/scss');

var _scss2 = _interopRequireDefault(_scss);

var _assets = require('./assets');

var _assets2 = _interopRequireDefault(_assets);

var _manifest = require('./manifest');

var _manifest2 = _interopRequireDefault(_manifest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sprockets = { css: _css2.default, js: _js2.default, precompile: _precompile2.default, scss: _scss2.default };

/**
 * @param {Object} assetPaths .
 * @param {String} manifestPath .
 */
sprockets.declare = function (assetPaths, manifestPath) {
  _assets2.default.init(assetPaths);
  _manifest2.default.init(manifestPath);
};

exports.default = sprockets;