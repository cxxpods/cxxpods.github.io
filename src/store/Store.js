import Store, { thunk } from 'repatch'
import api from './API'


const loggerMiddleware = store => next => reducer => {
  const state = store.getState()
  const nextState = reducer(state)
  console.log(state, nextState)
  return next(_ => nextState)
}

const store = new Store({
  repos: ['cxxpods/cxxpods-registry'],
  recipes: [],
  isFetching: false,
  error: null
})

store.addMiddleware(thunk.withExtraArgument(api), loggerMiddleware)

// if (window.__REDUX_DEVTOOLS_EXTENSION__)
//   store.addMiddleware(window.__REDUX_DEVTOOLS_EXTENSION__())

export default store