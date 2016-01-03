import {ACTION_FETCH, ACTION_SUCCESS, ACTION_FAIL, ACTION_RESET} from './constants'
import 'isomorphic-fetch'
import _ from 'lodash'
//export function getInd function()

let initOptions = {
  mode :'same-origin',
  credentials : 'include',
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
}

export function fetchOptions(options = {method:'get'} ){
  return _.assign( initOptions, options )
}

export function destination(url, options){
  let opts = fetchOptions(options)
  return (dispatch, getState) => {return dispatch(timeTravel(url,options))}
}

export function timeParadox(url, method, json) {
  //json = _.isObject(json) && _.isArray(json)?json:[json]
  json = _.isArray(json)?json:[json];
  return {
    type: ACTION_SUCCESS,
    url: url,
    data: json,
    //receivedAt: Date.now()
  }
}

function timeTravel(url, options) {
  return dispatch => {
    return fetch(url, options)
      .then(response => response.json())
      .then(json => dispatch(timeParadox(url, options.method, json)))
  }
}
