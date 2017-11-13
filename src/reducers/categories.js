function categories(state = [], action) {
  switch (action.type) {
    case 'ADD_CATEGORY':
      const {name, path} = action
      return [
        ...state, {
          name,
          path
        }
      ]
    default:
      return state
  }
}

export default categories
