export const addTodoMock = async (value) => {
  try {
    const newTodo = await fetch("http://localhost:3005/todoos", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title: value,
      }),
    }).then((rawResponse) => rawResponse.json())
    return newTodo
  } catch (error) {
    console.error("Ошибка при добавлении todo:", error)
    throw error
  }
}
