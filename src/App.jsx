import { useEffect, useState } from "react"
import styles from "./App.module.css"
// import { use } from 'react'

export function App() {
  const [todos, setTodoos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((loadedData) => loadedData.json())
      .then((loadedTodoos) => {
        setTodoos(loadedTodoos)
      })
      .finally(() => setIsLoading(false))
  }, [])
  return (
    <div className={styles.todoApp}>
      <h1>Список дел</h1>
      <div className={styles.todoForm}>
        {isLoading ? (
          <div className={styles.loader}></div>
        ) : (
          <ul className={styles.todoList}>
            {todos.map((todo) => (
              <li key={todo.id} className={styles.todoItem}>
                <span className={styles.todoText}>{todo.title}</span>
                {/* <button
                className="delete-button"
                onClick={() => deleteTodo(index)}
              >
                Удалить
              </button> */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
