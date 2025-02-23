import { sortTodosMock } from "../mocks"

export const sortTodosAsync = async (dispatch) => {
  try {
    const loadedTodos = await sortTodosMock()

    dispatch({
      type: "SORT_TODOS",
      payload: loadedTodos,
    })
  } catch (error) {
    console.error("Ошибка при сортировке todos:", error)
  }
}
