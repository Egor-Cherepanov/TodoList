export const initialTodosState = []

export const todosReducer = (state = initialTodosState, action) => {
  switch (action.type) {
    case "GET_TODOS": {
      return action.payload
    }
    case "REMOVE_TODO": {
      return action.payload
    }
    case "FILTER_TODOS": {
      return action.payload
    }
    case "SORT_TODOS": {
      return action.payload
    }
    case "ADD_TODO": {
      return action.payload
    }
    case "UPDATE_TODO": {
      return action.payload
    }
    default:
      return state
  }
}
