import { useState } from "react"
import styles from "./update-todo.module.css"
import { useRequestUpdateTodo } from "../../hooks/index"

export const UpdateTodo = ({ id }) => {
  const [inputValue, setInputValue] = useState("")
  const [inputError, setInputError] = useState()

  const { isUpdating, setIsUpdating, requestUpdateTodo } = useRequestUpdateTodo(
    {
      inputValue,
      setInputValue,
      setInputError,
      id,
    }
  )

  return (
    <>
      <input
        type="text"
        className={styles.todoInput}
        value={inputValue}
        onChange={({ target }) => setInputValue(target.value)}
        placeholder="Введите отредактированную задачу..."
      />
      <button
        className={styles.addButton}
        onClick={requestUpdateTodo}
        disabled={!!inputError}
      >
        Отредактировать задачу
      </button>
    </>
  )
}
