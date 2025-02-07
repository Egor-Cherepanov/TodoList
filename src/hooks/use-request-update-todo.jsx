// import { useState } from "react"

export const useRequestUpdateTodo = ({
  inputValue,
  id,
  setInputError,
  handleOnAddClick,
  setIsUpdating,
}) => {
  const requestUpdateTodo = () => {
    if (inputValue === "") {
      return setInputError("Новая задача не должна быть пустой")
    }
    fetch(`http://localhost:3005/todoos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title: inputValue,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log("Задача обновлена, ответ сервера:", response)
      })
      .finally(() => {
        handleOnAddClick()
        setIsUpdating(false)
      })
  }

  return { requestUpdateTodo }
}
