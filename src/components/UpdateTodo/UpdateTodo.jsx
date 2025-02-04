import { useState } from "react"
import PropTypes from "prop-types"
import styles from "./updateTodo.module.css"
import { useRequestUpdateTodo } from "../../hooks/index"

export const UpdateTodo = ({ todo, goBackToMainPage }) => {
  const [inputValue, setInputValue] = useState(todo.title)
  const [inputError, setInputError] = useState(null)

  const { requestUpdateTodo } = useRequestUpdateTodo({
    inputValue,
    goBackToMainPage,
    id: todo.id,
    setInputError,
  })

  return (
    <>
      {inputError && <div className={styles.inputError}>{inputError}</div>}
      <div className={styles.updateContainer}>
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
          className={styles.addButton}
          onClick={requestUpdateTodo}
          disabled={!!inputError}
        >
          Отредактировать задачу
        </button>
      </div>
    </>
  )
}

UpdateTodo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  goBackToMainPage: PropTypes.func.isRequired,
}
