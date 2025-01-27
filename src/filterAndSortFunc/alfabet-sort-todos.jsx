export const alfabetSortTodos = ({
  alfabetTodosUpdated,
  setSortedTodos,
  todos,
  sortedTodos,
  setAlfabetTodosUpdated,
}) => {
  if (alfabetTodosUpdated) {
    setSortedTodos(todos)
  } else {
    setSortedTodos(
      sortedTodos.sort((a, b) => a[1].title.localeCompare(b[1].title))
    )
  }
  setAlfabetTodosUpdated(!alfabetTodosUpdated)
}
