export const updateTodoMock = async (id, value) => {
  try {
    const rawResponse = await fetch(`http://localhost:3005/todoos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title: value,
      }),
    }).then((rawResponse) => rawResponse.json())

    return rawResponse
  } catch (error) {
    console.error("Ошибка при редактировании todo:", error)
    throw error
  }
}
