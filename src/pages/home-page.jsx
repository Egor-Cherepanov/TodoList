import TodoList from "../components/TodoList"
import AddTodoBlock from "../components/AddTodoBlock/add-todo-block"
import styles from "./App.module.css"
import { useState } from "react"

export const HomePage = () => {
  const [refreshTodos, setRefreshTodos] = useState(false)

  const updateTodos = () => setRefreshTodos(!refreshTodos)
  return (
    <div className={styles.todoApp}>
      <h1>Список дел</h1>
      <AddTodoBlock updateTodos={updateTodos} />

      <TodoList refreshTodos={refreshTodos} />
    </div>
  )
}
