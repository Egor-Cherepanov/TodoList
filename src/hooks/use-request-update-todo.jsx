import { useState } from "react"

export const useRequestUpdateTodo = ({
  inputValue,
  setInputValue,
  setInputError,
  actualId,
  setActualId,
  setRefreshProducts,
  refreshProducts,
  setAlfabetTodosUpdated,
}) => {
  const [isUpdating, setIsUpdating] = useState(false)

  const requestUpdateTodo = () => {
    if (inputValue === "") {
      return setInputError("Введите текст задачи")
    }

    fetch(`http://localhost:3005/todoos/${actualId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title: inputValue,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log("Задача обновлена, ответ сервера:", response)
        setRefreshProducts(!refreshProducts)
      })
      .finally(() => {
        setIsUpdating(false)
        setInputValue("")
        setActualId(0)
        setAlfabetTodosUpdated(false)
      })
  }

  return { isUpdating, setIsUpdating, requestUpdateTodo }
}
