import _ from 'lodash'
import 'isomorphic-fetch'
import FluxActions from './actions'

import {ACTION_FETCH, ACTION_SUCCESS, ACTION_FAIL, ACTION_RESET} from './constants'

export default class FluxReducitor{
  constructor(options =
    {
      name:'users',
      index:'id',
      fetch:{},
      urls:{
        all:{
          method:'get',
          url:'http://example.com/api/users'
        },
        store:{
          method:'post',
          url:'http://example.com/api/users'
        },
        show:{
          method:'get',
          url:'http://example.com/api/users/:id'
        },
        update:{
          method:'put',
          url:'http://example.com/api/users/:id'
        },
        destroy:{
          method:'delete',
          url:'http://example.com/api/users/:id'
        }
      }

    }
  ){

    let actions = [];
    _.each(options.urls, function(url, index){
      actions[index] = new FluxActions({
        name: options.name,
        url: url.url,
        method: url.method
      }, fetch)
    })

    this.actions = actions
    this.options = options
    this.reducers = (state = [], action) => {
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
          let data = _.first(action.data);
          let index = _.findIndex(state, {id:data.id})
          state[index]=data
          console.log(index, state);
            return [
              ...state
            ]
          break;
          default:
            return[
              ...state,
              ...action.data
            ]
          break;
        }

        break;
        /*case ACTION_FETCH:
        case ACTION_FAIL:
        case ACTION_RESET:*/
        default:
        return state
      }

    }
  }
}
