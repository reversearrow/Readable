function selectedPost(state = "SHOW_ALL", action) {
  switch (action.type) {
    case "SET_SELECTED_POST":
      return action.id
    default:
      return state
  }
}

export default selectedPost
