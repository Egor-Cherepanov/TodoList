import { getTodosMock, removeTodoMock } from "../mocks"

export const removeTodo = (id) => {
  return async (dispatch) => {
    try {
      await removeTodoMock(id)
      const updatedTodos = await getTodosMock()

      dispatch({
        type: "REMOVE_TODO",
        payload: updatedTodos,
      })
    } catch (error) {
      console.error("Ошибка при удалении todo:", error)
    }
  }
}
