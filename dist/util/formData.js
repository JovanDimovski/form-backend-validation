"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.objectToFormData = objectToFormData;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function objectToFormData(object) {
  var formData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new FormData();
  var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  if (object === null || object === 'undefined' || object.length === 0) {
    return formData.append(parent, object);
  }
  for (var property in object) {
    if (object.hasOwnProperty(property)) {
      appendToFormData(formData, getKey(parent, property), object[property]);
    }
  }
  return formData;
}
function getKey(parent, property) {
  return parent ? parent + '[' + property + ']' : property;
}
function appendToFormData(formData, key, value) {
  if (value instanceof Date) {
    return formData.append(key, value.toISOString());
  }
  if (value instanceof File) {
    return formData.append(key, value, value.name);
  }
  if (typeof value === "boolean") {
    return formData.append(key, value ? '1' : '0');
  }
  if (value === null) {
    return formData.append(key, '');
  }
  if (_typeof(value) !== 'object') {
    return formData.append(key, value);
  }
  objectToFormData(value, formData, key);
}