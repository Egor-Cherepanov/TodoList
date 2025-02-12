// import React from "react"
// import PropTypes from "prop-types"
import { useContext } from "react"
import { TodosContext } from "../../context"
import TodoItem from "../TodoItem"
import Loader from "../Loader"

import "./styles.css"

// const TodoList = ({ todos, isLoading, handleOnAddClick }) => {
const TodoList = () => {
  const { todos, isLoading } = useContext(TodosContext)

  if (isLoading) {
    return <Loader />
  }

  if (todos.length === 0) {
    return <div>Список пуст</div>
  }

  return (
    <div className="list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          // handleOnAddClick={handleOnAddClick}
        />
      ))}
    </div>
  )
}

// TodoList.propTypes = {
//   todos: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       title: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   isLoading: PropTypes.bool.isRequired,
//   handleOnAddClick: PropTypes.func.isRequired,
// }

export default TodoList
