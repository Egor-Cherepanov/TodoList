import { addTodoMock, getTodosMock } from "../mocks"

export const addTodos = (value) => {
  return async (dispatch) => {
    try {
      await addTodoMock(value)
      const updatedTodos = await getTodosMock()

      dispatch({
        type: "ADD_TODO",
        payload: updatedTodos,
      })
    } catch (error) {
      console.error("Ошибка при добалении todo:", error)
    }
  }
}
