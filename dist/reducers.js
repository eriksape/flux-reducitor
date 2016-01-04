'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var action = arguments[1];

  console.log('{url} was called with state', state, 'and action', action);
  if (url == action.url) {
    switch (action.type) {
      case _constants.ACTION_SUCCESS:
        return [].concat(_toConsumableArray(state), _toConsumableArray(action.data));
        break;
      /*case ACTION_FETCH:
      case ACTION_FAIL:
      case ACTION_RESET:*/
      default:
        return state;
    }
  } else return state;
};

var _constants = require('./constants');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
//# sourceMappingURL=reducers.js.map
