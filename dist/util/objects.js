"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cloneDeep = cloneDeep;
exports.isArray = isArray;
exports.isFile = isFile;
exports.merge = merge;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function isArray(object) {
  return Object.prototype.toString.call(object) === '[object Array]';
}
function isFile(object) {
  return object instanceof File || object instanceof FileList;
}
function merge(a, b) {
  for (var key in b) {
    a[key] = cloneDeep(b[key]);
  }
}
function cloneDeep(object) {
  if (object === null) {
    return null;
  }
  if (isFile(object)) {
    return object;
  }
  if (Array.isArray(object)) {
    var clone = [];
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        clone[key] = cloneDeep(object[key]);
      }
    }
    return clone;
  }
  if (_typeof(object) === 'object') {
    var _clone = {};
    for (var _key in object) {
      if (object.hasOwnProperty(_key)) {
        _clone[_key] = cloneDeep(object[_key]);
      }
    }
    return _clone;
  }
  return object;
}