'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _directory = require('../common/directory');

var _directory2 = _interopRequireDefault(_directory);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _file = require('../common/file');

var _file2 = _interopRequireDefault(_file);

var _transformer = require('../transformer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @fileoverview Directive handler base class.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Base = function (_Transformer) {
  _inherits(Base, _Transformer);

  function Base() {
    _classCallCheck(this, Base);

    return _possibleConstructorReturn(this, (Base.__proto__ || Object.getPrototypeOf(Base)).apply(this, arguments));
  }

  _createClass(Base, [{
    key: 'transform',

    /**
     * @override
     */
    value: function transform(vFile, options) {
      return vFile;
    }

    /**
     * @abstract
     * @return {Object} New directive instance.
     */

  }, {
    key: 'newInstance',
    value: function newInstance() {
      throw Error('must be implemented');
    }

    /**
     * @abstract
     * @return {Object} Builder instance.
     */

  }, {
    key: 'getAsset',


    /**
     * @abstract
     * @param {String} p File path.
     * @param {boolean} isFullpath .
     * @return {String} Asset path.
     */
    value: function getAsset(p) {
      var isFullPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      throw Error('must be implemented');
    }

    /**
     * @return {Array.<String>} Required paths.
     */

  }, {
    key: 'getRequires',
    value: function getRequires() {
      var _this2 = this;

      var requires = [];
      var includes = [];
      var stubs = [];

      this.parser.comments.forEach(function (comment) {
        _this2.getDirectives(comment).forEach(function (obj) {
          switch (obj.directive) {
            case 'require':
              requires.push(_this2.requireDirective(obj.path));
              break;
            case 'require_tree':
              requires.push.apply(requires, _this2.requireTreeDirective(obj.path));
              break;
            case 'include':
              includes.push(_this2.includeDirective(obj.path));
              break;
            case 'stub':
              stubs.push(_this2.stubDirective(obj.path));
              break;
          }
        });
      });

      return _lodash2.default.uniq(requires.filter(function (req) {
        return 0 > stubs.indexOf(req);
      }));
    }

    /**
     * @param {Array.<String>} Required paths.
     * @param {Object} options .
     * @return {String} Replaced code string.
     */

  }, {
    key: 'generateCode',
    value: function generateCode(requires, options) {
      var _this3 = this;

      var buf = requires.map(function (req) {
        var vFile = _this3.newInstance().transform(_file2.default.createVinyl(req), options);
        return vFile.contents.toString();
      });
      return buf.join('\n') + '\n' + this.parser.code();
    }

    /**
     * @param {String} p File path.
     * @return {String} Asset path.
     */

  }, {
    key: 'requireDirective',
    value: function requireDirective(p) {
      return this.getAsset(p);
    }

    /**
     * @param {String} p Directory path.
     * @return {Array.<String>} Asset paths.
     */

  }, {
    key: 'requireTreeDirective',
    value: function requireTreeDirective(p) {
      var _this4 = this;

      return _lodash2.default.flatten(this.assetPaths.map(function (assetPath) {
        var dirPath = _path2.default.join(assetPath, p);
        if (_fs2.default.existsSync(dirPath)) {
          return _directory2.default.list(dirPath, true).map(function (p2) {
            return _this4.getAsset(p2, true);
          });
        } else {
          return [];
        }
      }));
    }

    /**
     * @param {String} p File path.
     * @return {String} Asset path.
     */

  }, {
    key: 'stubDirective',
    value: function stubDirective(p) {
      return this.getAsset(p);
    }

    /**
     * @param {String} p File path.
     * @return {String} Asset path.
     */

  }, {
    key: 'includeDirective',
    value: function includeDirective(p) {
      return this.getAsset(p);
    }

    /**
     * @param {String} comment .
     * @return {Object} Analyzed directive.
     */

  }, {
    key: 'getDirectives',
    value: function getDirectives(comment) {
      return comment.split('\n').map(function (line) {
        var text = line.replace(/^.*=/, '').trim();
        if (text.match(/^(include|require|require_tree|stub)\s(.+)/)) {
          return { directive: RegExp.$1, path: RegExp.$2 };
        } else {
          return { directive: null, path: null };
        }
      });
    }
  }, {
    key: 'builder',
    get: function get() {
      throw Error('must be implemented');
    }

    /**
     * @abstract
     * @return {Class} Parser class.
     */

  }, {
    key: 'parser',
    get: function get() {
      throw Error('must be implemented');
    }

    /**
     * @abstract
     * @return {Array.<String>} Asset paths.
     */

  }, {
    key: 'assetPaths',
    get: function get() {
      throw Error('must be implemented');
    }
  }]);

  return Base;
}(_transformer.Transformer);

exports.default = Base;