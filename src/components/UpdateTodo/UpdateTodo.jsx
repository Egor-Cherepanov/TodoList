import { useState } from "react"
import PropTypes from "prop-types"
import styles from "./updateTodo.module.css"
import { useDispatch } from "react-redux"
import { updateTodo } from "../../actions"

export const UpdateTodo = ({ todo, setIsUpdating }) => {
  const [inputValue, setInputValue] = useState(todo.title)
  const [inputError, setInputError] = useState(null)
  const dispatch = useDispatch()

  const requestUpdateTodo = () => {
    if (inputValue === "") {
      return setInputError("Новая задача не должна быть пустой")
    } else {
      dispatch(updateTodo(todo.id, inputValue))
      setIsUpdating(false)
    }
  }

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
  setIsUpdating: PropTypes.func.isRequired,
}
