'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('./constants');

require('isomorphic-fetch');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FluxActions = function FluxActions() {
  var travel = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  _classCallCheck(this, FluxActions);

  var initOptions = {
    mode: 'same-origin',
    credentials: 'include',
    method: 'get',
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: ''
  };

  var Options = this.options = _lodash2.default.assign(initOptions, options);

  var timeParadox = this.timeParadox = function (url, name, method, json) {
    //console.log('time paradox')
    //json = _.isObject(json) && _.isArray(json)?json:[json]
    json = _lodash2.default.isArray(json) ? json : [json];
    return {
      type: _constants.ACTION_SUCCESS,
      url: url,
      name: name,
      method: method,
      data: json
    };
  };

  //receivedAt: Date.now()
  var timeTravel = function timeTravel(url, name, method) {
    Options.method = method;
    return function (dispatch) {
      //console.log('time travel', url)
      return fetch(url, Options).then(function (response) {
        return response.json();
      }).then(function (json) {
        return dispatch(timeParadox(url, name, method, json));
      }).catch(function (err) {
        console.log(err);
      });
    };
  };

  this.run = function () {
    var body = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var urlParms = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var toPath = _pathToRegexp2.default.compile(travel.url);
    console.log('run to destination', travel.method);
    Options.body = body;
    return function (dispatch, getState) {
      return dispatch(timeTravel(toPath(urlParms), travel.name, travel.method));
    };
  };
};

exports.default = FluxActions;
//# sourceMappingURL=actions.js.map
