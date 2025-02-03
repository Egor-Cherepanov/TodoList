import TodoList from "../components/TodoList"
import AddTodoBlock from "../components/AddTodoBlock/add-todo-block"
import { FilterTodos } from "../components/FilterAndSort/FilterTodos/FilterTodos"
import { useGetTodos } from "../hooks/useGetTodos"
import SortButton from "../components/SortButton"

import styles from "./App.module.css"

export const HomePage = () => {
  const { todos, isLoading, setSort, setSearch } = useGetTodos();

  const handleOnSortClick = () => {
    setSort({ key: 'title' });
  }

  const handleOnSearch = (value) => {
    setSearch(value);
  }

  return (
    <div className={styles.todoApp}>
      <h1>Список дел</h1>
      <AddTodoBlock />
      <SortButton onClick={handleOnSortClick} />
      <FilterTodos onChange={handleOnSearch} />

      <TodoList todos={todos} isLoading={isLoading}  />
    </div>
  )
}
