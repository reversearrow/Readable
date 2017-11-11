function postsSortBy(state="BY_HIGHESTVOTE",action){
  switch(action.type){
    case "SET_POSTS_SORT":
      return action.attribute
    default:
      return state
  }
}

export default postsSortBy
