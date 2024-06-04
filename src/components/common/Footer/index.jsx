import { useEffect, useState } from 'react'
import styles from './index.module.scss'

export default function Footer() {
    const [now, setNow] = useState(new Date())

    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 1000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <footer>
            <section>
                <span style={{ color: '#fff' }}>{now.toLocaleTimeString()}</span>
                <p className={styles.copy}>
                    <span className={styles.copy_sign}>©</span>
                    <span> 2024 Cyberslum</span>
                </p>
                <p>Ritis</p>
            </section>
        </footer>
    )
}