import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTodos } from "../../actions"
import styles from "./add-todo.module.css"

const AddTodoBlock = () => {
  const [inputValue, setInputValue] = useState("")
  const dispatch = useDispatch()

  const handleAddTodo = () => {
    dispatch(addTodos(inputValue))
    setInputValue("")
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
