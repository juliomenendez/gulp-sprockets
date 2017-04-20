'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scss = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nodeSass = require('node-sass');

var _nodeSass2 = _interopRequireDefault(_nodeSass);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _file = require('../common/file');

var _file2 = _interopRequireDefault(_file);

var _assets = require('../assets');

var _assets2 = _interopRequireDefault(_assets);

var _manifest = require('../manifest');

var _manifest2 = _interopRequireDefault(_manifest);

var _transformer = require('../transformer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @fileoverview Sass(Scss) builder.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Return file path from manifest.
 *
 * @param {String} url .
 * @return {String} Manifest path.
 */
function assetHashPath(url) {
  var parsedUrl = _path2.default.parse(url.getValue());
  var asset = _manifest2.default.getAssetValue(parsedUrl.base);
  return _nodeSass2.default.types.String('url("' + asset + '")');
}

/**
 * Return file path.
 *
 * @param {String} url .
 * @return {String} Raw asset path.
 */
function assetPath(url) {
  var parsedUrl = _path2.default.parse(url.getValue());
  return _nodeSass2.default.types.String('url("' + parsedUrl.base + '")');
}

// export for test

var Scss = exports.Scss = function (_Transformer) {
  _inherits(Scss, _Transformer);

  function Scss() {
    _classCallCheck(this, Scss);

    return _possibleConstructorReturn(this, (Scss.__proto__ || Object.getPrototypeOf(Scss)).apply(this, arguments));
  }

  _createClass(Scss, [{
    key: 'transform',

    /**
     * @param {Vinyl} vFile The vinyl object.
     * @param {Object} options .
     * @return {Vinyl} Transformed vinyl object.
     */
    value: function transform(vFile, options) {
      var func = options.precompile ? assetHashPath : assetPath;
      var compiled = _nodeSass2.default.renderSync({
        file: vFile.path,
        outputStyle: 'expanded',
        functions: {
          "asset-path($url)": func,
          "image-url($url)": func
        },
        includePaths: _assets2.default.stylesheetPaths.concat([_path2.default.dirname(vFile.path)])
      });
      vFile.contents = new Buffer(compiled.css.toString());
      return vFile;
    }
  }]);

  return Scss;
}(_transformer.Transformer);

// singleton


exports.default = new Scss();