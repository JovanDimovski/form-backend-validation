"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Errors = _interopRequireDefault(require("./Errors"));
var _util = require("./util");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var Form = /*#__PURE__*/function () {
  /**
   * Create a new Form instance.
   *
   * @param {object} data
   * @param {object} options
   */
  function Form() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, Form);
    this.processing = false;
    this.successful = false;
    this.withData(data).withOptions(options).withErrors({});
  }
  _createClass(Form, [{
    key: "withData",
    value: function withData(data) {
      if ((0, _util.isArray)(data)) {
        data = data.reduce(function (carry, element) {
          carry[element] = '';
          return carry;
        }, {});
      }
      this.setInitialValues(data);
      this.errors = new _Errors["default"]();
      this.processing = false;
      this.successful = false;
      for (var field in data) {
        (0, _util.guardAgainstReservedFieldName)(field);
        this[field] = data[field];
      }
      return this;
    }
  }, {
    key: "withErrors",
    value: function withErrors(errors) {
      this.errors = new _Errors["default"](errors);
      return this;
    }
  }, {
    key: "withOptions",
    value: function withOptions(options) {
      this.__options = {
        resetOnSuccess: true
      };
      if (options.hasOwnProperty('resetOnSuccess')) {
        this.__options.resetOnSuccess = options.resetOnSuccess;
      }
      if (options.hasOwnProperty('onSuccess')) {
        this.onSuccess = options.onSuccess;
      }
      if (options.hasOwnProperty('onFail')) {
        this.onFail = options.onFail;
      }
      var windowAxios = typeof window === 'undefined' ? false : window.axios;
      this.__http = options.http || windowAxios || require('axios');
      if (!this.__http) {
        throw new Error('No http library provided. Either pass an http option, or install axios.');
      }
      return this;
    }

    /**
     * Fetch all relevant data for the form.
     */
  }, {
    key: "data",
    value: function data() {
      var data = {};
      for (var property in this.initial) {
        data[property] = this[property];
      }
      return data;
    }

    /**
     * Fetch specific data for the form.
     *
     * @param {array} fields
     * @return {object}
     */
  }, {
    key: "only",
    value: function only(fields) {
      var _this = this;
      return fields.reduce(function (filtered, field) {
        filtered[field] = _this[field];
        return filtered;
      }, {});
    }

    /**
     * Reset the form fields.
     */
  }, {
    key: "reset",
    value: function reset() {
      (0, _util.merge)(this, this.initial);
      this.errors.clear();
    }
  }, {
    key: "setInitialValues",
    value: function setInitialValues(values) {
      this.initial = {};
      (0, _util.merge)(this.initial, values);
    }
  }, {
    key: "populate",
    value: function populate(data) {
      var _this2 = this;
      Object.keys(data).forEach(function (field) {
        (0, _util.guardAgainstReservedFieldName)(field);
        if (_this2.hasOwnProperty(field)) {
          (0, _util.merge)(_this2, _defineProperty({}, field, data[field]));
        }
      });
      return this;
    }

    /**
     * Clear the form fields.
     */
  }, {
    key: "clear",
    value: function clear() {
      for (var field in this.initial) {
        this[field] = '';
      }
      this.errors.clear();
    }

    /**
     * Send a POST request to the given URL.
     *
     * @param {string} url
     */
  }, {
    key: "post",
    value: function post(url) {
      return this.submit('post', url);
    }

    /**
     * Send a PUT request to the given URL.
     *
     * @param {string} url
     */
  }, {
    key: "put",
    value: function put(url) {
      return this.submit('put', url);
    }

    /**
     * Send a PATCH request to the given URL.
     *
     * @param {string} url
     */
  }, {
    key: "patch",
    value: function patch(url) {
      return this.submit('patch', url);
    }

    /**
     * Send a DELETE request to the given URL.
     *
     * @param {string} url
     */
  }, {
    key: "delete",
    value: function _delete(url) {
      return this.submit('delete', url);
    }

    /**
     * Submit the form.
     *
     * @param {string} requestType
     * @param {string} url
     */
  }, {
    key: "submit",
    value: function submit(requestType, url) {
      var _this3 = this;
      this.__validateRequestType(requestType);
      this.errors.clear();
      this.processing = true;
      this.successful = false;
      return new Promise(function (resolve, reject) {
        _this3.__http[requestType](url, _this3.hasFiles() ? (0, _util.objectToFormData)(_this3.data()) : _this3.data()).then(function (response) {
          _this3.processing = false;
          _this3.onSuccess(response.data);
          resolve(response.data);
        })["catch"](function (error) {
          _this3.processing = false;
          _this3.onFail(error);
          reject(error);
        });
      });
    }

    /**
     * @returns {boolean}
     */
  }, {
    key: "hasFiles",
    value: function hasFiles() {
      for (var property in this.initial) {
        if (this.hasFilesDeep(this[property])) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: "hasFilesDeep",
    value:
    /**
     * @param {Object|Array} object
     * @returns {boolean}
     */
    function hasFilesDeep(object) {
      if (object === null) {
        return false;
      }
      if (_typeof(object) === 'object') {
        for (var key in object) {
          if (object.hasOwnProperty(key)) {
            if (this.hasFilesDeep(object[key])) {
              return true;
            }
          }
        }
      }
      if (Array.isArray(object)) {
        for (var _key in object) {
          if (object.hasOwnProperty(_key)) {
            return this.hasFilesDeep(object[_key]);
          }
        }
      }
      return (0, _util.isFile)(object);
    }

    /**
     * Handle a successful form submission.
     *
     * @param {object} data
     */
  }, {
    key: "onSuccess",
    value: function onSuccess(data) {
      this.successful = true;
      if (this.__options.resetOnSuccess) {
        this.reset();
      }
    }

    /**
     * Handle a failed form submission.
     *
     * @param {object} data
     */
  }, {
    key: "onFail",
    value: function onFail(error) {
      this.successful = false;
      if (error.response && error.response.data.errors) {
        this.errors.record(error.response.data.errors);
      }
    }

    /**
     * Get the error message(s) for the given field.
     *
     * @param field
     */
  }, {
    key: "hasError",
    value: function hasError(field) {
      return this.errors.has(field);
    }

    /**
     * Get the first error message for the given field.
     *
     * @param {string} field
     * @return {string}
     */
  }, {
    key: "getError",
    value: function getError(field) {
      return this.errors.first(field);
    }

    /**
     * Get the error messages for the given field.
     *
     * @param {string} field
     * @return {array}
     */
  }, {
    key: "getErrors",
    value: function getErrors(field) {
      return this.errors.get(field);
    }
  }, {
    key: "__validateRequestType",
    value: function __validateRequestType(requestType) {
      var requestTypes = ['get', 'delete', 'head', 'post', 'put', 'patch'];
      if (requestTypes.indexOf(requestType) === -1) {
        throw new Error("`".concat(requestType, "` is not a valid request type, ") + "must be one of: `".concat(requestTypes.join('`, `'), "`."));
      }
    }
  }], [{
    key: "create",
    value: function create() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new Form().withData(data);
    }
  }]);
  return Form;
}();
var _default = Form;
exports["default"] = _default;