export const removeTodoMock = async (id) => {
  try {
    const rawResponse = await fetch(`http://localhost:3005/todoos/${id}`, {
      method: "DELETE",
    }).then((rawResponse) => rawResponse.json())

    return rawResponse
  } catch (error) {
    console.error("Ошибка при удалении todo:", error)
    throw error
  }
}
