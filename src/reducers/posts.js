const postExists = (posts, post) => {
  return posts.some((p) => p.id === post.id);
}

function posts(state=[], action){
  switch(action.type){
    case 'ADD_POST':
      const {id,timestamp,title,body,author,category,voteScore,deleted} = action
      if (postExists(state,action)){
        return state
      } else {
      return [...state,
        {
          id,
          timestamp,
          title,
          body,
          author,
          category,
          voteScore,
          deleted
        }
      ]
    }

    case 'DELETE_POST':
      return state.map((post) => post.id === action.id ?
      {...post, deleted: action.deleted} : post
    )
    case 'EDIT_POST':{
      switch(action.attribute){
        case 'BODY':
          return state.map((post) => post.id === action.id ?
            {...post, body: action.newValue, timestamp: action.timestamp} : post)
        case 'TITLE':
          return state.map((post) => post.id === action.id ?
            {...post, title: action.newValue, timestamp: action.timestamp} : post)
        case 'VOTES':
          return state.map((post) => post.id === action.id ?
            {...post, voteScore: action.voteScore} : post)
        default:
          return state
      }
    }
    default:
      return state
  }
}

export default posts
