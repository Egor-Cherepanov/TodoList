const useRemoveTodo = (id: string) => {
  const requestRemoveTodo = () =>
    fetch(`http://localhost:3005/todoos/${id}`, {
      method: "DELETE",
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log("Задача удалена, ответ сервера: ", response)
      })

  return requestRemoveTodo
}

export default useRemoveTodo
