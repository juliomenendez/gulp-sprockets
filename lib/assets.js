'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Assets = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @fileoverview Assets configurations.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function defaultAssetPaths() {
  return {
    app: null,
    javascripts: [],
    stylesheets: [],
    images: []
  };
}

var Assets = exports.Assets = function () {
  function Assets() {
    _classCallCheck(this, Assets);

    this._assetPath = null;
    this._javascriptPaths = [];
    this._stylesheetPaths = [];
    this._imagePaths = [];
  }

  /**
   * @param {Object} assetPaths .
   */


  _createClass(Assets, [{
    key: 'init',
    value: function init(assetPaths) {
      assetPaths = (0, _objectAssign2.default)(defaultAssetPaths(), assetPaths);

      this._assetPath = _path2.default.resolve(assetPaths.app);

      this._javascriptPaths = _lodash2.default.flatten([_path2.default.join(this._assetPath, 'javascripts'), assetPaths.javascripts.map(function (p) {
        return _path2.default.resolve(p);
      })]);

      this._stylesheetPaths = _lodash2.default.flatten([_path2.default.join(this._assetPath, 'stylesheets'), assetPaths.stylesheets.map(function (p) {
        return _path2.default.resolve(p);
      })]);

      this._imagePaths = _lodash2.default.flatten([_path2.default.join(this._assetPath, 'images'), assetPaths.images.map(function (p) {
        return _path2.default.resolve(p);
      })]);
    }

    /**
     * @return {Array.<String>} .
     */

  }, {
    key: 'findJavaScript',


    /**
     * @param {String} filePath .
     * @param {boolean} isFullPath .
     * @return {String} Asset path.
     */
    value: function findJavaScript(filePath) {
      var isFullPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var extnames = ['.js', '.js.coffee', '.coffee'];
      return this._find(filePath, isFullPath ? null : this._javascriptPaths, extnames);
    }

    /**
     * @param {String} filePath .
     * @param {boolean} isFullPath .
     * @return {String} Asset path.
     */

  }, {
    key: 'findStyleSheet',
    value: function findStyleSheet(filePath) {
      var isFullPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var extnames = ['.css', '.css.scss', '.scss', '.sass'];
      return this._find(filePath, isFullPath ? null : this._stylesheetPaths, extnames);
    }

    /**
     * @param {String} filePath .
     * @param {boolean} isFullPath .
     * @return {String} Asset path.
     */

  }, {
    key: 'findImage',
    value: function findImage(filePath) {
      var isFullPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var extnames = ['.jpg', 'jpeg', '.png'];
      return this._find(filePath, isFullPath ? null : this._imagePaths, extnames);
    }

    /**
     * @private
     */

  }, {
    key: '_find',
    value: function _find(filePath, assetPaths, extnames) {
      var _this = this;

      if (!filePath) {
        throw Error('file path is not defined');
      }

      var res = null;

      if (assetPaths && assetPaths.length) {
        res = _lodash2.default.unique(_lodash2.default.flatten(assetPaths.map(function (p) {
          return extnames.map(function (extname) {
            return _this._autoExtname(_path2.default.join(p, filePath), extname);
          });
        }))).find(function (p) {
          return _fs2.default.existsSync(p);
        });
      } else {
        res = filePath;
      }

      if (!res) {
        throw Error(filePath + ' is not found in ' + (assetPaths || []).join(','));
      }
      return res;
    }

    /**
     * @private
     */

  }, {
    key: '_autoExtname',
    value: function _autoExtname(filePath, extname) {
      if (_path2.default.extname(filePath) !== extname) {
        return filePath + extname;
      } else {
        return filePath;
      }
    }
  }, {
    key: 'assetPaths',
    get: function get() {
      return this._assetPaths;
    }

    /**
     * @return {Array.<String>} .
     */

  }, {
    key: 'javascriptPaths',
    get: function get() {
      return this._javascriptPaths;
    }

    /**
     * @return {Array.<String>} .
     */

  }, {
    key: 'stylesheetPaths',
    get: function get() {
      return this._stylesheetPaths;
    }

    /**
     * @return {Array.<String>} .
     */

  }, {
    key: 'imagePaths',
    get: function get() {
      return this._imagePaths;
    }
  }]);

  return Assets;
}();

// singleton


exports.default = new Assets();