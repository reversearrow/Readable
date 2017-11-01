import { ADD_POST } from '../actions'
import sortBy from 'sort-by'
import { combineReducers } from 'redux';


function categories(state=[],action){
  switch(action.type){
    case 'ADD_CATEGORY':
      const {name,path} = action
      return [...state,
      {
        name,
        path,
      }]
    default:
      return state
  }
}


function categoriesFilter(state="SHOW_ALL",action){
  switch(action.type){
    case "SET_VISIBILITY_FILTER":
      return action.category
    default:
      return state
  }
}

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
        default:
          return state
      }
    }
    default:
      return state
  }
}

export default combineReducers(
  {
    posts,
    categories,
    categoriesFilter,
  }
)
