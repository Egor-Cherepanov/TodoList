import { useEffect, useState } from "react"
// import styles from "./App.module.css"
// import { use } from 'react'
import { todosAppLayout } from "./SecondExeLayout.jsx"

const debounce = (callBack, delay = 1000) => {
  let timeout
  return (...arg) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      callBack(...arg)
    }, delay)
  }
}

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
  const [isSorterdResults, setIsSorterdResults] = useState(false)

  const [alfabetTodosUpdated, setAlfabetTodosUpdated] = useState(false)

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
        setAlfabetTodosUpdated(false)
      })
  }

  const startUpdateTodo = ({ target }) => {
    setInputValue(target.dataset.text)
    setIsUpdating(true)
    setActualId(target.dataset.id)
    setAlfabetTodosUpdated(false)
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
        setAlfabetTodosUpdated(false)
      })
  }

  const filterTodos = ({ target }) => {
    setAlfabetTodosUpdated(false)
    setFilteredInput(target.value)
    console.log(todos)

    const debouncedSetSortedTodos = debounce((value) => {
      const filterSortedTodos = todos.filter((todo) => {
        return todo.title.toLowerCase().includes(value.toLowerCase())
      })
      setSortedTodos(filterSortedTodos)
      if (filterSortedTodos.length === 0) {
        setIsSorterdResults(true)
      } else {
        setIsSorterdResults(false)
      }
    })

    debouncedSetSortedTodos(target.value)
  }

  const getBackToTodosList = () => {
    setRefreshProducts(!refreshProducts)
  }

  const alfabetSortTodos = () => {
    if (alfabetTodosUpdated) {
      setRefreshProducts(todos)
    } else {
      setSortedTodos(sortedTodos.sort((a, b) => a.title.localeCompare(b.title)))
    }

    setAlfabetTodosUpdated(!alfabetTodosUpdated)
  }

  return (
    <todosAppLayout
      inputError={inputError}
      isUpdating={isUpdating}
      inputValue={inputValue}
      onInputChange={onInputChange}
      requestUpdateTodo={requestUpdateTodo}
      replaceAddTodo={replaceAddTodo}
      isCreating={isCreating}
      isFiltered={isFiltered}
      filteredInput={filteredInput}
      filterTodos={filterTodos}
      getBackToTodosList={getBackToTodosList}
      alfabetSortTodos={alfabetSortTodos}
      alfabetTodosUpdated={alfabetTodosUpdated}
      setIsFiltered={setIsFiltered}
      isLoading={isLoading}
      sortedTodos={[...sortedTodos]}
      startUpdateTodo={startUpdateTodo}
      requestDeleteTodo={requestDeleteTodo}
      isSorterdResults={isSorterdResults}
    />
    // <div className={styles.todoApp}>
    //   <h1>Список дел</h1>
    //   {inputError && <div className={styles.inputError}>{inputError}</div>}
    //   <div className={styles.todoForm}>
    //     {isUpdating ? (
    //       <>
    //         <input
    //           type="text"
    //           className={styles.todoInput}
    //           value={inputValue}
    //           onChange={onInputChange}
    //           placeholder="Введите отредактированную задачу..."
    //         />
    //         <button
    //           className={styles.addButton}
    //           onClick={requestUpdateTodo}
    //           disabled={!!inputError}
    //         >
    //           Отредактировать задачу
    //         </button>
    //       </>
    //     ) : (
    //       <>
    //         <input
    //           type="text"
    //           className={styles.todoInput}
    //           value={inputValue}
    //           onChange={onInputChange}
    //           placeholder="Введите задачу..."
    //         />
    //         <button
    //           className={styles.addButton}
    //           onClick={replaceAddTodo}
    //           disabled={isCreating || !!inputError}
    //         >
    //           Добавить задачу
    //         </button>
    //       </>
    //     )}
    //   </div>

    //   {isFiltered ? (
    //     <form className={styles.todooOptions}>
    //       <input
    //         type="search"
    //         className={styles.todoInput}
    //         value={filteredInput}
    //         onChange={filterTodos}
    //         placeholder="Введите задачу..."
    //       />
    //       <button
    //         type="submit"
    //         className={styles.optionsButton}
    //         onClick={getBackToTodosList}
    //       >
    //         Вернуться к задачам
    //       </button>
    //     </form>
    //   ) : (
    //     <div className={styles.todooOptions}>
    //       <button className={styles.optionsButton} onClick={alfabetSortTodos}>
    //         {alfabetTodosUpdated
    //           ? "Изначальная сортировка"
    //           : "Отсортировать задачи по алфавиту"}
    //       </button>
    //       <button
    //         className={styles.optionsButton}
    //         onClick={() => setIsFiltered(true)}
    //       >
    //         Найти задачу
    //       </button>
    //     </div>
    //   )}

    //   {isLoading ? (
    //     <div className={styles.loader}></div>
    //   ) : (
    //     <ul className={styles.todoList}>
    //       {sortedTodos.map((todo) => (
    //         <li key={todo.id} className={styles.todoItem}>
    //           <span className={styles.todoText}>{todo.title}</span>
    //           <button
    //             onClick={startUpdateTodo}
    //             data-id={todo.id}
    //             className={styles.updateButton}
    //             data-text={todo.title}
    //           >
    //             Редактировать задачу
    //           </button>
    //           <button
    //             onClick={requestDeleteTodo}
    //             data-id={todo.id}
    //             className={styles.deleteButton}
    //           >
    //             Удалить
    //           </button>
    //         </li>
    //       ))}
    //     </ul>
    //   )}
    //   {!!isSorterdResults && (
    //     <div className={styles.inputError}>Нет задач с таким текстом</div>
    //   )}
    // </div>
  )
}
