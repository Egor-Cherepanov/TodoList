import TodoItem from "../TodoItem"
import { useRequestGetTodos } from "../../hooks"
import "./styles.css"
import Loader from "../Loader"

const TodoList = (refreshTodos) => {
  const { todos, isLoading } = useRequestGetTodos(refreshTodos)

  if (isLoading) {
    return <Loader />
  }

  if (todos.length === 0) {
    return <div>Список пуст</div>
  }

  return (
    <div className="list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}

export default TodoList
