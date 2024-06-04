import { Link } from "react-router-dom"
import styles from './index.module.scss'

export default function NotFoundPage() {
    return (
        <>
            <div className={`${styles.error} ${styles.center}`}>
                <video src={`/videos/alley.mp4`} className={styles.video_bg} autoPlay loop muted />
                <div className={`${styles.error_section} ${styles.center}`}>
                    <h3>Error</h3>
                    <h4>404</h4>
                    <Link to='/home' className={styles.link}>
                        {'<-'} Вернуться на домашнюю страницу
                    </Link>
                </div>
            </div>
        </>
    )
}