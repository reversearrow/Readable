export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const SORT_POSTS = 'SORT_POSTS'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export const ADD_CATEGORY = 'ADD_CATEGORY'

export function addCategory({name,path}){
  return {
    type: ADD_CATEGORY,
    name,
    path,
  }
}

export function addPost({id,timestamp,title,body,author,category,voteScore,deleted}){
  return {
    type: ADD_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
    deleted
  }
}

export function sortPosts(attribute){
  return {
    type: SORT_POSTS,
    attribute,
  }
}

export function filterPosts(category){
  return {
    type: SET_VISIBILITY_FILTER,
    category,
  }
}
