import React from "react"
import { useContext } from "react"
import { TodosContext } from "../../context"
import useRemoveTodo from "../../hooks/useRemoveTodo"
import "./removeTodo.css"
// import { useNavigate } from "react-router-dom"

const RemoveTodo = ({ id }) => {
  const removeTodo = useRemoveTodo(id)
  const { handleOnAddClick } = useContext(TodosContext)

  const handleClick = async () => {
    const isConfermed = confirm("Точно удалить?")

    if (isConfermed) {
      await removeTodo()
      handleOnAddClick()
    }
  }

  return (
    <button onClick={handleClick} className="remove-btn">
      🗑
    </button>
  )
}

export default RemoveTodo
