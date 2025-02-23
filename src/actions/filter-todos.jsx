import { filterTodosMock } from "../mocks"

const debounce = (callBack, delay = 1000) => {
  let timeout
  return (...arg) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      callBack(...arg)
    }, delay)
  }
}

export const filterTodosAsync = (value) => {
  return async (dispatch) => {
    try {
      const debouncedSetSortedTodos = debounce(async () => {
        const loadedTodos = await filterTodosMock(value)

        dispatch({
          type: "FILTER_TODOS",
          payload: loadedTodos,
        })
      })

      debouncedSetSortedTodos()
    } catch (error) {
      console.error("Ошибка при поиске todos:", error)
    }
  }
}
