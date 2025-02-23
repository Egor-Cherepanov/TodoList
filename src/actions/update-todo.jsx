import { getTodosMock, updateTodoMock } from "../mocks"

export const updateTodo = (id, value) => {
  return async (dispatch) => {
    try {
      await updateTodoMock(id, value)
      const updatedTodos = await getTodosMock()

      dispatch({
        type: "UPDATE_TODO",
        payload: updatedTodos,
      })
    } catch (error) {
      console.error("Ошибка при обновлении todo:", error)
    }
  }
}
