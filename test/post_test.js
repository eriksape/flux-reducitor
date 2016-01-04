import nock from 'nock'
import expect from 'expect'
import {ACTION_FETCH, ACTION_SUCCESS, ACTION_FAIL, ACTION_RESET} from '../src/constants'
import { combineReducers, bindActionCreators, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import FluxReducitor from './../src/index'

const uri = '/api/users'
const server = 'http://example.com'
const users = new FluxReducitor()

const dataRequest= {"name":"er","email":"er.com"}
const dataResponse = {"id":100,"name":"er","email":"er.com","created_at":"2016-01-02 15:35:58","updated_at":"2016-01-02 21:35:58"}


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

describe('Async Post', () => {
  afterEach(() => { nock.cleanAll() })
  it('should create and user', (done) =>{

    let api = nock(server)
    .post(uri)
    .reply(200, dataResponse)

    const expectedActions = {
      //type: ACTION_SUCCESS,
      //url: uri,
      users: [dataResponse],
      //receivedAt: Date.now()
    }

    const store = configureStore();

    store.dispatch(users.actions.store.run(
      JSON.stringify({
        name: 'er',
        email: 'er.com'
      })
    ))

    store.subscribe(function(){
      try {
        expect(store.getState()).toEqual(expectedActions)
        done()
      } catch (e) {
        done(e)
      }
      //console.log(store.getState())
    })

  })
})
