import TodoList from "../components/TodoList"
import styles from "./App.module.css"

export const HomePage = () => {

  return (
    <div className={styles.todoApp}>
      <h1>Список дел</h1>

      <TodoList />
    </div>
  )
}
