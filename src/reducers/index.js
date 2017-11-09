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


function selectedPost(state="SHOW_ALL",action){
  switch(action.type){
    case "SET_SELECTED_POST":
      return action.id
    default:
      return state
  }
}

function postSortMethod(state="BY_HIGHESTVOTE",action){
  switch(action.type){
    case "SET_POSTS_SORT":
      return action.attribute
    default:
      return state
  }
}

function commentsSortMethod(state="BY_HIGHESTVOTE",action){
  switch(action.type){
    case "SET_SORT":
      return action.attribute
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

const commentExists = (comments, comment) => {
  return comments.some((c) => c.id === comment.id);
}

function comments(state=[],action){
  switch(action.type){
    case 'ADD_COMMENT':
      const {author,body,deleted,id,parentDeleted,parentId,timestamp,voteScore} = action
      if (commentExists(state,action)){
        return state
      }else {
        return [...state,
            {
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
          return state.map((comment) => comment.id === action.id ?
            {...comment,
            deleted: action.deleted} : comment
          )
      case 'COMMENT_PARENT_DELETED':
        return state.map((comment) => comment.parentId === action.id ?
          {...comment,
            parentDeleted: action.parentDeleted} : comment
          )
      case 'EDIT_COMMENT':{
          switch(action.attribute){
              case 'BODY':
                return state.map((comment) => comment.id === action.id ?
                  {...comment, body: action.newValue, timestamp: action.timestamp} : comment)
              case 'VOTES':
                return state.map((comment) => comment.id === action.id ?
                  {...comment, voteScore: action.voteScore} : comment)
        }
      }

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
    case 'DELETE_POST':
      return state.map((post) => post.id === action.id ?
      {...post, deleted: action.deleted} : post
    )
    case 'EDIT_POST':{
      switch(action.attribute){
        case 'BODY':
          return state.map((post) => post.id === action.id ?
            {...post, body: action.newValue} : post)
        case 'TITLE':
          return state.map((post) => post.id === action.id ?
            {...post, title: action.newValue} : post)
        case 'VOTES':
          return state.map((post) => post.id === action.id ?
            {...post, voteScore: action.voteScore} : post)
      }
    }
    default:
      return state
  }
}

export default combineReducers(
  {
    posts,
    postSortMethod,
    categories,
    categoriesFilter,
    selectedPost,
    comments,
    commentsSortMethod,
  }
)
