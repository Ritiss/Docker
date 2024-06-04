import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import styles from './index.module.scss'
import { createTransaction } from '../../services/Transactions'
import { useSelector } from 'react-redux'
export default function Order() {
    const [reason, setReason] = useState('tver')
    const profile = useSelector((state) => state.userInfo.profile) ?? {}

    const handleOrder = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || []
        const items = cart.map(item => item.id)
        const payload = {
            user_id: profile.userId,
            status: "В обработке",
            items: items
        }

        createTransaction(payload)
    }

    const [isPlaying, setIsPlaying] = useState(() => {
        const saved = localStorage.getItem('isMusicMuted')
        return saved ? JSON.parse(saved) : false
    })

    const togglePlay = () => {
        setIsPlaying(!isPlaying)
    }

    useEffect(() => {
        const musicPlayer = document.getElementById('bgmusic')
        isPlaying ? musicPlayer.play() : musicPlayer.pause()
    }, [isPlaying])

    useEffect(() => {
        localStorage.setItem('isMusicMuted', JSON.stringify(isPlaying))
    }, [isPlaying])

    return (
        <>
            <div className={`${styles.order} ${styles.center}`}>
                <section className={`${styles.order_header} ${styles.center}`}>
                    <Link to="/"><img src='/img/logo.png' alt="" /></Link>
                    <img src={isPlaying ? '/svg/music_on.svg' : '/svg/music_off.svg'} alt="" className={styles.musicButton} onClick={togglePlay} />
                </section>
                <section className={`${styles.order_bg} ${styles.center}`}>
                    <div className={`${styles.order_bg_profile} ${styles.order_bg_cont}`}>
                        <div className={`${styles.bg_number} ${styles.center}`}>
                            <div className={`${styles.step_number} ${styles.center}`}>
                                <p>1</p>
                            </div>
                            <h3>Покупатель</h3>
                        </div>
                        <div className={`${styles.bg_cont} ${styles.center}`}>
                            <Link to='/profile'>
                                <div className={`${styles.order_bg_profile_g_info} ${styles.center}`}>
                                    <div className={`${styles.avatar} ${styles.center}`}>
                                        <div className={`${styles.avatar_section} ${styles.center}`}>
                                            <img src="/img/cybercat.jpg" alt="" />
                                        </div>
                                    </div>
                                    <div className={`${styles.name} ${styles.center}`}>
                                        <p>{profile.name}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className={`${styles.order_bg_adress} ${styles.order_bg_cont}`}>
                        <div className={`${styles.bg_number} ${styles.center}`}>
                            <div className={`${styles.step_number} ${styles.center}`}>
                                <p>2</p>
                            </div>
                            <h3>Адрес получения</h3>
                        </div>
                        <div className={`${styles.bg_cont} ${styles.center}`}>
                            <div className={`${styles.adress_link} ${styles.center}`}>
                                <a href="">{reason}</a>
                            </div>
                            <label htmlFor="adress"></label>
                            <select
                                id="adress"
                                className="control"
                                value={reason}
                                onChange={(event) => setReason(event.target.value)}
                            >
                                <option value="moscow">г. Москва</option>
                                <option value="tver">г. Тверь</option>
                                <option value="voroneg">г. Воронеж</option>
                            </select>
                        </div>
                    </div>

                    <div className={`${styles.order_bg_payment} ${styles.order_bg_cont}`}>
                        <div className={`${styles.bg_number} ${styles.center}`}>
                            <div className={`${styles.step_number} ${styles.center}`}>
                                <p>3</p>
                            </div>
                            <h3>Выберите способ оплаты</h3>
                        </div>
                        <div className={`${styles.bg_cont} ${styles.center}`}>
                            <div className={`${styles.bg_but} ${styles.center}`}>
                                <p>При получении</p>
                            </div>
                            <div className={`${styles.bg_form} ${styles.center}`}>
                                <form className={`${styles.radio} ${styles.center}`}>
                                    <div className={styles.radio_line}>
                                        <input
                                            type="radio"
                                            id="cash"
                                            value="cash"
                                            name="payment"
                                        />
                                        <label htmlFor="cash">Наличными</label>
                                    </div>
                                    <div className={styles.radio_line}>
                                        <input
                                            type="radio"
                                            id="card"
                                            value="card"
                                            name="payment"
                                        />
                                        <label htmlFor="card">Картой</label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.order_bg_button} ${styles.order_bg_cont}`}>
                        <button className={styles.neon_button} onClick={handleOrder}>
                            <span className={styles.letter_broken_first}>О</span>
                            <span className={styles.flash}>форм</span>
                            <span className={styles.letter_broken}>и</span>
                            <span className={styles.flash}>ть</span>
                        </button>
                    </div>
                </section>
            </div>
        </>
    )
}