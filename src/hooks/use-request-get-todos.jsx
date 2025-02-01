import { useEffect, useState } from "react"

export const useRequestGetTodos = ({ setIsLoading, refreshProducts }) => {
  const [todos, setTodos] = useState([])
  const [sortedTodos, setSortedTodos] = useState([])

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

  return { todos, sortedTodos, setSortedTodos }
}
