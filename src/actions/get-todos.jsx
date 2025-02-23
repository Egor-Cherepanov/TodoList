import { getTodosMock } from "../mocks"

export const getTodosAsync = async (dispatch) => {
  try {
    const loadedTodos = await getTodosMock()

    dispatch({
      type: "GET_TODOS",
      payload: loadedTodos,
    })
  } catch (error) {
    console.error("Ошибка при загрузке todos:", error)
  }
}
