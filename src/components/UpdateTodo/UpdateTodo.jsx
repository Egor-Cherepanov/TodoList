import { useState } from "react"
import { useContext } from "react"
import { TodosContext } from "../../context"
import PropTypes from "prop-types"
import styles from "./updateTodo.module.css"
import { useRequestUpdateTodo } from "../../hooks/index"

// export const UpdateTodo = ({ todo, handleOnAddClick, setIsUpdating }) => {
export const UpdateTodo = ({ todo, setIsUpdating }) => {
  const [inputValue, setInputValue] = useState(todo.title)
  const [inputError, setInputError] = useState(null)
  const { handleOnAddClick } = useContext(TodosContext)

  const { requestUpdateTodo } = useRequestUpdateTodo({
    inputValue,
    id: todo.id,
    setInputError,
    handleOnAddClick,
    setIsUpdating,
  })

  return (
    <>
      {inputError && <div className={styles.inputError}>{inputError}</div>}
      <input
        type="text"
        className={styles.updateInput}
        value={inputValue}
        onChange={({ target }) => {
          if (inputValue !== "") {
            setInputError(null)
          }
          setInputValue(target.value)
        }}
        placeholder="Введите отредактированную задачу..."
      />
      <button
        className={styles.updateButton}
        onClick={requestUpdateTodo}
        disabled={!!inputError}
      >
        ✎
      </button>
    </>
  )
}

UpdateTodo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  // handleOnAddClick: PropTypes.func.isRequired,
  setIsUpdating: PropTypes.func.isRequired,
}
