'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

require('isomorphic-fetch');

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FluxReducitor = function FluxReducitor() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {
    name: 'users',
    index: 'id',
    fetch: {},
    urls: {
      all: {
        method: 'get',
        url: 'http://example.com/api/users'
      },
      store: {
        method: 'post',
        url: 'http://example.com/api/users'
      },
      show: {
        method: 'get',
        url: 'http://example.com/api/users/:id'
      },
      update: {
        method: 'put',
        url: 'http://example.com/api/users/:id'
      },
      destroy: {
        method: 'delete',
        url: 'http://example.com/api/users/:id'
      }
    }

  } : arguments[0];

  _classCallCheck(this, FluxReducitor);

  var actions = [];
  _lodash2.default.each(options.urls, function (url, index) {
    actions[index] = new _actions2.default({
      name: options.name,
      url: url.url,
      method: url.method
    }, fetch);
  });

  this.actions = actions;
  this.options = options;
  this.reducers = function () {
    var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var action = arguments[1];

    // console.log(action.method)
    // if(action.method == 'post'){
    //   console.log( options.name, 'was called with state', _.countBy(state), 'and action', action.type, 'and data', action.data )
    //   console.log(options.name, '==', action.name)
    // }

    //console.log(action.url);

    switch (action.type) {
      case 'ACTION_SUCCESS':

        switch (action.method) {
          case 'put':
            console.log(action.data);
            var data = _lodash2.default.first(action.data);
            var index = _lodash2.default.findIndex(state, { id: data.id });
            state[index] = data;
            console.log(index, state);
            return [].concat(_toConsumableArray(state));
            break;
          default:
            return [].concat(_toConsumableArray(state), _toConsumableArray(action.data));
            break;
        }

        break;
      /*case ACTION_FETCH:
      case ACTION_FAIL:
      case ACTION_RESET:*/
      default:
        return state;
    }
  };
};

exports.default = FluxReducitor;
//# sourceMappingURL=index.js.map
