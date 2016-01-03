import {ACTION_FETCH, ACTION_SUCCESS, ACTION_FAIL, ACTION_RESET} from './constants'

export default function(state = [], action) {
  console.log('{url} was called with state', state, 'and action', action)
  if(url == action.url){
    switch (action.type) {
      case ACTION_SUCCESS:
      return[
        ...state,
        ...action.data
      ]
      break;
      /*case ACTION_FETCH:
      case ACTION_FAIL:
      case ACTION_RESET:*/
      default:
      return state
    }
  } else return state
}
