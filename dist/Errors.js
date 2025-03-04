"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var Errors = /*#__PURE__*/function () {
  /**
   * Create a new Errors instance.
   */
  function Errors() {
    var errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Errors);
    this.record(errors);
  }

  /**
   * Get all the errors.
   *
   * @return {object}
   */
  _createClass(Errors, [{
    key: "all",
    value: function all() {
      return this.errors;
    }

    /**
     * Determine if any errors exists for the given field or object.
     *
     * @param {string} field
     */
  }, {
    key: "has",
    value: function has(field) {
      var hasError = this.errors.hasOwnProperty(field);
      if (!hasError) {
        var errors = Object.keys(this.errors).filter(function (e) {
          return e.startsWith("".concat(field, ".")) || e.startsWith("".concat(field, "["));
        });
        hasError = errors.length > 0;
      }
      return hasError;
    }
  }, {
    key: "first",
    value: function first(field) {
      return this.get(field)[0];
    }
  }, {
    key: "get",
    value: function get(field) {
      return this.errors[field] || [];
    }

    /**
     * Determine if we have any errors.
     * Or return errors for the given keys.
     *
     * @param {array} keys
     */
  }, {
    key: "any",
    value: function any() {
      var _this = this;
      var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      if (keys.length === 0) {
        return Object.keys(this.errors).length > 0;
      }
      var errors = {};
      keys.forEach(function (key) {
        return errors[key] = _this.get(key);
      });
      return errors;
    }

    /**
     * Record the new errors.
     *
     * @param {object} errors
     */
  }, {
    key: "record",
    value: function record() {
      var errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.errors = errors;
    }

    /**
     * Clear a specific field, object or all error fields.
     *
     * @param {string|null} field
     */
  }, {
    key: "clear",
    value: function clear(field) {
      if (!field) {
        this.errors = {};
        return;
      }
      var errors = Object.assign({}, this.errors);
      Object.keys(errors).filter(function (e) {
        return e === field || e.startsWith("".concat(field, ".")) || e.startsWith("".concat(field, "["));
      }).forEach(function (e) {
        return delete errors[e];
      });
      this.errors = errors;
    }
  }]);
  return Errors;
}();
var _default = Errors;
exports["default"] = _default;