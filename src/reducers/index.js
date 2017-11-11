import { combineReducers } from 'redux';
import posts from './posts.js'
import comments from './comments.js'
import categories from './categories.js'
import categoriesFilter from './categoriesFilter.js'
import postsSortBy from './postsSortBy'
import commentsSortBy from './commentsSortBy'


function selectedPost(state="SHOW_ALL",action){
  switch(action.type){
    case "SET_SELECTED_POST":
      return action.id
    default:
      return state
  }
}




export default combineReducers(
  {
    posts,
    postsSortBy,
    categories,
    categoriesFilter,
    selectedPost,
    comments,
    commentsSortBy,
  }
)
