import { useState } from "react"
import useAddTodo from "../../hooks/useAddTodo"
import PropTypes from "prop-types"
import styles from "./add-todo.module.css"

const AddTodoBlock = ({ handleOnAddClick }) => {
  const [inputValue, setInputValue] = useState("")

  const addTodo = useAddTodo()

  const handleAddTodo = () => {
    addTodo(inputValue)
    setInputValue("")
    handleOnAddClick()
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

AddTodoBlock.propTypes = {
  handleOnAddClick: PropTypes.func.isRequired,
}

export default AddTodoBlock
