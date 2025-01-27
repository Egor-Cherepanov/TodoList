import { useState } from "react"
import { ref, push } from "firebase/database"
import { db } from "../firebase"

export const useRequestAddTodo = ({
  inputValue,
  setInputValue,
  setInputError,
}) => {
  const [isCreating, setIsCreating] = useState(false)

  const requestAddTodo = () => {
    if (inputValue === "") {
      return setInputError("Введите текст задачи")
    }
    const todosDbRef = ref(db, "todos")

    push(todosDbRef, {
      title: inputValue,
    })
      .then((response) => {
        console.log("Задача добавлена, ответ сервера:", response)
      })
      .finally(() => {
        setIsCreating(false)
        setInputValue("")
      })
  }
  return { isCreating, requestAddTodo }
}
