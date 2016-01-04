import nock from 'nock'
import expect from 'expect'
import {ACTION_FETCH, ACTION_SUCCESS, ACTION_FAIL, ACTION_RESET} from '../src/constants'
import { combineReducers, bindActionCreators, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import FluxReducitor from './../src/index'

const uri = '/api/users'
const server = 'http://example.com'
const users = new FluxReducitor()

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


const store = configureStore();
let unsubscribe = ()=>{}

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

    store.dispatch(users.actions.all.run())

    unsubscribe =  store.subscribe(() =>{
      try {
        expect(store.getState()).toEqual(expectedActions)
        done()
      } catch (e) {
        done(e)
      }
    })

  })

  it('store need unsubscribe', (done) => {
    try {
      unsubscribe();
      done()
    } catch (e) {
      done(e)
    } finally {

    }
  })

  it('should update a user name', (done) => {

    usersResponse[1].name='erik';
    usersResponse[1].email='erik.erik@erik.com';

    let api = nock(server)
    .put(uri+'/2')
    .reply(200, [usersResponse[1]])


    const expectedActions = {
      //type: ACTION_SUCCESS,
      //url: uri,
      users: usersResponse,
      //receivedAt: Date.now()
    }

    store.dispatch(users.actions.update.run(
      JSON.stringify({
        name: 'erik',
        email: 'erik.erik@erik.com',
      }),{id:2}
    ))

    store.subscribe(() =>{
      try {
        //console.log(store.getState());
        expect(store.getState()).toEqual(expectedActions)
        done()
      } catch (e) {
        done(e)
      }
    })


  })

})
