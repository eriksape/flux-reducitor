import nock from 'nock'
import expect from 'expect'
import {ACTION_FETCH, ACTION_SUCCESS, ACTION_FAIL, ACTION_RESET} from '../src/constants'
import { combineReducers, bindActionCreators, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import FluxReducitor from './../src/index'

const uri = '/api/users'
const server = 'http://laravel.com.mx'
const users = new FluxReducitor(server+uri)
const usersResponse = [
  {"id":1,"name":"er","email":"er.com","created_at":"2016-01-02 15:35:58","updated_at":"2016-01-02 21:35:58"},
  {"id":2,"name":"22","email":"er@apscr.com","created_at":"2015-12-28 07:12:50","updated_at":"2015-12-28 13:12:50"},
  ]


const rootReducer = combineReducers({
  users:users.reducers,
})

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore)

function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState)
  return store
}

describe('actions with class', () => {
  afterEach(() => { nock.cleanAll() })
  it('should get users list', (done) =>{

    let api = nock(server)
    .get(uri)
    .reply(200, usersResponse)

    const expectedActions = {
      //type: ACTION_SUCCESS,
      //url: uri,
      users: usersResponse,
      //receivedAt: Date.now()
    }

    const store = configureStore();
    store.dispatch(users.actions.destination(server+uri,{method: 'get'}))

    store.subscribe(() =>{
      try {
        expect(store.getState()).toEqual(expectedActions)
        done()
      } catch (e) {
        done(e)
      }
    })

  })
})
