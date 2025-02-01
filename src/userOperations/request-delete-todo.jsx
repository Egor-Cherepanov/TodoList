export const requestDeleteTodo = ({
  id,
  setRefreshProducts,
  refreshProducts,
  setAlfabetTodosUpdated,
}) => {
  fetch(`http://localhost:3005/todoos/${id}`, {
    method: "DELETE",
  })
    .then((rawResponse) => rawResponse.json())
    .then((response) => {
      console.log("Задача удалена, ответ сервера: ", response)
    })
    .finally(() => {
      setRefreshProducts(!refreshProducts)
      setAlfabetTodosUpdated(false)
    })
}
