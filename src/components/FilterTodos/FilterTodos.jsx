// import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { filterTodosAsync } from "../../actions"
import { useState } from "react"
import styles from "./filterTodos.module.css"

// const debounce = (callBack, delay = 500) => {
//   let timeout
//   return (...arg) => {
//     clearTimeout(timeout)
//     timeout = setTimeout(() => {
//       callBack(...arg)
//     }, delay)
//   }
// }

// export const FilterTodos = ({ handleOnSearch }) => {
export const FilterTodos = () => {
  const [value, setValue] = useState("")
  const dispatch = useDispatch()

  const onSearchInputChange = ({ target }) => {
    setValue(target.value)

    dispatch(filterTodosAsync(value))

    // const debouncedSetSortedTodos = debounce(() => {
    //   return handleOnSearch(target.value)
    // })

    // debouncedSetSortedTodos()
  }

  return (
    <form className={styles.searchForm}>
      <input
        type="search"
        value={value}
        onChange={onSearchInputChange}
        placeholder="Введите текст нужной задачи..."
        className={styles.searchInput}
      />
    </form>
  )
}

// FilterTodos.propTypes = {
//   handleOnSearch: PropTypes.func.isRequired,
// }
