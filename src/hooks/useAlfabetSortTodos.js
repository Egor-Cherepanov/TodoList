import { useState } from "react"
import { useRequestGetTodos } from "./useGetTodos"

const useAlfabetSortTodos = () => {
  const [alfabetTodosUpdated, setAlfabetTodosUpdated] = useState(false)
  const { todos, setSortedTodos, sortedTodos } = useRequestGetTodos()

  const alfabetSortTodos = () => {
    if (alfabetTodosUpdated) {
      console.log(sortedTodos)
      setSortedTodos(todos)
    } else {
      setSortedTodos(todos.sort((a, b) => a.title.localeCompare(b.title)))
      console.log(sortedTodos)
    }
    setAlfabetTodosUpdated(!alfabetTodosUpdated)
  }

  return { alfabetSortTodos, alfabetTodosUpdated }
}

export default useAlfabetSortTodos
