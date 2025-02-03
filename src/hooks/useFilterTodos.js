import { useState } from "react"
// import { useRequestGetTodos } from "./useGetTodos"

const debounce = (callBack, delay = 1000) => {
  let timeout
  return (...arg) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      callBack(...arg)
    }, delay)
  }
}

export const useFilterTodos = () => {
  const [filteredInput, setFilteredInput] = useState("")
  // const { todos, setSortedTodos } = useRequestGetTodos()

  const filterTodos = ({ value }) => {
    setFilteredInput(value)

    const debouncedSetSortedTodos = debounce(() => {
      // const filterSortedTodos = todos.filter((todo) => {
      //   return todo.title.toLowerCase().includes(value.toLowerCase())
      // })
      // setSortedTodos(filterSortedTodos)
    })

    debouncedSetSortedTodos(value)
  }

  return { filterTodos, filteredInput }
}
