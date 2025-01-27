import { ref, remove } from "firebase/database"
import { db } from "../firebase"

export const requestDeleteTodo = (id) => {
  const todoDbRef = ref(db, `todos/${id}`)
  remove(todoDbRef).then((response) => {
    console.log("Задача удалена, ответ сервера: ", response)
  })
}
