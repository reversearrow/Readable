import {combineReducers} from 'redux';
import posts from './posts.js'
import comments from './comments.js'
import categories from './categories.js'
import categoriesFilter from './categoriesFilter.js'
import postsSortBy from './postsSortBy'
import commentsSortBy from './commentsSortBy'
import selectedPost from './selectedPost'

export default combineReducers({
  posts,
  postsSortBy,
  categories,
  categoriesFilter,
  comments,
  commentsSortBy,
  selectedPost
})
