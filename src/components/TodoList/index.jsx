// import { useContext } from "react"
// import { TodosContext } from "../../context"
import TodoItem from "../TodoItem"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getTodosAsync } from "../../actions"
// import Loader from "../Loader"

import "./styles.css"

export const TodoList = () => {
  // const { todos, isLoading } = useContext(TodosContext)

  // if (isLoading) {
  //   return <Loader />
  // }

  const todos = useSelector((state) => state.todosState)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch(getTodosAsync)
    }
    fetchTodos()
  }, [])

  if (todos.length === 0) {
    return <div>Список пуст</div>
  }

  return (
    <div className="list">
      {todos.map((todo) => (
        // <TodoItem key={todo.id} id={todo.id} />
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}
