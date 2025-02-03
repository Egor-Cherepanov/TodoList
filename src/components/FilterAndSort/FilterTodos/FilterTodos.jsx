import PropTypes from "prop-types"
import { useFilterTodos } from "../../../hooks/useFilterTodos"

export const FilterTodos = ({ setIsFiltered }) => {
  const { filterTodos, filteredInput } = useFilterTodos()
  return (
    <form>
      <input
        type="search"
        value={filteredInput}
        onChange={({ target }) => {
          const value = target.value
          filterTodos(value)
        }}
        placeholder="Введите задачу..."
      />
      <button type="submit" onClick={() => setIsFiltered(false)}>
        Вернуться к задачам
      </button>
    </form>
  )
}

FilterTodos.propTypes = {
  setIsFiltered: PropTypes.func.isRequired,
}
