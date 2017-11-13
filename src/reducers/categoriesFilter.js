function categoriesFilter(state = "SHOW_ALL", action) {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.category
    default:
      return state
  }
}

export default categoriesFilter
