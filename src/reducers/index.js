import { ADD_POST } from '../actions'
import sortBy from 'sort-by'

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
    case 'SORT_POSTS': {
      switch(action.attribute){
        case 'BY_TIMESTAMP':
          return state.slice().sort(sortBy('-timestamp'))
        case 'BY_HIGHESTVOTE':
          return state.slice().sort(sortBy('-voteScore'))
      }
    }
    default:
      return state
  }
}

export default posts
