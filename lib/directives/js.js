'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Js = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _assets = require('../assets');

var _assets2 = _interopRequireDefault(_assets);

var _js = require('../builders/js');

var _js2 = _interopRequireDefault(_js);

var _js3 = require('../parsers/js');

var _js4 = _interopRequireDefault(_js3);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @fileoverview JavaScript directive handler.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Js = exports.Js = function (_Base) {
  _inherits(Js, _Base);

  function Js() {
    _classCallCheck(this, Js);

    return _possibleConstructorReturn(this, (Js.__proto__ || Object.getPrototypeOf(Js)).apply(this, arguments));
  }

  _createClass(Js, [{
    key: 'getAsset',


    /**
     * @override
     */
    value: function getAsset(path) {
      var isFullPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      return _assets2.default.findJavaScript(path, isFullPath);
    }

    /**
     * @override
     */

  }, {
    key: 'transform',
    value: function transform(vFile, options) {
      if (_path2.default.extname(vFile.path) === '.coffee') {
        return this.builder.transform(vFile, options);
      }

      try {
        this.parser.parse(vFile.contents.toString());
        var code = this.generateCode(this.getRequires(), options);
        vFile.contents = new Buffer(code);
      } catch (err) {
        console.log("Error: " + vFile.path);
        throw err;
      }
      return vFile;
    }

    /**
     * @override
     */

  }, {
    key: 'newInstance',
    value: function newInstance() {
      return new Js();
    }
  }, {
    key: 'builder',

    /**
     * @override
     */
    get: function get() {
      return _js2.default;
    }

    /**
     * @override
     */

  }, {
    key: 'parser',
    get: function get() {
      if (!this._parser) {
        this._parser = new _js4.default();
      }
      return this._parser;
    }

    /**
     * @override
     */

  }, {
    key: 'assetPaths',
    get: function get() {
      return _assets2.default.javascriptPaths;
    }
  }]);

  return Js;
}(_base2.default);

// singleton


exports.default = new Js();