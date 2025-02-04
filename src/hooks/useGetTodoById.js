import { useEffect, useState } from "react"

export const useGetTodoById = (id) => {
  const [todo, setTodo] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch(`http://localhost:3005/todoos/${id}`)
      .then((loadedData) => loadedData.json())
      .then((todo) => {
        setTodo(todo)
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false)
        }, 300)
      })
  }, [id])

  return { todo, isLoading }
}
