import {ACTION_FETCH, ACTION_SUCCESS, ACTION_FAIL, ACTION_RESET} from './constants'
import 'isomorphic-fetch'
import _ from 'lodash'
import pathToRegexp from 'path-to-regexp'

export default class FluxActions{
  constructor(travel={}, options = {}){

    const initOptions = {
      mode :'same-origin',
      credentials : 'include',
      method: 'get',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      body : ''
    }

    const Options = this.options = _.assign( initOptions, options )

    const timeParadox = this.timeParadox = (url, name, method, json) => {
      //console.log('time paradox')
      //json = _.isObject(json) && _.isArray(json)?json:[json]
      json = _.isArray(json)?json:[json];
      return {
        type: ACTION_SUCCESS,
        url: url,
        name:name,
        method: method,
        data: json,
        //receivedAt: Date.now()
      }
    }

    const timeTravel = (url, name, method) => {
      Options.method = method;
      return dispatch => {
        //console.log('time travel', url)
        return fetch(url, Options)
        .then(response => response.json())
        .then(json => dispatch(timeParadox(url, name, method, json)))
        .catch(err => { console.log(err) })
      }
    }

    this.run = (body='', urlParms={}) => {
      let toPath = pathToRegexp.compile(travel.url)
      console.log('run to destination', travel.method);
      Options.body = body
      return (dispatch, getState) => {return dispatch(timeTravel(toPath(urlParms), travel.name, travel.method))}
    }


  }
}
