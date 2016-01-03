#**flux-reducitor**
> A simple class for manage async request with redux


## Example
```js
import { combineReducers, bindActionCreators, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import FluxReducitor from 'flux-reducitor'

const users = new FluxReducitor('/api/users')

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
    store.dispatch(users.actions.destination(server+uri,{method: 'get'}));

```
