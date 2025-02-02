import { useEffect, useState } from "react"

export const useRequestGetTodos = ({ refreshProducts }) => {
  const [todos, setTodos] = useState([])
  const [sortedTodos, setSortedTodos] = useState([])

  useEffect(() => {
    fetch("http://localhost:3005/todoos")
      .then((loadedData) => loadedData.json())
      .then((loadedTodos) => {
        setTodos(loadedTodos)
        setSortedTodos(loadedTodos)
      })
  }, [refreshProducts])

  return { todos, sortedTodos, setSortedTodos }
}
