import * as API from '../utils/api.js'

export const ADD_COMMENT = 'ADD_COMMENT'
export const SORT_COMMENTS = 'SORT_COMMENTS'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const COMMENT_PARENT_DELETED = 'COMMENT_PARENT_DELETED'

export function receiveCommentToAdd({
  author,
  body,
  deleted,
  id,
  parentDeleted,
  parentId,
  timestamp,
  voteScore
}) {
  return {
    type: ADD_COMMENT,
    author,
    body,
    deleted,
    id,
    parentDeleted,
    parentId,
    timestamp,
    voteScore
  }
}


export function sortComments(attribute) {
  return {type: SORT_COMMENTS, attribute}
}

export function receievedeletedComment({id, deleted}) {
  return {type: DELETE_COMMENT, id, deleted}
}


export function commentParentDeleted({id, parentDeleted}) {
  return {type: COMMENT_PARENT_DELETED, id, parentDeleted}
}


export function receiveeditedComment({id, attribute, value, timestamp}) {
  return {type: EDIT_COMMENT, id: id, attribute: attribute, newValue: value, timestamp: timestamp}
}

export function receieveupdatedCommentVotes({id, voteScore}) {
  return {type: EDIT_COMMENT, id: id, voteScore: voteScore, attribute: 'VOTES'}
}

export const deleteComment = (id) => dispatch => {
  API
    .deleteComment(id)
    .then((comment) => dispatch(receievedeletedComment({id: comment.id, deleted: comment.deleted})))
}


export const upVoteComment = (id) => dispatch => {
  const upVote = {
    'option': 'upVote'
  }
  API
    .updateCommentVote(id, upVote)
    .then((data) => dispatch(receieveupdatedCommentVotes({id: data.id, voteScore: data.voteScore})))
}

export const downVoteComment = (id) => dispatch => {
  const upVote = {
    'option': 'downVote'
  }
  API
    .updateCommentVote(id, upVote)
    .then((data) => dispatch(receieveupdatedCommentVotes({id: data.id, voteScore: data.voteScore})))
}

export const editComment = ({id, body}) => dispatch => {
  API.updateComment(id, {
    'timestamp': Date.now(),
    'body': body
  }).then((data) => dispatch(receiveeditedComment({id: data.id, attribute: 'BODY', value: data.body, timestamp: data.timestamp})))
}

export const addNewComment = (values) => dispatch => {
  API
    .addComment(values)
    .then((d) => dispatch(receiveCommentToAdd(d)))
}
