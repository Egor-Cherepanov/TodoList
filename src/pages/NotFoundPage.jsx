// NotFoundPage.jsx
import styles from "./App.module.css"

export const NotFoundPage = () => {
  return (
    <div className={styles.errorContainer}>
      <h1 className={styles.errorTitle}>
        <span className={styles.errorCode}>Ошибка 404: </span>
        Страница не найдена
      </h1>
      <p className={styles.errorText}>
        Запрашиваемая страница не существует или была удалена
      </p>
    </div>
  )
}
