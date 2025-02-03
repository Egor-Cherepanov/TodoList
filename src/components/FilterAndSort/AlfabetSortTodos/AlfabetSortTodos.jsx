import useAlfabetSortTodos from "../../../hooks/useAlfabetSortTodos"
import PropTypes from "prop-types"

export const AlfabetSortTodos = ({ setIsFiltered }) => {
  const { alfabetSortTodos, alfabetTodosUpdated } = useAlfabetSortTodos()

  return (
    <div>
      <button onClick={alfabetSortTodos}>
        {alfabetTodosUpdated
          ? "Изначальная сортировка"
          : "Отсортировать задачи по алфавиту"}
      </button>
      <button onClick={() => setIsFiltered(true)}>Найти задачу</button>
    </div>
  )
}

AlfabetSortTodos.propTypes = {
  setIsFiltered: PropTypes.func.isRequired, // Указываем, что setIsFiltered — это функция, и она обязательна
}
