import { useEffect, useState } from "react"

function searchString(search, sort) {
  const params = new URLSearchParams()

  if (search) {
    params.append("q", search)
  }

  if (sort) {
    params.append("_sort", sort.key)
    params.append("_order", sort.order || "asc")
  }

  return `?${params.toString()}`
}

export const useGetTodos = () => {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState(null) // { key: 'title', order: 'asc' }
  const [add, setAdd] = useState(false)

  const fetchTodos = () => {
    setIsLoading(true)
    return (
      fetch(`http://localhost:3005/todoos${searchString(search, sort)}`)
        // ${searchString(sort)}`)
        .then((loadedData) => loadedData.json())
        .then((loadedTodos) => setTodos(loadedTodos))
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false)
          }, 1000)
        })
    )
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  useEffect(() => {
    fetchTodos()
  }, [sort, search, add])

  return {
    todos,
    isLoading,
    refetch: fetchTodos,
    sort,
    setSort,
    search,
    setSearch,
    setAdd,
    add,
  }
}
