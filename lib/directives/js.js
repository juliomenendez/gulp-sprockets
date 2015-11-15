/**
 * @fileoverview JavaScript directive handler.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _assets = require('../assets');

var _assets2 = _interopRequireDefault(_assets);

var _buildersJs = require('../builders/js');

var _buildersJs2 = _interopRequireDefault(_buildersJs);

var _parsersJs = require('../parsers/js');

var _parsersJs2 = _interopRequireDefault(_parsersJs);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var Js = (function (_Base) {
  _inherits(Js, _Base);

  function Js() {
    _classCallCheck(this, Js);

    _get(Object.getPrototypeOf(Js.prototype), 'constructor', this).apply(this, arguments);
  }

  // singleton

  _createClass(Js, [{
    key: 'getAsset',

    /**
     * @override
     */
    value: function getAsset(path) {
      var isFullPath = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      return _assets2['default'].findJavaScript(path, isFullPath);
    }

    /**
     * @override
     */
  }, {
    key: 'transform',
    value: function transform(vFile, options) {
      this.parser.parse(vFile.contents.toString());
      var code = this.generateCode(this.getRequires(), options);
      vFile.contents = new Buffer(code);
      return vFile;
    }
  }, {
    key: 'builder',

    /**
     * @override
     */
    get: function get() {
      return _buildersJs2['default'];
    }

    /**
     * @override
     */
  }, {
    key: 'parser',
    get: function get() {
      if (!this._parser) {
        this._parser = new _parsersJs2['default']();
      }
      return this._parser;
    }

    /**
     * @override
     */
  }, {
    key: 'assetPaths',
    get: function get() {
      return _assets2['default'].javascriptPaths;
    }
  }]);

  return Js;
})(_base2['default']);

exports.Js = Js;
exports['default'] = new Js();