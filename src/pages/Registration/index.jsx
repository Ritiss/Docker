import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import styles from './index.module.scss'
import Button from "../../components/common/Button"
import ModalLogin from "../../components/modals/ModalLogin"
import { useAuth } from "../../context/auth"
import { initUserRegistration } from "../../api/auth/user/user"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"

export default function Registration() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const auth = useAuth()
    useEffect(() => {
        document.body.classList.toggle('no-scroll', isModalOpen)
    }, [isModalOpen])

    const onRegister = async () => {
        const payload = {
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }
        console.log("payload", payload)
        const response = await initUserRegistration(payload)
        if (response.status === 200) {
            console.log("response",response)
            if (response.token) {
                console.log("response.token",response.token)
                auth.updateToken(response.token)
                navigate('/profile')
                window.location.reload()
            }
        } else if (response.status === 422) {
            toast.error('Проверьте введенные данные', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })

            window.scrollTo({ top: 0, behavior: "smooth" })
        } else if (response.status === 400) {
            toast.error('Пользователь с такой почтой уже существует', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }

    return (
        <>
            {isModalOpen && <ModalLogin closeModal={() => setIsModalOpen(false)} />}
            <div className={`${styles.registr} ${styles.center}`}>
                <video src={`/videos/apartment.mp4`} className={styles.video_bg} autoPlay loop muted />
                <div className={`${styles.registr_section} ${styles.center}`}>
                    <div className={`${styles.registr_section_form} ${styles.center}`}>
                        <h3>Регистрация</h3>

                        <form className={styles.registr_section_form_bg} onSubmit={(e) => { e.preventDefault(); onRegister(); }}>
                            <label htmlFor="name">Ваше имя</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Введите имя"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="example@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label htmlFor="password">Пароль</label>
                            <input
                                type="password"
                                id="pass"
                                placeholder="Введите пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label htmlFor="confirmPassword">Повторите пароль</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Повторите пароль"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <div className={`${styles.buttons_section} ${styles.center}`}>
                                <Button className={`${styles.but} ${styles.reg_but}`} type="submit">Зарегистрироваться</Button>
                            </div>
                            <p className={styles.ready}>Уже есть аккаунт?
                                <span>
                                    <Link onClick={() => setIsModalOpen(true)} className={styles.link}> Войти</Link>
                                </span>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
