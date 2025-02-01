import { useState } from "react"
import styles from "./App.module.css"
import {
  useRequestAddTodo,
  useRequestGetTodos,
  useRequestUpdateTodo,
} from "./hooks/index"
import {
  alfabetSortTodos,
  filterTodos,
  requestDeleteTodo,
} from "./userOperations/index"
// import { Routes, Route } from "react-router-dom"

export function App() {
  const [refreshProducts, setRefreshProducts] = useState(false)
  const [inputError, setInputError] = useState(null)
  //CRUD
  const [isLoading, setIsLoading] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [actualId, setActualId] = useState(0)
  //options
  const [isFiltered, setIsFiltered] = useState(false)
  const [filteredInput, setFilteredInput] = useState("")
  const [isSorterdResults, setIsSorterdResults] = useState(false)

  const [alfabetTodosUpdated, setAlfabetTodosUpdated] = useState(false)

  const { isCreating, requestAddTodo } = useRequestAddTodo({
    inputValue,
    setInputValue,
    setInputError,
    setRefreshProducts,
    refreshProducts,
    setAlfabetTodosUpdated,
  })
  const { todos, sortedTodos, setSortedTodos } = useRequestGetTodos({
    setIsLoading,
    refreshProducts,
  })
  const { isUpdating, setIsUpdating, requestUpdateTodo } = useRequestUpdateTodo(
    {
      inputValue,
      setInputValue,
      setInputError,
      actualId,
      setActualId,
      setRefreshProducts,
      refreshProducts,
      setAlfabetTodosUpdated,
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
    setRefreshProducts(!refreshProducts)
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
                setRefreshProducts,
                refreshProducts,
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
          {sortedTodos.map((todo) => (
            <li key={todo.id} className={styles.todoItem}>
              <span className={styles.todoText}>{todo.title}</span>
              <button
                onClick={startUpdateTodo}
                data-id={todo.id}
                className={styles.updateButton}
                data-text={todo.title}
              >
                Редактировать задачу
              </button>
              <button
                onClick={() => {
                  const id = todo.id
                  requestDeleteTodo({
                    id,
                    setRefreshProducts,
                    refreshProducts,
                    setAlfabetTodosUpdated,
                  })
                }}
                data-id={todo.id}
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
