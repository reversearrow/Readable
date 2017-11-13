function commentsSortBy(state = "BY_HIGHESTVOTE", action) {
  switch (action.type) {
    case "SET_SORT":
      return action.attribute
    default:
      return state
  }
}

export default commentsSortBy
