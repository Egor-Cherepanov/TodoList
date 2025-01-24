import PropTypes from "prop-types"
import styles from "./App.module.css"

export const todosAppLayout = (props) => {
  const {
    inputError,
    isUpdating,
    inputValue,
    onInputChange,
    requestUpdateTodo,
    replaceAddTodo,
    isCreating,
    isFiltered,
    filteredInput,
    filterTodos,
    getBackToTodosList,
    alfabetSortTodos,
    alfabetTodosUpdated,
    setIsFiltered,
    isLoading,
    sortedTodos,
    startUpdateTodo,
    requestDeleteTodo,
    isSorterdResults,
  } = props
  return (
    <div className={styles.todoApp}>
      <h1>Список дел</h1>
      {inputError && <div className={styles.inputError}>{inputError}</div>}
      <div className={styles.todoForm}>
        {isUpdating ? (
          <>
            <input
              type="text"
              className={styles.todoInput}
              value={inputValue}
              onChange={onInputChange}
              placeholder="Введите отредактированную задачу..."
            />
            <button
              className={styles.addButton}
              onClick={requestUpdateTodo}
              disabled={!!inputError}
            >
              Отредактировать задачу
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              className={styles.todoInput}
              value={inputValue}
              onChange={onInputChange}
              placeholder="Введите задачу..."
            />
            <button
              className={styles.addButton}
              onClick={replaceAddTodo}
              disabled={isCreating || !!inputError}
            >
              Добавить задачу
            </button>
          </>
        )}
      </div>

      {isFiltered ? (
        <form className={styles.todooOptions}>
          <input
            type="search"
            className={styles.todoInput}
            value={filteredInput}
            onChange={filterTodos}
            placeholder="Введите задачу..."
          />
          <button
            type="submit"
            className={styles.optionsButton}
            onClick={getBackToTodosList}
          >
            Вернуться к задачам
          </button>
        </form>
      ) : (
        <div className={styles.todooOptions}>
          <button className={styles.optionsButton} onClick={alfabetSortTodos}>
            {alfabetTodosUpdated
              ? "Изначальная сортировка"
              : "Отсортировать задачи по алфавиту"}
          </button>
          <button
            className={styles.optionsButton}
            onClick={() => setIsFiltered(true)}
          >
            Найти задачу
          </button>
        </div>
      )}

      {isLoading ? (
        <div className={styles.loader}></div>
      ) : (
        <ul className={styles.todoList}>
          {sortedTodos.map((todo) => (
            <li key={todo.id} className={styles.todoItem}>
              <span className={styles.todoText}>{todo.title}</span>
              <button
                onClick={startUpdateTodo}
                data-id={todo.id}
                className={styles.updateButton}
                data-text={todo.title}
              >
                Редактировать задачу
              </button>
              <button
                onClick={requestDeleteTodo}
                data-id={todo.id}
                className={styles.deleteButton}
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      )}
      {!!isSorterdResults && (
        <div className={styles.inputError}>Нет задач с таким текстом</div>
      )}
    </div>
  )
}

todosAppLayout.propTypes = {
  inputError: PropTypes.string,
  isUpdating: PropTypes.bool,
  inputValue: PropTypes.string,
  onInputChange: PropTypes.func,
  requestUpdateTodo: PropTypes.func,
  replaceAddTodo: PropTypes.func,
  isCreating: PropTypes.bool,
  isFiltered: PropTypes.bool,
  filteredInput: PropTypes.string,
  filterTodos: PropTypes.func,
  getBackToTodosList: PropTypes.func,
  alfabetSortTodos: PropTypes.func,
  alfabetTodosUpdated: PropTypes.bool,
  setIsFiltered: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  sortedTodos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  startUpdateTodo: PropTypes.func,
  requestDeleteTodo: PropTypes.func,
  isSorterdResults: PropTypes.bool,
}
