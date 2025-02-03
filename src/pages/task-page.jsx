import { useNavigate, useParams } from "react-router-dom"
import styles from "./App.module.css"
import TodoItem from "../components/TodoItem"
import useGetTodoById from "../hooks/useGetTodoById"
import Loader from "../components/Loader"
import RemoveTodo from "../components/RemoveTodo"
import { StartUpdateTodo } from "../components/StartUpdateTodo"
import { useState } from "react"

export const TaskPage = () => {
  const navigate = useNavigate()

  const { id } = useParams()
  const { todo, isLoading } = useGetTodoById(id)
  const [isUpdating, setIsUpdating] = useState(false)
  console.log(todo)

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={styles.taskPage}>
      <button onClick={() => navigate(-1)}>❮ Назад</button>

      {isUpdating ? <UpdateTodo /> : <TodoItem todo={todo} />}

      <RemoveTodo id={id} />
      <StartUpdateTodo setIsUpdating={setIsUpdating} />
    </div>
  )
}
