import PropTypes from "prop-types"

export const AlfabetSortTodos = () => {
  const alfabetTodosUpdated = true;
  return (
    <div>
      <button>
        {alfabetTodosUpdated
          ? "Изначальная сортировка"
          : "Отсортировать задачи по алфавиту"}
      </button>
    </div>
  )
}

AlfabetSortTodos.propTypes = {
  setIsFiltered: PropTypes.func.isRequired, // Указываем, что setIsFiltered — это функция, и она обязательна
}
