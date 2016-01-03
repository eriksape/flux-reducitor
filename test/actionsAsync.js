import nock from 'nock'
import {ACTION_FETCH, ACTION_SUCCESS, ACTION_FAIL, ACTION_RESET} from '../src/constants'
import { combineReducers, bindActionCreators, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import FluxReducitor from './../src/index'

const uri = '/api/users'
const server = 'http://laravel.com.mx'
const users = new FluxReducitor(uri)
const usersResponse = [{"id":1,"name":"er","email":"er.com","created_at":"2016-01-02 15:35:58","updated_at":"2016-01-02 21:35:58"},{"id":2,"name":"22","email":"er@apscr.com","created_at":"2015-12-28 07:12:50","updated_at":"2015-12-28 13:12:50"},{"id":23,"name":"asdasd","email":"DLKFNSDLNF1\u00d1MDSF@ASDAS.COM","created_at":"2015-12-29 06:56:32","updated_at":"2015-12-29 06:56:32"},{"id":21,"name":"zz","email":"zz@.com.co","created_at":"2015-12-29 06:50:38","updated_at":"2015-12-29 06:50:38"},{"id":22,"name":"aa","email":"aa@aa.aa","created_at":"2015-12-29 06:51:52","updated_at":"2015-12-29 06:51:52"},{"id":18,"name":"asd","email":"asd@as.com","created_at":"2015-12-29 06:42:09","updated_at":"2015-12-29 06:42:09"},{"id":20,"name":"xx","email":"xx@xdx.com","created_at":"2015-12-29 06:48:54","updated_at":"2015-12-29 06:48:54"},{"id":19,"name":"xx","email":"xx@xx.com","created_at":"2015-12-29 06:48:13","updated_at":"2015-12-29 06:48:13"},{"id":24,"name":"er","email":"c@co.cmm","created_at":"2015-12-29 07:03:14","updated_at":"2015-12-29 07:03:14"},{"id":25,"name":"er","email":"c@co.cmasm","created_at":"2015-12-29 07:04:00","updated_at":"2015-12-29 07:04:00"},{"id":26,"name":"laravel","email":"laravel@laravel.com","created_at":"2016-01-02 21:34:46","updated_at":"2016-01-02 21:34:46"},{"id":27,"name":"laravel","email":"laravel2@laravel.com","created_at":"2016-01-02 21:37:13","updated_at":"2016-01-02 21:37:13"}]


const rootReducer = combineReducers({
  users:users.reducers,
})

// function mapStateToProps(state) {
//   return {
//     users: state.users,
//   }
// }

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore)

function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState)
  return store
}

/*function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch)
}

function apiDispatchToProps(dispatch) {
  return {
    usersActions:bindActionCreators(users.actions, dispatch),
  }
}

const connection = connect(mapStateToProps, apiDispatchToProps)(Counter)
*/

describe('actions with class', () => {
  afterEach(() => { nock.cleanAll() })
  it('should get users list', (done) =>{

    let api = nock(server)
    .get(uri)
    .reply(200, usersResponse)

    const expectedActions = {
      type: ACTION_SUCCESS,
      url: uri,
      data: usersResponse,
      receivedAt: Date.now()
    }

    //const store = mockStore({ users: [] }, expectedActions, done);
    const store = configureStore();
    store.dispatch(users.actions.destination(server+uri,{method: 'get'}));
    console.log(store.getState());
    done();

  })
})
