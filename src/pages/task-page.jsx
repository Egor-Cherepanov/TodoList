import { useNavigate, useParams} from "react-router-dom"
import styles from "./App.module.css"
import TodoItem from "../components/TodoItem"
import useGetTodoById from "../hooks/useGetTodoById"
import Loader from "../components/Loader"
import RemoveTodo from "../components/RemoveTodo"

export const TaskPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { todo, isLoading } = useGetTodoById(id);

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={styles.taskPage}>
      <button onClick={() => navigate(-1)}>❮ Назад</button>

      {todo && <TodoItem todo={todo}/>}

      <RemoveTodo id={id} />

      {/* {isUpdating ? <UpdateTodo id={id} /> : <></>} */}

      {/* <button
        onClick={startUpdateTodo}
        data-id={todo.id}
        className={styles.updateButton}
        data-text={todo.title}
      >
        Редактировать задачу
      </button> */}
    </div>
  )
}
