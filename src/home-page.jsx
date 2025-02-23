import { TodoList } from "./components/TodoList"
import AddTodoBlock from "./components/AddTodoBlock/AddTodo"
import { FilterTodos } from "./components/FilterTodos/FilterTodos"
import { SortButton } from "./components/SortButton"

import styles from "./App.module.css"

export const HomePage = () => {
  return (
    <div className={styles.todoApp}>
      <h1>Список дел</h1>
      <AddTodoBlock />
      <SortButton />
      <FilterTodos />

      <TodoList />
    </div>
  )
}
