import { Link } from "react-router-dom";
import styles from "./NoMatch.module.css";

export const NoMatch = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.errorMessage}>Страница не найдена!</h2>
      <Link to="/" className={styles.homeButton}>
        Вернуться на главную
      </Link>
    </div>
  );
};
