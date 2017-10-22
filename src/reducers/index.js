import { ADD_POST } from '../actions'

function posts(state=[], action){
  switch(action.type){
    case 'ADD_POST':
      const {id,timestamp,title,body,author,category,voteScore,deleted} = action
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
    default:
      return state
  }
}

export default posts
