import { useEffect, useState } from "react"

export const useRequestGetTodos = () => {
  const [todos, setTodos] = useState([])
  const [sortedTodos, setSortedTodos] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch("http://localhost:3005/todoos")
      .then((loadedData) => loadedData.json())
      .then((loadedTodos) => {
        setTodos(loadedTodos)
        setSortedTodos(loadedTodos)
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
      })
  }, [])

  return { todos, isLoading, sortedTodos, setSortedTodos }
}
