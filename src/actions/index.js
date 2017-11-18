import * as API from '../utils/api.js'
import {receivePostToAdd} from './posts.js'
import {receiveCommentToAdd} from './comments.js'

export const UPVOTE = 'UPVOTE'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export const ADD_CATEGORY = 'ADD_CATEGORY'
export const SET_SELECTED_POST = 'SET_SELECTED_POST'



export function receiveAddedCategory({name, path}) {
  return {type: ADD_CATEGORY, name, path}
}

export const initCategories = () => dispatch => {
  API
    .getCatagories()
    .then(catagories => catagories.map((category) => dispatch(receiveAddedCategory(category))))
}

export const initPostsAndComments = () => dispatch => {
  API
    .getAllPosts()
    .then(data => data.map((d) => dispatch(receivePostToAdd(d))))
    .then(data => data.map((post) => API.getComments(post.id).then((comments) => (comments.map((comment) => dispatch(receiveCommentToAdd(comment)))))))
}
