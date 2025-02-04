// import React from "react"
import PropTypes from "prop-types"
import TodoItem from "../TodoItem"
import Loader from "../Loader"

import "./styles.css"

const TodoList = ({ todos, isLoading }) => {
  if (isLoading) {
    return <Loader />
  }

  if (todos.length === 0) {
    return <div>Список пуст</div>
  }
  console.log(todos)

  return (
    <div className="list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
}

export default TodoList
