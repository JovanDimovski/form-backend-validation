"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.guardAgainstReservedFieldName = guardAgainstReservedFieldName;
exports.reservedFieldNames = void 0;
var reservedFieldNames = ['__http', '__options', '__validateRequestType', 'clear', 'data', 'delete', 'errors', 'getError', 'getErrors', 'hasError', 'initial', 'onFail', 'only', 'onSuccess', 'patch', 'populate', 'post', 'processing', 'successful', 'put', 'reset', 'submit', 'withData', 'withErrors', 'withOptions'];
exports.reservedFieldNames = reservedFieldNames;
function guardAgainstReservedFieldName(fieldName) {
  if (reservedFieldNames.indexOf(fieldName) !== -1) {
    throw new Error("Field name ".concat(fieldName, " isn't allowed to be used in a Form or Errors instance."));
  }
}