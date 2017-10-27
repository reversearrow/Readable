export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const SORT_POSTS = 'SORT_POSTS'

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
