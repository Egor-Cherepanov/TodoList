export const sortTodosMock = async () => {
  try {
    const loadedData = await fetch(
      `http://localhost:3005/todoos?_sort=title&_order=asc`
    ).then((rawResponse) => rawResponse.json())
    return loadedData
  } catch (error) {
    console.error("Ошибка в сортировке todos:", error)
    throw error
  }
}
