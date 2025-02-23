import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  getTodosAsync,
  removeTodo,
  addTodos,
  sortTodosAsync,
  updateTodo,
  filterTodosAsync,
} from "./actions"

export const Test = () => {
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todosState)
  const [inputValue, setInputValue] = useState("")
  const [updateInputValue, setUpdateInputValue] = useState("")
  const [filterInput, setFilterInput] = useState("")

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch(getTodosAsync)
    }
    fetchTodos()
  }, [])

  const remove = (id) => {
    dispatch(removeTodo(id))
  }

  const addTodo = (value) => {
    dispatch(addTodos(value))
  }

  const sort = () => {
    dispatch(sortTodosAsync)
  }

  const update = (id, value) => {
    dispatch(updateTodo(id, value))
  }

  const filter = (value) => {
    dispatch(filterTodosAsync(value))
  }

  return (
    <div>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={({ target }) => setInputValue(target.value)}
          placeholder="Введите новую задачу..."
        />
        <button onClick={() => addTodo(inputValue)}>ok</button>
      </div>
      <button onClick={sort}>sort</button>
      <div>
        <input
          type="text"
          value={updateInputValue}
          onChange={({ target }) => setUpdateInputValue(target.value)}
          placeholder="Введите отредактированную задачу..."
        />
        <button onClick={() => update("1", updateInputValue)}>ok</button>
      </div>

      <input
        type="text"
        value={filterInput}
        onChange={({ target }) => {
          setFilterInput(target.value)
          filter(target.value)
        }}
        placeholder="Найдите задачу..."
      />

      {todos.map((todo) => (
        <>
          <div key={todo.id}>{todo.title}</div>
          <button onClick={() => remove(todo.id)}>delete</button>
        </>
      ))}
    </div>
  )
}
