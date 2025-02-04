import PropTypes from "prop-types"
import styles from "./sortButton.module.css"

export const SortButton = ({ sort, handleOnSortClick }) => {
  return (
    <div className={styles.sortContainer}>
      <button onClick={handleOnSortClick} className={styles.sortBtn}>
        {sort ? "Изначальная сортировка" : "Отсортировать задачи по алфавиту"}
      </button>
    </div>
  )
}

SortButton.propTypes = {
  sort: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.shape({
      key: PropTypes.string.isRequired,
    }),
  ]),
  handleOnSortClick: PropTypes.func.isRequired,
}
