const commentExists = (comments, comment) => {
  return comments.some((c) => c.id === comment.id);
}

function comments(state = [], action) {
  switch (action.type) {
    case 'ADD_COMMENT':
      const {
        author,
        body,
        deleted,
        id,
        parentDeleted,
        parentId,
        timestamp,
        voteScore
      } = action
      if (commentExists(state, action)) {
        return state
      } else {
        return [
          ...state, {
            author,
            body,
            deleted,
            id,
            parentDeleted,
            parentId,
            timestamp,
            voteScore
          }
        ]
      }
    case 'DELETE_COMMENT':
      return state.map((comment) => comment.id === action.id
        ? {
          ...comment,
          deleted: action.deleted
        }
        : comment)
    case 'COMMENT_PARENT_DELETED':
      return state.map((comment) => comment.parentId === action.id
        ? {
          ...comment,
          parentDeleted: action.parentDeleted
        }
        : comment)
    case 'EDIT_COMMENT':
      {
        switch (action.attribute) {
          case 'BODY':
            return state.map((comment) => comment.id === action.id
              ? {
                ...comment,
                body: action.newValue,
                timestamp: action.timestamp
              }
              : comment)
          case 'VOTES':
            return state.map((comment) => comment.id === action.id
              ? {
                ...comment,
                voteScore: action.voteScore
              }
              : comment)
          default:
            return state
        }
      }

    default:
      return state
  }
}

export default comments
