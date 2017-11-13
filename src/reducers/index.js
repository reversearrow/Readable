import {combineReducers} from 'redux';
import posts from './posts.js'
import comments from './comments.js'
import categories from './categories.js'
import categoriesFilter from './categoriesFilter.js'
import postsSortBy from './postsSortBy'
import commentsSortBy from './commentsSortBy'

export default combineReducers({
  posts,
  postsSortBy,
  categories,
  categoriesFilter,
  comments,
  commentsSortBy
})
