import { useEffect, useState } from "react";

const useGetTodoById = (id: string) => {
  const [todo, setTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    fetch(`http://localhost:3005/todoos/${id}`)
      .then((loadedData) => loadedData.json())
      .then((todo) => {
        setTodo(todo)
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false)
        }, 300)
      })
  }, [id]);

  return { todo, isLoading };
}

export default useGetTodoById;