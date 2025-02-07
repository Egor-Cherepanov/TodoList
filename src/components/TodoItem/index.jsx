// import React from "react";
// import { useContext } from "react"
// import { TodosContext } from "../../context"
import PropTypes from "prop-types"
import RemoveTodo from "../RemoveTodo/index"
import { useState } from "react"
import { UpdateTodo } from "../UpdateTodo/UpdateTodo"
// import { Link } from "react-router-dom"

import "./styles.css"

// const TodoItem = ({ todo, handleOnAddClick }) => {
const TodoItem = ({ todo }) => {
  // const { todo } = useContext(TodosContext)
  const [isUpdating, setIsUpdating] = useState(false)
  return (
    <>
      {isUpdating ? (
        <li className={"todoItem"}>
          <UpdateTodo
            todo={todo}
            // handleOnAddClick={handleOnAddClick}
            setIsUpdating={setIsUpdating}
          />
          {/* <RemoveTodo id={todo.id} handleOnAddClick={handleOnAddClick} /> */}
          <RemoveTodo id={todo.id} />
        </li>
      ) : (
        <li className={"todoItem"}>
          <span className={"todoText"}>{todo.title}</span>
          <button
            className={"updateButton"}
            onClick={() => setIsUpdating(true)}
          >
            ✎
          </button>
          {/* <RemoveTodo id={todo.id} handleOnAddClick={handleOnAddClick} /> */}
          <RemoveTodo id={todo.id} />
        </li>
      )}
    </>
  )
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  // handleOnAddClick: PropTypes.func.isRequired,
}

export default TodoItem
