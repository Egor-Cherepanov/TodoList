import TodoList from "../components/TodoList"
import AddTodoBlock from "../components/AddTodoBlock/AddTodo"
import { FilterTodos } from "../components/FilterTodos/FilterTodos"
import { useGetTodos } from "../hooks/useGetTodos"
import { SortButton } from "../components/SortButton"
import { TodosContext } from "../context"

import styles from "./App.module.css"

export const HomePage = () => {
  const { todos, isLoading, sort, setSort, setSearch, setAdd, add } =
    useGetTodos()

  const handleOnSortClick = () => {
    if (sort) {
      setSort(null)
    } else {
      setSort({ key: "title" })
    }
  }

  const handleOnSearch = (value) => {
    setSearch(value)
  }

  const handleOnAddClick = () => {
    setAdd(!add)
  }

  return (
    <div className={styles.todoApp}>
      <h1>Список дел</h1>
      <AddTodoBlock handleOnAddClick={handleOnAddClick} />
      <SortButton handleOnSortClick={handleOnSortClick} sort={sort} />
      <FilterTodos handleOnSearch={handleOnSearch} />

      <TodosContext.Provider value={{ todos, isLoading, handleOnAddClick }}>
        <TodoList
        // todos={todos}
        // isLoading={isLoading}
        // handleOnAddClick={handleOnAddClick}
        />
      </TodosContext.Provider>
    </div>
  )
}
