import PropTypes from "prop-types"

export const StartUpdateTodo = ({ setIsUpdating }) => {
  const startUpdateTodo = () => {
    setIsUpdating(true)
  }
  return <button onClick={startUpdateTodo}>Редактировать задачу</button>
}

StartUpdateTodo.propTypes = {
  setIsUpdating: PropTypes.func.isRequired,
}
