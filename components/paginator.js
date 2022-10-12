import styles from '../styles/Feed.module.css'
import { useRouter } from 'next/router';
export const Paginator = ({pageNumber}) => {
    const router = useRouter()
  return (
        <div className={styles.paginator}>
          <div
            className={pageNumber === 1 ? styles.disabled : styles.active}
            onClick={() => {
              if (pageNumber > 1) {
                router.push(`/feed/${pageNumber - 1}`).then(() => window.scrollTo(0, 0));
              }
            }}
          >
            Previous Page
          </div>

          <div>#{pageNumber}</div>

          <div
            className={pageNumber === 10 ? styles.disabled : styles.active}
            onClick={() => {
              if (pageNumber < 10) {
                router.push(`/feed/${pageNumber + 1}`).then(() => window.scrollTo(0, 0));
              }
            }}
          >
            Next Page
          </div>
        </div>
  );
};