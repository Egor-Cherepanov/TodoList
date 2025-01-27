import { useState } from "react"
import styles from "./App.module.css"
import {
  useRequestAddTodo,
  requestDeleteTodo,
  useRequestGetTodos,
  useRequestUpdateTodo,
} from "./hooks/index"
import { alfabetSortTodos, filterTodos } from "./filterAndSortFunc/index"

export function App() {
  const [inputError, setInputError] = useState(null)
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const [actualId, setActualId] = useState("")
  const [isFiltered, setIsFiltered] = useState(false)
  const [filteredInput, setFilteredInput] = useState("")
  const [isSorterdResults, setIsSorterdResults] = useState(false)

  const [alfabetTodosUpdated, setAlfabetTodosUpdated] = useState(false)

  const { isCreating, requestAddTodo } = useRequestAddTodo({
    inputValue,
    setInputValue,
    setInputError,
  })
  const { todos, sortedTodos, setSortedTodos } =
    useRequestGetTodos(setIsLoading)
  const { isUpdating, setIsUpdating, requestUpdateTodo } = useRequestUpdateTodo(
    {
      inputValue,
      setInputValue,
      setInputError,
      actualId,
      setActualId,
    }
  )

  const onInputChange = ({ target }) => {
    let newError = null
    if (target.value.length > 90) {
      newError = "Длина текста задачи должна быть не больше 90 символов"
    }
    setInputValue(target.value)
    setInputError(newError)
  }

  const startUpdateTodo = ({ target }) => {
    setInputValue(target.dataset.text)
    setIsUpdating(true)
    setActualId(target.dataset.id)
    setAlfabetTodosUpdated(false)
  }

  const getBackToTodosList = () => {
    setSortedTodos(todos)
  }

  return (
    <div className={styles.todoApp}>
      <h1>Список дел</h1>
      {inputError && <div className={styles.inputError}>{inputError}</div>}
      <div className={styles.todoForm}>
        {isUpdating ? (
          <>
            <input
              type="text"
              className={styles.todoInput}
              value={inputValue}
              onChange={onInputChange}
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
        ) : (
          <>
            <input
              type="text"
              className={styles.todoInput}
              value={inputValue}
              onChange={onInputChange}
              placeholder="Введите задачу..."
            />
            <button
              className={styles.addButton}
              onClick={requestAddTodo}
              disabled={isCreating || !!inputError}
            >
              Добавить задачу
            </button>
          </>
        )}
      </div>

      {isFiltered ? (
        <form className={styles.todooOptions}>
          <input
            type="search"
            className={styles.todoInput}
            value={filteredInput}
            onChange={({ target }) => {
              const value = target.value
              filterTodos({
                value,
                setFilteredInput,
                todos,
                setSortedTodos,
                setIsSorterdResults,
              })
            }}
            placeholder="Введите задачу..."
          />
          <button
            type="submit"
            className={styles.optionsButton}
            onClick={getBackToTodosList}
          >
            Вернуться к задачам
          </button>
        </form>
      ) : (
        <div className={styles.todooOptions}>
          <button
            className={styles.optionsButton}
            onClick={() =>
              alfabetSortTodos({
                alfabetTodosUpdated,
                setSortedTodos,
                todos,
                sortedTodos,
                setAlfabetTodosUpdated,
              })
            }
          >
            {alfabetTodosUpdated
              ? "Изначальная сортировка"
              : "Отсортировать задачи по алфавиту"}
          </button>
          <button
            className={styles.optionsButton}
            onClick={() => setIsFiltered(true)}
          >
            Найти задачу
          </button>
        </div>
      )}

      {isLoading ? (
        <div className={styles.loader}></div>
      ) : (
        <ul className={styles.todoList}>
          {sortedTodos.map(([id, { title }]) => (
            <li key={id} className={styles.todoItem}>
              <span className={styles.todoText}>{title}</span>
              <button
                onClick={startUpdateTodo}
                data-id={id}
                className={styles.updateButton}
                data-text={title}
              >
                Редактировать задачу
              </button>
              <button
                onClick={({ target }) => requestDeleteTodo(target.dataset.id)}
                data-id={id}
                className={styles.deleteButton}
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      )}
      {!!isSorterdResults && (
        <div className={styles.inputError}>Нет задач с таким текстом</div>
      )}
    </div>
  )
}
