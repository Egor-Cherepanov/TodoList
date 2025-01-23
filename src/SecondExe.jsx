import { useEffect, useState } from "react"
import styles from "./App.module.css"
// import { use } from 'react'

export function App() {
  const [todos, setTodoos] = useState([])
  const [refreshProducts, setRefreshProducts] = useState(false)
  const [inputError, setInputError] = useState(null)
  //CRUD
  const [isLoading, setIsLoading] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [actualId, setActualId] = useState(0)
  const [isCreating, setIsCreating] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  //options
  const [isFinding, setIsFinding] = useState(false)
  const [findingInput, setFindingInput] = useState("")
  const [sortTodoos, setSortTodoos] = useState([])
  const [sortTodoosUpdated, setSortTodoosUpdated] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch("http://localhost:3005/todoos")
      .then((loadedData) => loadedData.json())
      .then((loadedTodoos) => {
        setTodoos(loadedTodoos)
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

  const replaceAddTodoo = () => {
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
      })
  }

  const startUpdateTodoo = ({ target }) => {
    setInputValue(target.dataset.text)
    setIsUpdating(true)
    setActualId(target.dataset.id)
  }

  const requestUpdateTodoo = () => {
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
      })
  }

  const requestDeleteTodoo = ({ target }) => {
    fetch(`http://localhost:3005/todoos/${target.dataset.id}`, {
      method: "DELETE",
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log("Задача удалена, ответ сервера: ", response)
      })
      .finally(() => setRefreshProducts(!refreshProducts))
  }

  const searchTodoo = (formData) => {
    console.log(formData)
  }

  const alfabetSortTodoos = () => {
    setSortTodoos(todos.sort((a, b) => a.title.localeCompare(b.title)))
    setSortTodoosUpdated(true)
  }

  return (
    <div className={styles.todoApp} onClick={() => setSortTodoosUpdated(false)}>
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
              onClick={requestUpdateTodoo}
              disabled={isCreating || !!inputError}
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
              onClick={replaceAddTodoo}
              disabled={isCreating || !!inputError}
            >
              Добавить задачу
            </button>
          </>
        )}
      </div>

      {isFinding ? (
        <form className={styles.todooOptions} action={todos}>
          <input
            type="search"
            className={styles.todoInput}
            value={findingInput}
            onChange={(e) => setFindingInput(e.value)}
            placeholder="Введите задачу..."
          />
          <button type="submit" className={styles.optionsButton}>
            Искать!
          </button>
        </form>
      ) : (
        <div className={styles.todooOptions}>
          <button className={styles.optionsButton} onClick={alfabetSortTodoos}>
            Отсортировать задачи по алфавиту
          </button>
          <button
            className={styles.optionsButton}
            onClick={() => setIsFinding(true)}
          >
            Найти задачу
          </button>
        </div>
      )}

      {isLoading ? (
        <div className={styles.loader}></div>
      ) : (
        <ul className={styles.todoList}>
          {(sortTodoosUpdated ? sortTodoos : todos).map((todo) => (
            <li key={todo.id} className={styles.todoItem}>
              <span className={styles.todoText}>{todo.title}</span>
              <button
                onClick={startUpdateTodoo}
                data-id={todo.id}
                className={styles.updateButton}
                data-text={todo.title}
              >
                Редактировать задачу
              </button>
              <button
                onClick={requestDeleteTodoo}
                data-id={todo.id}
                className={styles.deleteButton}
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
