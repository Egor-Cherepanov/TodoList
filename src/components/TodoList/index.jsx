import TodoItem from "../TodoItem";
import { useRequestGetTodos  } from '../../hooks';

import './styles.css';
import Loader from "../Loader";

const TodoList = () => {
  const { todos, isLoading } = useRequestGetTodos();

  if (isLoading) {
    return <Loader />
  }

  if (todos.length === 0) {
    return <div>список пуст</div>;
  }

  return (
    <div className="list">
      {todos.map((todo) => 
        <TodoItem key={todo.id} todo={todo} />)} 
    </div>
  )
}

export default TodoList;