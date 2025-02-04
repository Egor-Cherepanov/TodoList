import React from "react"
import useRemoveTodo from "../../hooks/useRemoveTodo"
import "./removeTodo.css"
import { useNavigate } from "react-router-dom"

const RemoveTodo = ({ id }) => {
  const navigate = useNavigate()
  const removeTodo = useRemoveTodo(id)

  const handleClick = async () => {
    const isConfermed = confirm("Точно удалить?")

    if (isConfermed) {
      await removeTodo()
      navigate("/")
    }
  }

  return (
    <button onClick={handleClick} className="remove-btn">
      Удалить
    </button>
  )
}

export default RemoveTodo
