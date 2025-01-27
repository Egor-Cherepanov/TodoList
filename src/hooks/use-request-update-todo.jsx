import { useState } from "react"
import { ref, set } from "firebase/database"
import { db } from "../firebase"

export const useRequestUpdateTodo = ({
  inputValue,
  setInputValue,
  setInputError,
  actualId,
  setActualId,
}) => {
  const [isUpdating, setIsUpdating] = useState(false)

  const requestUpdateTodo = () => {
    if (inputValue === "") {
      return setInputError("Введите текст задачи")
    }

    const todoDbRef = ref(db, `todos/${actualId}`)
    set(todoDbRef, {
      title: inputValue,
    })
      .then((response) => {
        console.log("Задача обновлена, ответ сервера:", response)
      })
      .finally(() => {
        setIsUpdating(false)
        setInputValue("")
        setActualId("")
      })
  }

  return { isUpdating, setIsUpdating, requestUpdateTodo }
}
