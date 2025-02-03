const useAddTodo = () => {
  const requestAddTodo = (inputValue) => {
    return fetch("http://localhost:3005/todoos", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title: inputValue,
      }),
    })
      .then((loadedData) => loadedData.json())
      .then((response) => {
        console.log("Задача добавлена, ответ сервера:", response)
      })
  }

  return requestAddTodo
}

export default useAddTodo
