// import React from "react";
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

import "./styles.css"

const TodoItem = ({ todo }) => {
  return (
    <li className={"todoItem"}>
      <span className={"todoText"}>
        <Link to={`/task/${todo.id}`}>{todo.title}</Link>
      </span>
    </li>
  )
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
}

export default TodoItem
