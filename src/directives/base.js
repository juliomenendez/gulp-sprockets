/**
 * @fileoverview Directive handler base class.
 */

import _    from "lodash";
import path from 'path';
import dir  from '../common/directory';
import fs   from 'fs';
import File from '../common/file';
import { Transformer } from '../transformer';

export default class Base extends Transformer {
  /**
   * @override
   */
  transform(vFile, options) {
    return vFile;
  }

  /**
   * @abstract
   * @return {Object} New directive instance.
   */
  newInstance() {
    throw Error('must be implemented');
  }

  /**
   * @abstract
   * @return {Object} Builder instance.
   */
  get builder() {
    throw Error('must be implemented');
  }

  /**
   * @abstract
   * @return {Class} Parser class.
   */
  get parser() {
    throw Error('must be implemented');
  }

  /**
   * @abstract
   * @return {Array.<String>} Asset paths.
   */
  get assetPaths() {
    throw Error('must be implemented');
  }

  /**
   * @abstract
   * @param {String} p File path.
   * @param {boolean} isFullpath .
   * @return {String} Asset path.
   */
  getAsset(p, isFullPath = false) {
    throw Error('must be implemented');
  }

  /**
   * @return {Array.<String>} Required paths.
   */
  getRequires() {
    let requires = [];
    let includes = [];
    let stubs = [];

    this.parser.comments.forEach((comment) => {
      this.getDirectives(comment).forEach((obj) => {
        switch (obj.directive) {
          case 'require':
            requires.push(this.requireDirective(obj.path));
            break;
          case 'require_tree':
            requires.push.apply(
                requires, this.requireTreeDirective(obj.path));
            break;
          case 'include':
            includes.push(this.includeDirective(obj.path));
            break;
          case 'stub':
            stubs.push(this.stubDirective(obj.path));
            break;
        }
      });
    });

    return _.uniq(requires.filter(function(req) {
      return 0 > stubs.indexOf(req);
    }));
  }

  /**
   * @param {Array.<String>} Required paths.
   * @param {Object} options .
   * @return {String} Replaced code string.
   */
  generateCode(requires, options) {
    const buf = requires.map((req) => {
      const vFile = this.newInstance().transform(File.createVinyl(req), options);
      return vFile.contents.toString();
    });
    return buf.join('\n') + '\n' + this.parser.code();
  }

  /**
   * @param {String} p File path.
   * @return {String} Asset path.
   */
  requireDirective(p) {
    return this.getAsset(p);
  }

  /**
   * @param {String} p Directory path.
   * @return {Array.<String>} Asset paths.
   */
  requireTreeDirective(p) {
    return _.flatten(this.assetPaths.map((assetPath) => {
      const dirPath = path.join(assetPath, p);
      if (fs.existsSync(dirPath)) {
        return dir.list(dirPath, true).map((p2) => {
          return this.getAsset(p2, true);
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
  stubDirective(p) {
    return this.getAsset(p);
  }

  /**
   * @param {String} p File path.
   * @return {String} Asset path.
   */
  includeDirective(p) {
    return this.getAsset(p);
  }

  /**
   * @param {String} comment .
   * @return {Object} Analyzed directive.
   */
  getDirectives(comment) {
    return comment.split('\n').map(function(line) {
      let text = line.replace(/^.*=/, '').trim();
      if (text.match(/^(include|require|require_tree|stub)\s(.+)/)) {
        return { directive: RegExp.$1, path: RegExp.$2 };
      } else {
        return { directive: null, path: null };
      }
    });
  }
}
