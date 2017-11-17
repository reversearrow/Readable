import * as API from '../utils/api.js'

export const UPVOTE = 'UPVOTE'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export const ADD_CATEGORY = 'ADD_CATEGORY'
export const SET_SELECTED_POST = 'SET_SELECTED_POST'



export function addCategory({name, path}) {
  return {type: ADD_CATEGORY, name, path}
}
