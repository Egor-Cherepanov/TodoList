import React from "react";
import { Link } from "react-router-dom"

import './styles.css';

const TodoItem = ({ todo }) => {
  return (
    <li className={'todoItem'}>
      <span className={'todoText'}>
        <Link to={`/task/${todo.id}`}>
          {todo.title}
        </Link>
      </span>
    </li>
  )
}

export default TodoItem;