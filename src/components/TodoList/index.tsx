import React from "react"
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

  return (
    <div className="list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}

export default TodoList
