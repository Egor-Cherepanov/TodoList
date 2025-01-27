import { useEffect, useState } from "react"
import { ref, onValue } from "firebase/database"
import { db } from "../firebase"

export const useRequestGetTodos = (setIsLoading) => {
  const [todos, setTodos] = useState([])
  const [sortedTodos, setSortedTodos] = useState([])

  useEffect(() => {
    const todosDbRef = ref(db, "todos")

    return onValue(todosDbRef, (snapshot) => {
      const loadedTodos = snapshot.val()
      setTodos(Object.entries(loadedTodos))
      setSortedTodos(Object.entries(loadedTodos))
      setIsLoading(false)
    })
  }, [])

  return { todos, sortedTodos, setSortedTodos }
}
