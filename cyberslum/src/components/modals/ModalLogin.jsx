import { useRef, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Button from "../common/Button"
import styles from './ModalLogin.module.scss'
import Api from "../../api/Api"
import axios from "axios";
import { useDispatch } from "react-redux"
import { useAuth } from "../../context/auth"
import { asyncLoadUserData } from "../../store/reducer/auth/userInfoReducer"
import { useNavigate } from "react-router-dom"
export default function ModalLogin({ closeModal }) {
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [password, setPassword]= useState();
    const dispatch = useDispatch();
    const auth = useAuth();
    const navigate = useNavigate();
    function nameChange(event) {
        setName(event.target.value)
        setError(event.target.value.trim().length === 0)
    }

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    closeModal(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    const onLogin = async() => {
        const payload = {
            username: name,
            password: password
        }
        const config = {
            method: "post",
            url: Api.endpoints.LOGIN_USER,
            data: payload,
            headers: {"Content-Type": "multipart/form-data"},
        }
        
        try {
            const response = await axios(config);
            if (response.status === 200) {
                auth.updateToken(response.data.access_token);
                console.log("response.data.access_token",response.data.access_token)
                
                dispatch(asyncLoadUserData());
                navigate("/profile")
                window.location.reload();
            }
      
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className={`${styles.modal} ${styles.center}`}>
            <img src='/img/cat_shadow.png' alt="" className={styles.cat} />
            <div className={`${styles.modal_bg} ${styles.center}`}>
                <div className={styles.modal_bg_shadow}></div>
                <div ref={wrapperRef} className={`${styles.modal_bg_form} ${styles.center}`}>
                    <div className={styles.modal_bg_form_img}>
                    </div>
                    <div className={`${styles.modal_bg_form_text} ${styles.center}`}>
                        <div className={`${styles.close} ${styles.center}`}>
                            <div onClick={() => closeModal(false)} className={styles.close_button}>
                                <img src="/svg/cross.svg" alt="" />
                            </div>
                        </div>
                        <div className={`${styles.login_form} ${styles.center}`}>
                            <h3>Вход</h3>

                            <form className={styles.login_form_bg} onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
                                <label htmlFor="email">E-mail</label>
                                <input
                                    type="email"
                                    id="name"
                                    placeholder="example@gmail.com"
                                    value={name}
                                    style={{
                                        borderColor: error ? 'rgba(255, 0, 0, 0.4)' : null,
                                        // записать во 2 главу: если у нас нет ничего в нейме, удалим пробелы(потому что в конченом итоге это просто строчка), 
                                        // дальше спросим длинну этого состояния, если в длине то-то есть, то ничего не будем добавлять, 
                                        // а иначе будем добавлять красный
                                    }}
                                    onChange={nameChange}
                                    required
                                />
                                <label htmlFor="password">Пароль</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="введите пароль"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                <div className={`${styles.buttons_section} ${styles.center}`}>
                                    <Button disabled={error} isActive={!error}
                                        className={`${styles.but} ${styles.enter_but}` }>Войти</Button>
                                    <Link to='/registry'><Button onClick={() => closeModal(false)}
                                        className={`${styles.but} ${styles.reg_but}`}>Регистрация</Button></Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}