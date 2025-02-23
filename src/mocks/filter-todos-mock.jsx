export const filterTodosMock = async (value) => {
  try {
    const loadedData = await fetch(
      `http://localhost:3005/todoos?q=${value}`
    ).then((rawResponse) => rawResponse.json())
    return loadedData
  } catch (error) {
    console.error("Ошибка в поиске todos:", error)
    throw error
  }
}
