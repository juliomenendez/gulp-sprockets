'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var directory = {
  /**
   * @param {String} root Directory path.
   * @param {boolean} recursively .
   * @return {Array.<String>} List of file path in directory.
   */
  list: function list(root, recursively) {
    var paths = [];

    _fs2.default.readdirSync(root).forEach(function (file) {
      var fullPath = _path2.default.join(root, file);
      var stat = _fs2.default.statSync(fullPath);
      if (stat.isFile()) {
        paths.push(fullPath);
      } else if (recursively && stat.isDirectory()) {
        paths.push.apply(paths, directory.list(fullPath, recursively));
      }
    });

    // remove duplicated paths
    return paths.filter(function (item, i, self) {
      return self.indexOf(item) === i;
    });
  }
};

exports.default = directory;