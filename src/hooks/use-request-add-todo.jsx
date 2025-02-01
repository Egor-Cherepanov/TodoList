import { useState } from "react"

export const useRequestAddTodo = ({
  inputValue,
  setInputValue,
  setInputError,
  setRefreshProducts,
  refreshProducts,
  setAlfabetTodosUpdated,
}) => {
  const [isCreating, setIsCreating] = useState(false)

  const requestAddTodo = () => {
    if (inputValue === "") {
      return setInputError("Введите текст задачи")
    }

    fetch("http://localhost:3005/todoos", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title: inputValue,
      }),
    })
      .then((loadedData) => loadedData.json())
      .then((response) => {
        console.log("Задача добавлена, ответ сервера:", response)
        setRefreshProducts(!refreshProducts)
      })
      .finally(() => {
        setIsCreating(false)
        setInputValue("")
        setAlfabetTodosUpdated(false)
      })
  }
  return { isCreating, requestAddTodo }
}
