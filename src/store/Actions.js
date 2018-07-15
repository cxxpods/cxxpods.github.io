
import * as _ from 'lodash'

export function fetchRecipes() {
  return () => async (dispatch, getState, api) => {
    dispatch(state => ({ ...state, isFetching: true }))
    try {
      let recipes = []
      for (let repo of getState().repos) {
        console.log(`Fetching recipes from: ${repo}`)
        recipes = [...recipes,...(await api.getRecipes(repo))]
      }
  
      recipes = _.sortBy(recipes,'name')
      dispatch(state => ({...state, recipes}))
    } catch (error) {
      dispatch(state => ({...state, error}))
    }
  }
}