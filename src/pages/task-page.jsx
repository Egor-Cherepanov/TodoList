import { useState } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import styles from "./App.module.css"
import { UpdateTodo } from "../components/update-todo/update-todo"
// import { useRequestGetTodos } from "../hooks/index"

export const TaskPage = () => {
  const { id } = useParams()
  const location = useLocation()
  // const { title } = location.state
  console.log(location)

  const navigate = useNavigate()
  const [isUpdating, setIsUpdating] = useState(false)
  const [inputValue, setInputValue] = useState("")

  return (
    <div className={styles.taskPage}>
      <button onClick={() => navigate(-1)}>❮ Назад</button>

      {isUpdating ? <UpdateTodo id={id} /> : <></>}

      <button
        onClick={startUpdateTodo}
        data-id={todo.id}
        className={styles.updateButton}
        data-text={todo.title}
      >
        Редактировать задачу
      </button>
      <button
        onClick={() => {
          const id = todo.id
          requestDeleteTodo({
            id,
            setRefreshProducts,
            refreshProducts,
            setAlfabetTodosUpdated,
          })
        }}
        data-id={todo.id}
        className={styles.deleteButton}
      >
        Удалить
      </button>
    </div>
  )
}
