import { useState } from "react"
import useAddTodo from "../../hooks/useAddTodo"
import styles from "./add-todo.module.css"

const AddTodoBlock = () => {
  const [inputValue, setInputValue] = useState("")

  const addTodo = useAddTodo() // Используем хук

  const handleAddTodo = async () => {
    await addTodo(inputValue) // Передаём inputValue в функцию addTodo
    setInputValue("") // Очищаем поле ввода
  }

  return (
    <div className={styles.todoForm}>
      <input
        type="text"
        className={styles.todoInput}
        value={inputValue}
        onChange={({ target }) => setInputValue(target.value)}
        placeholder="Введите задачу..."
      />
      <button
        className={styles.addButton}
        onClick={handleAddTodo}
        disabled={inputValue === ""}
      >
        Добавить задачу
      </button>
    </div>
  )
}

export default AddTodoBlock
