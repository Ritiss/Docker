import { useState, useEffect } from 'react'
import styles from './index.module.scss'
import Button from "../../components/common/Button"
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { asyncLoadProducts } from '../../store/reducer/Product/product'
export default function Store() {

    const { type } = useParams()
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [cart, setCart] = useState([])
    const [notification, setNotification] = useState(false)
    const products = useSelector((state) => state.products)
    const dispatch = useDispatch()
    const displayName = {
        frontal_cortex: 'Лобная доля',
        arms: 'Руки',
        skeleton: 'Скелет',
        nervous_system: 'Нервная система',
        integumentary_system: 'Кожа',
        operating_system: 'Операционная система',
        face: 'Лицо',
        hands: 'Ладони',
        circulatory_system: 'Кровеносная система',
        legs: 'Ноги'
    }[type]
    const filteredProducts = products.products.filter(item => item.type === displayName)

    useEffect(() => {
        dispatch(asyncLoadProducts())
    }, [])

    useEffect(() => {
        console.log("selectedProduct", selectedProduct)
    }, [selectedProduct])

    useEffect(() => {
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
            setCart(JSON.parse(savedCart))
        }
    }, [])

    const addToCart = (product) => {
        const newCart = [...cart, product]
        setCart(newCart)
        localStorage.setItem('cart', JSON.stringify(newCart))
        showNotification()
    }

    const showNotification = () => {
        setNotification(true)
        setTimeout(() => {
            setNotification(false)
        }, 2000)
    }

    return (
        <>
            <div className={`${styles.store} ${styles.center}`}>
                <video src={`/videos/neon.mp4`} className={styles.video_bg} autoPlay loop muted />
                <section className={`${styles.container} ${styles.center}`}>
                    <div className={`${styles.store_bg} ${styles.center}`}>
                        <div className={`${styles.store_bg_text} ${styles.center}`}>
                            <div className={`${styles.store_bg_text_arrow} ${styles.center}`}>
                                <Link to='/catalog'><img src="/svg/arrow.svg" alt="" /></Link>
                            </div>
                            <div className={`${styles.store_bg_text_title} ${styles.center}`}>
                                <h4>{displayName}</h4>
                            </div>
                        </div>
                        <div className={`${styles.store_bg_list} ${styles.center}`}>
                            {filteredProducts.map(item => {
                                return (
                                    <div
                                        key={item.name}
                                        className={`${styles.store_bg_list_product} ${styles.center}`}
                                        onClick={() => setSelectedProduct(item)}
                                    >
                                        <img src={item.img} alt="" className={styles.object_img} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className={`${styles.desc} ${styles.center}`}>
                        {selectedProduct ? (
                            <div className={`${styles.desc_bg} ${styles.center}`}>
                                <div className={`${styles.desc_bg_block} ${styles.center}`}>
                                    <div className={`${styles.object} ${styles.center}`}>
                                        <img src={selectedProduct.img} alt="" className={styles.desc_image} />
                                        <p className={styles.object_name}>{selectedProduct.name}</p>
                                        <p className={styles.object_price}>{selectedProduct.price}</p>
                                        <div className={`${styles.object_stats} ${styles.center}`}>
                                            <div className={`${styles.object_stats_type} ${styles.center}`}>
                                                <h4>Тип</h4>
                                                <p>{selectedProduct.type}</p>
                                            </div>
                                            <div className={`${styles.object_stats_capacity} ${styles.center}`}>
                                                <h4>Вместимость</h4>
                                                <p>{selectedProduct.capacity}</p>
                                            </div>
                                        </div>
                                        <div className={`${styles.object_description} ${styles.center}`}>
                                            <h4>Описание</h4>
                                            <p>{selectedProduct.description}</p>
                                        </div>
                                        <div className={`${styles.object_effect} ${styles.center}`}>
                                            <h4>Эффект</h4>
                                            <p>{selectedProduct.effect}</p>
                                        </div>
                                        {notification ?
                                            <div className={styles.notification}>
                                                <p className={`${styles.neon_button} ${styles.notis}`}>Товар добавлен в корзину!</p>
                                            </div>
                                            : <Button onClick={() => addToCart(selectedProduct)} className={styles.neon_button}>Добавить в корзину</Button>
                                        }

                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.desc_placeholder}>
                                <p>Выберите продукт, чтобы увидеть его описание.</p>
                            </div>
                        )}
                    </div>
                </section>

            </div>
        </>
    )
}
