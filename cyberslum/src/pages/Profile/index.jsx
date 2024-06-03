import styles from './index.module.scss'
import { useAuth } from "../../context/auth"
import { useSelector, useDispatch } from "react-redux"
import Button from "../../components/common/Button"
import { useEffect } from 'react'
import { asyncLoadTransactions } from '../../store/reducer/transactions/transactions'

export default function Profile() {
    const profile = useSelector((state) => state.userInfo.profile) ?? {}
    const transactions = useSelector((state) => state.transactions.transactions)
    //     {
    //     "user_id": 17,
    //     "status": "В обработке",
    //     "items": [
    //         1,
    //         2
    //     ],
    //     "id": 1
    // }

    const dispatch = useDispatch()
    useEffect(() => {
        if (profile.userId) {
            dispatch(asyncLoadTransactions(profile.userId))
        }
    }, [profile])
    const auth = useAuth()
    const onLogOut = () => {
        auth.logout()
        window.location.reload()
    }
    return (
        <>
            <div className={`${styles.profile} ${styles.center}`}>
                <video src={`/videos/neon.mp4`} className={styles.video_bg} autoPlay loop muted />
                <div className={`${styles.profile_con} ${styles.center}`}>
                    <div className={`${styles.profile_con_name} ${styles.center}`}>
                        <h3>Профиль</h3>
                    </div>
                    <div className={`${styles.profile_con_section} ${styles.center}`}>
                        <div className={`${styles.profile_con_section_bg} ${styles.center}`}>
                            <div className={`${styles.profile_con_section_bg_img} ${styles.center}`}>
                                <div className={styles.avatar}>
                                    <img src='/img/cybercat.jpg' alt="" />
                                </div>
                            </div>
                            <div className={`${styles.profile_con_section_bg_name} ${styles.center}`}>
                                <div className={`${styles.name} ${styles.center}`}>
                                    <p>Кодовое имя</p>
                                    <h4>{profile.name}</h4>
                                </div>
                                <div className={`${styles.email} ${styles.center}`}>
                                    <p>Почта</p>
                                    <h4>{profile.email}</h4>
                                </div>
                            </div>

                        </div>
                        <div className={`${styles.profile_con_section_order} ${styles.center}`}>
                            <div className={`${styles.story} ${styles.center}`}>
                                <h3>История заказов</h3>
                            </div>
                            <div className={`${styles.order_list} ${styles.center}`}>
                                <div className={`${styles.order_list_check} ${styles.center}`}>
                                    {transactions.map((item, index) => {
                                        return (
                                            <div className={`${styles.order_list_check_num} ${styles.center}`}>
                                                <div className={styles.number}>
                                                    <p>Номер заказа</p>
                                                    <p>{item.id}</p>
                                                </div>
                                                <div className={styles.status}>
                                                    <p>Статус</p>
                                                    <p>{item.status}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <Button className={`${styles.but} ${styles.reg_but}`} onClick={onLogOut} type="submit">Выйти из аккаунта</Button>
                    </div>
                </div>
            </div>
        </>
    )
}