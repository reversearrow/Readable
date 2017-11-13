export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const SET_POSTS_SORT = 'SET_POSTS_SORT'
export const EDIT_POST = 'EDIT_POST'
export const UPVOTE = 'UPVOTE'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export const ADD_CATEGORY = 'ADD_CATEGORY'
export const SET_SELECTED_POST = 'SET_SELECTED_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const SORT_COMMENTS = 'SORT_COMMENTS'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const COMMENT_PARENT_DELETED = 'COMMENT_PARENT_DELETED'
export const EDIT_COMMENT = 'EDIT_COMMENT'


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

export function addComment({author,body,deleted,id,parentDeleted,parentId,timestamp,voteScore}){
  return {
    type: ADD_COMMENT,
    author,
    body,
    deleted,
    id,
    parentDeleted,
    parentId,
    timestamp,
    voteScore,
  }
}

export function sortPosts(attribute){
  return {
    type: SET_POSTS_SORT,
    attribute,
  }
}


export function getSelectedPost(id){
  return{
    type: SET_SELECTED_POST,
    id,
  }
}

export function sortComments(attribute){
  return{
    type: SORT_COMMENTS,
    attribute
  }
}


export function deleteComment({id,deleted}){
  return{
    type: DELETE_COMMENT,
    id,
    deleted
  }
}

export function deletePost({id,deleted}){
  return{
    type: DELETE_POST,
    id,
    deleted,
  }
}

export function commentParentDeleted({id,parentDeleted}){
  return{
    type: COMMENT_PARENT_DELETED,
    id,
    parentDeleted,
  }
}

export function editPost({id,attribute,value,timestamp}){
  return {
    type: EDIT_POST,
    id: id,
    attribute: attribute,
    newValue: value,
    timestamp: timestamp,
  }
}

export function editComment({id,attribute,value,timestamp}){
  return {
    type: EDIT_COMMENT,
    id: id,
    attribute: attribute,
    newValue: value,
    timestamp: timestamp
  }
}

export function updatePostVotes({id,voteScore}){
  return {
    type: EDIT_POST,
    id: id,
    voteScore: voteScore,
    attribute: 'VOTES'
  }
}

export function updateCommentVotes({id,voteScore}){
  return {
    type: EDIT_COMMENT,
    id: id,
    voteScore: voteScore,
    attribute: 'VOTES'
  }
}
