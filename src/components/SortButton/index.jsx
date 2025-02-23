// import PropTypes from "prop-types"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { getTodosAsync, sortTodosAsync } from "../../actions"
import styles from "./sortButton.module.css"

// export const SortButton = ({ sort, handleOnSortClick }) => {
export const SortButton = () => {
  const [sort, setSort] = useState(false)
  const dispatch = useDispatch()

  const handleOnSortClick = () => {
    if (sort) {
      dispatch(getTodosAsync)
      setSort(false)
    } else {
      dispatch(sortTodosAsync)
      setSort(true)
    }
  }
  return (
    <div className={styles.sortContainer}>
      <button onClick={handleOnSortClick} className={styles.sortBtn}>
        {sort ? "Изначальная сортировка" : "Отсортировать задачи по алфавиту"}
      </button>
    </div>
  )
}

// SortButton.propTypes = {
//   sort: PropTypes.oneOfType([
//     PropTypes.oneOf([null]),
//     PropTypes.shape({
//       key: PropTypes.string.isRequired,
//     }),
//   ]),
//   handleOnSortClick: PropTypes.func.isRequired,
// }
