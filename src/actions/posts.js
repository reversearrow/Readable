import * as API from '../utils/api.js'

export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const SET_POSTS_SORT = 'SET_POSTS_SORT'
export const EDIT_POST = 'EDIT_POST'
export const SET_SELECTED_POST = 'SET_SELECTED_POST'
export const COMMENT_PARENT_DELETED = 'COMMENT_PARENT_DELETED'

export function receiveAddedPost({
  id,
  timestamp,
  title,
  body,
  author,
  category,
  voteScore,
  deleted
}) {
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


export function sortPosts(attribute) {
  return {type: SET_POSTS_SORT, attribute}
}

export function getSelectedPost(id) {
  return {type: SET_SELECTED_POST, id}
}

export function recievedeletedPost({id, deleted}) {
  return {type: DELETE_POST, id, deleted}
}

export function receivecommentParentDeleted({id, parentDeleted}) {
  return {type: COMMENT_PARENT_DELETED, id, parentDeleted}
}


export function receiveEditedPost({id, attribute, value, timestamp}) {
  return {type: EDIT_POST, id: id, attribute: attribute, newValue: value, timestamp: timestamp}
}


export function receivePostVotes({id, voteScore}) {
  return {type: EDIT_POST, id: id, voteScore: voteScore, attribute: 'VOTES'}
}

export const upVotePost = (postid) => dispatch => (
  API
    .updatePostVote(postid, {
      'option': 'upVote'
    })
    .then((data) => dispatch(receivePostVotes({id: data.id, voteScore: data.voteScore})))
);

export const downVotePost = (postid) => dispatch => (
  API
    .updatePostVote(postid, {
      'option': 'downVote'
    })
    .then((data) => dispatch(receivePostVotes({id: data.id, voteScore: data.voteScore})))
);

export const editPostBody = ({id, timestamp, newValue}) => dispatch => {
  API.updatePost(id, {
    'timestamp': timestamp,
    'body': newValue.body})
    .then((data) => dispatch(receiveEditedPost({id: data.id, attribute: 'BODY', value: data.body, timestamp: data.timestamp})))
}

export const editPostTitle = ({id, timestamp, newValue}) => dispatch => {
  API.updatePost(id, {
    'timestamp': timestamp,
    'title': newValue.title}).then((data) => dispatch(receiveEditedPost({id: data.id, attribute: 'TITLE', value: data.title, timestamp: data.timestamp})))
}

export const deletePost = (id) => dispatch => {
  API
    .deletePost(id)
    .then((post) => dispatch(recievedeletedPost({id: post.id, deleted: post.deleted})))
    .then((post) => dispatch(receivecommentParentDeleted({id: post.id, parentDeleted: post.deleted})))
}

export const addNewPost = (values) => dispatch => {
  API
    .addPost(values)
    .then((d) => dispatch(receiveAddedPost(d)))
}
