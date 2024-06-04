import styles from './index.module.scss'
import Inventory from '../../components/pages/Catalog/Inventory'

export default function Catalog() {
    return (
        <>
            <section className={`${styles.catalog} ${styles.center}`}>
                <video src={`/videos/neon.mp4`} className={styles.video_bg} autoPlay loop muted />
                <Inventory />
            </section>
        </>
    )
}