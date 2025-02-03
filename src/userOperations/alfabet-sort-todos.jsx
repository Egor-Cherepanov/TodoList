export const alfabetSortTodos = ({
  alfabetTodosUpdated,
  setSortedTodos,
  todos,
  setRefreshProducts,
  refreshProducts,
  setAlfabetTodosUpdated,
}) => {
  if (alfabetTodosUpdated) {
    console.log(alfabetTodosUpdated)
    setSortedTodos(todos)
    setRefreshProducts(!refreshProducts)
  } else {
    setSortedTodos(todos.sort((a, b) => a.title.localeCompare(b.title)))
  }
  setAlfabetTodosUpdated(!alfabetTodosUpdated)
}
