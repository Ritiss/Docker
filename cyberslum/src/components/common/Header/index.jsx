import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import styles from './index.module.scss'
import ModalLogin from "../../modals/ModalLogin"
import { HeaderNavigation } from '../../../data'
import Button from "../Button"
import { useAuth } from "../../../context/auth"

const setActive = ({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link

export default function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { isAuthenticated } = useAuth()

    useEffect(() => {
        document.body.classList.toggle('no-scroll')
    }, [!isModalOpen])

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
            {isModalOpen && <ModalLogin closeModal={setIsModalOpen} />}
            <div className={styles.header}>
                <div className={styles.container}>
                    <section className={styles.logoSection}>
                        <Link to="/"><img src='/img/logo.png' alt="" /></Link>
                        <img src={isPlaying ? '/svg/music_on.svg' : '/svg/music_off.svg'} alt="" className={styles.musicButton} onClick={togglePlay} />
                    </section>
                    <div className={styles.headerMenu}>
                        {isAuthenticated ?
                            <NavLink key={"profile"} to='/profile' className={setActive}>Профиль</NavLink>
                            :
                            <Button onClick={() => setIsModalOpen(!isModalOpen)} className={styles.link}>Профиль</Button>
                        }
                        {HeaderNavigation.map((item, index) => (
                            <NavLink key={index} to={item.link} className={setActive}>{item.name}</NavLink>
                        ))}
                    </div>
                </div>
            </div>
            <audio id={'bgmusic'} src={`/sounds/LetYouDown.mp4`} loop />
        </>
    )
}