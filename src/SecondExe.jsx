import { useEffect, useState } from "react"
import styles from "./App.module.css"
// import { use } from 'react'

export function App() {
  const [todos, setTodos] = useState([])
  const [sortedTodos, setSortedTodos] = useState([])

  const [refreshProducts, setRefreshProducts] = useState(false)
  const [inputError, setInputError] = useState(null)
  //CRUD
  const [isLoading, setIsLoading] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [actualId, setActualId] = useState(0)
  const [isCreating, setIsCreating] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  //options
  const [isFiltered, setIsFiltered] = useState(false)
  const [filteredInput, setFilteredInput] = useState("")
  // const [filteredTodoos, setFilteredTodoos] = useState("")

  const [alfabetTodoosUpdated, setAlfabetTodoosUpdated] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch("http://localhost:3005/todoos")
      .then((loadedData) => loadedData.json())
      .then((loadedTodos) => {
        setTodos(loadedTodos)
        setSortedTodos(loadedTodos)
      })
      .finally(() => setIsLoading(false))
  }, [refreshProducts])

  const onInputChange = ({ target }) => {
    let newError = null
    if (target.value.length > 90) {
      newError = "Длина текста задачи должна быть не больше 90 символов"
    }
    setInputValue(target.value)
    setInputError(newError)
  }

  const replaceAddTodo = () => {
    if (inputValue === "") {
      return setInputError("Введите текст задачи")
    }

    fetch("http://localhost:3005/todoos", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title: inputValue,
      }),
    })
      .then((loadedData) => loadedData.json())
      .then((response) => {
        console.log("Задача добавлена, ответ сервера:", response)
        setRefreshProducts(!refreshProducts)
      })
      .finally(() => {
        setIsCreating(false)
        setInputValue("")
        setAlfabetTodoosUpdated(false)
      })
  }

  const startUpdateTodo = ({ target }) => {
    setInputValue(target.dataset.text)
    setIsUpdating(true)
    setActualId(target.dataset.id)
    setAlfabetTodoosUpdated(false)
  }

  const requestUpdateTodo = () => {
    if (inputValue === "") {
      return setInputError("Введите текст задачи")
    }

    fetch(`http://localhost:3005/todoos/${actualId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title: inputValue,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log("Задача обновлена, ответ сервера:", response)
        setRefreshProducts(!refreshProducts)
      })
      .finally(() => {
        setIsUpdating(false)
        setInputValue("")
        setActualId(0)
        setAlfabetTodoosUpdated(false)
      })
  }

  const requestDeleteTodo = ({ target }) => {
    fetch(`http://localhost:3005/todoos/${target.dataset.id}`, {
      method: "DELETE",
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log("Задача удалена, ответ сервера: ", response)
      })
      .finally(() => {
        setRefreshProducts(!refreshProducts)
        setAlfabetTodoosUpdated(false)
      })
  }

  const debounce = (callBack, delay = 1000) => {
    let timeout
    return (...arg) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        callBack(...arg)
      }, delay)
    }
  }

  const filterTodos = ({ target }) => {
    setAlfabetTodoosUpdated(false)
    setFilteredInput(target.value)
    console.log(sortedTodos)

    if (sortedTodos.length === 0) {
      setSortedTodos(todos)
    }

    const debouncedSetSortedTodos = debounce((value) => {
      setSortedTodos(
        sortedTodos.filter((todo) => {
          return todo.title.toLowerCase().includes(value.toLowerCase())
        })
      )
    })

    debouncedSetSortedTodos(target.value)
  }

  const alfabetSortTodos = () => {
    if (alfabetTodoosUpdated) {
      setRefreshProducts(todos)
    } else {
      setSortedTodos(sortedTodos.sort((a, b) => a.title.localeCompare(b.title)))
    }
    setAlfabetTodoosUpdated(!alfabetTodoosUpdated)
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
              onClick={replaceAddTodo}
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
            onChange={filterTodos}
            placeholder="Введите задачу..."
          />
          <button type="submit" className={styles.optionsButton}>
            Искать!
          </button>
        </form>
      ) : (
        <div className={styles.todooOptions}>
          <button className={styles.optionsButton} onClick={alfabetSortTodos}>
            {alfabetTodoosUpdated
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
                onClick={requestDeleteTodo}
                data-id={todo.id}
                className={styles.deleteButton}
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      )}
      {}
    </div>
  )
}
