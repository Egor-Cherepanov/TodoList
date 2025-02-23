import PropTypes from "prop-types"
import RemoveTodo from "../RemoveTodo/index"
import { useState } from "react"
import { UpdateTodo } from "../UpdateTodo/UpdateTodo"
import "./styles.css"

const TodoItem = ({ todo }) => {
  const [isUpdating, setIsUpdating] = useState(false)
  return (
    <>
      {isUpdating ? (
        <li className={"todoItem"}>
          <UpdateTodo todo={todo} setIsUpdating={setIsUpdating} />
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
}

export default TodoItem
