#**flux-reducitor**
> A simple class for manage async request with redux


## Example
```js
import { combineReducers, bindActionCreators, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import FluxReducitor from 'flux-reducitor'

const users = new FluxReducitor({
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

})

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


store.dispatch(users.actions.all.run()) // this will retrieve your data

store.dispatch(users.actions.store.run(
  JSON.stringify({
    name: 'er',
    email: 'er.com'
  })
))  // this will store your data


store.dispatch(users.actions.update.run(
  JSON.stringify({
    name: 'erik',
    email: 'erik.erik@erik.com',
  }),{id:2}
))  // this will update your data

```
