import styles from "./TodoNotFound.module.css"

export const TodoNotFound = () => {
  return (
    <div className={styles.errorContainer}>
      <h1 className={styles.errorTitle}>
        <span className={styles.errorCode}>Ошибка 404: </span>
        Дело не найдено
      </h1>
      <p className={styles.errorText}>
        Запрошенная задача не существует или была удалена
      </p>
    </div>
  )
}
