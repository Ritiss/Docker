import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { MainNavigation } from '../../data'
import ModalLogin from '../../components/modals/ModalLogin'
import { useAuth } from "../../context/auth"
import styles from './index.module.scss'

export default function MainPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [style, setStyle] = useState({})
    const { isAuthenticated } = useAuth()

    const [isPlaying, setIsPlaying] = useState(() => {
        const saved = localStorage.getItem('isMusicMuted')
        return saved ? JSON.parse(saved) : false
    })

    const togglePlay = () => {
        setIsPlaying(!isPlaying)
    }

    useEffect(() => {
        const scrollPage = () => {
            let translateY = window.scrollY / 2
            setStyle({
                transform: `translateY(${translateY}px)`
            })
        }

        window.addEventListener('scroll', scrollPage, { passive: true })
        return () => window.removeEventListener('scroll', scrollPage)
    }, [])

    useEffect(() => {
        const musicPlayer = document.getElementById('bgmusic')
        isPlaying ? musicPlayer.play() : musicPlayer.pause()
    }, [isPlaying])

    useEffect(() => {
        localStorage.setItem('isMusicMuted', JSON.stringify(isPlaying))
    }, [isPlaying])

    return (
        <>
            {isModalOpen && <ModalLogin closeModal={setIsModalOpen} />}
            <section>
                <section className={styles.header}>
                    <div className={`${styles.navigation} ${styles.center}`}>
                        <div className={styles.nav_cont}>
                            <div className={`${styles.nav_cont_music} ${styles.center}`}>
                                <img src={isPlaying ? '/svg/music_on.svg' : '/svg/music_off.svg'} alt="" className={styles.musicButton} onClick={togglePlay} />
                            </div>
                            <div className={`${styles.nav_cont_links} ${styles.center}`}>
                                {isAuthenticated ?
                                    <Link to='/profile' title='Профиль'><img src='/svg/profile.svg' alt="" className={styles.nav_link} /></Link>
                                    :
                                    <Link onClick={() => setIsModalOpen(true)} title='Профиль'><img src='/svg/profile.svg' alt="" className={styles.nav_link} /></Link>
                                }
                                {MainNavigation.map(item => (
                                    <Link to={item.link} title={item.title}><img src={item.name} alt="" className={`${styles.nav_link} ${styles.pink_link}`} /></Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* <section className={`${styles.canvas} ${styles.center}`}>
                    <div className={`${styles.layer} ${styles.layer_back}`}></div>
                    <div className={`${styles.layer_content}  ${styles.center}`}>
                        <img src="/img/logo.png" alt="" width={750} style={style} />
                    </div>
                    <div className={`${styles.layer} ${styles.layer_bridge}`}></div>
                    <div className={`${styles.layer} ${styles.layer_left_building}`}></div>
                    <div className={`${styles.layer} ${styles.layer_right_building}`}></div>
                    <div className={`${styles.layer} ${styles.layer_roof}`}></div>
                </section> */}
                <section className={styles.slum}>
                    <div className={`${styles.neon}  ${styles.center}`}>
                        <div className={styles.neon_block}>
                            <Link to="/home" className={`${styles.neon_button}  ${styles.center}`}>
                                <span className={styles.letter_broken_first}>С</span>
                                <span className={styles.flash}>yber</span>
                                <span className={styles.letter_broken}>s</span>
                                <span className={styles.flash}>lum</span>
                            </Link>
                        </div>
                    </div>
                </section>
            </section>
        </>
    )
}