export const getTodosMock = async () => {
  try {
    const loadedData = await fetch(`http://localhost:3005/todoos`).then(
      (rawResponse) => rawResponse.json()
    )
    return loadedData
  } catch (error) {
    console.error("Ошибка в загрузке todos:", error)
    throw error
  }
}
