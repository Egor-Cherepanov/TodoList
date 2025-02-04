import { useNavigate, useParams } from "react-router-dom"
import styles from "./App.module.css"
import { useGetTodoById } from "../hooks/useGetTodoById"
import Loader from "../components/Loader"
import RemoveTodo from "../components/RemoveTodo"
import { UpdateTodo } from "../components/UpdateTodo/UpdateTodo"
import { TodoNotFound } from "../components/TodoNotFound/TodoNotFound"
import { useState } from "react"

export const TaskPage = () => {
  const navigate = useNavigate()

  const { id } = useParams()

  const { todo, isLoading } = useGetTodoById(id)

  const [isUpdating, setIsUpdating] = useState(false)

  console.log(todo)
  if (!todo.title) {
    return <TodoNotFound />
  }

  if (isLoading) {
    return <Loader />
  }

  const goBackToMainPage = () => {
    navigate(-1)
  }

  return (
    <div className={styles.taskPage}>
      <button onClick={goBackToMainPage}>❮ Назад</button>

      {isUpdating ? (
        <UpdateTodo todo={todo} goBackToMainPage={goBackToMainPage} />
      ) : (
        <div className={styles.todoContainer}>
          <div className={styles.todoTitle}>{todo.title}</div>
          <div className={styles.removeAndUpdateBtns}>
            <RemoveTodo id={id} />
            <button
              className={styles.updateButton}
              onClick={() => setIsUpdating(true)}
            >
              Редактировать задачу
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
