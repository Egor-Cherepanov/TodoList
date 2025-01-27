const debounce = (callBack, delay = 1000) => {
  let timeout
  return (...arg) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      callBack(...arg)
    }, delay)
  }
}

export const filterTodos = ({
  value,
  setFilteredInput,
  todos,
  setSortedTodos,
  setIsSorterdResults,
}) => {
  setFilteredInput(value)

  const debouncedSetSortedTodos = debounce((value) => {
    const filterSortedTodos = todos.filter((todo) => {
      return todo[1].title.toLowerCase().includes(value.toLowerCase())
    })
    setSortedTodos(filterSortedTodos)
    if (filterSortedTodos.length === 0) {
      setIsSorterdResults(true)
    } else {
      setIsSorterdResults(false)
    }
  })

  debouncedSetSortedTodos(value)
}
