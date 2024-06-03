import { useState } from 'react'
import Button from '../../components/common/Button'
import styles from './index.module.scss'
import { introduction } from '../../data'

const setActive = ({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link

export default function Home() {
    const [tab, setTab] = useState('effect')

    const [selectedType, setSelectedType] = useState(null)

    const handleClick = (type) => {
        setSelectedType(type)
    };

    const currentIntro = introduction.find(item => item.type === selectedType)

    return (
        <>
            <section>
                <div className={`${styles.welcome} ${styles.center}`}>
                    <video src={`/videos/cyberpunk-city.mp4`} className={styles.video_bg} autoPlay loop muted />
                    <div className={styles.container}>
                        <section className={`${styles.welcome_block} ${styles.center}`}>
                            <div className={styles.welcome_block_text}>
                                <h2>Мы поможем осуществить мечту</h2>
                                <h1><span className={styles.l_green}>В</span>
                                    <span className={styles.l_blue}>ре</span>
                                    <span className={styles.l_purple}>мя м</span>
                                    <span className={styles.l_pink}>одиф</span>
                                    <span className={styles.l_orange}>ика</span>
                                    <span className={styles.l_yellow}>ций</span>
                                </h1>
                            </div>
                        </section>
                    </div>
                </div>
                <div className={`${styles.basis} ${styles.center}`}>
                    <div className={styles.container}>
                        <section className={`${styles.basis_block} ${styles.center}`}>
                            <div className={`${styles.basis_block_text} ${styles.center}`}>
                                <h3>Будущее уже здесь</h3>
                                <p>С приходом киберимплантов — в жизни может многое измениться. Вы когда-нибудь мечтали бегать
                                    <span> быстрее? </span>
                                    Прыгать
                                    <span> выше</span>
                                    , видеть
                                    <span> лучше </span>
                                    или даже в темноте..</p>
                            </div>
                        </section>
                    </div>
                </div>
                <div className={`${styles.instruction} ${styles.center}`}>
                    <div className={styles.container}>
                        <section className={`${styles.instruction_block} ${styles.center}`}>
                            <div className={`${styles.instruction_block_section} ${styles.center}`}>
                                <div className={`${styles.instruction_description} ${styles.center}`} style={{ backgroundImage: `url(${currentIntro ? currentIntro.img : ''})` }}>
                                    <div className={`${styles.instruction_description_text} ${styles.center}`}>
                                        {currentIntro ? (
                                            <p>{currentIntro.desc}</p>
                                        ) : (
                                            <p>Что вам известно о мире полном технологий?</p>
                                        )}
                                    </div>
                                </div>
                                <div className={`${styles.instruction_buttons} ${styles.center}`}>
                                    <div className={`${styles.intruction_text} ${styles.center}`}>
                                        <div className={`${styles.brifing_section} ${styles.center}`}>
                                            <h3>Брифинг</h3>
                                        </div>
                                        <section className={styles.buttons_block}>
                                            <div>
                                                <Button
                                                    isActive={selectedType == 'сyberware'}
                                                    onClick={() => handleClick('сyberware')} className={setActive}> Киберимпланты
                                                </Button>
                                                <Button
                                                    isActive={selectedType == 'ripperdoc'}
                                                    onClick={() => handleClick('ripperdoc')} className={setActive}> Риперы
                                                </Button>
                                                <Button
                                                    isActive={selectedType == 'сyberpsychosis'}
                                                    onClick={() => handleClick('сyberpsychosis')} className={setActive}> Киберпсихоз
                                                </Button>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>

            {/* <section>
                <TestPage active={tab} onChange={(current) => setTab(current)} />
                {tab == 'main' && (
                    <>
                        <IntroductionButtons />
                    </>
                )}

                {tab == 'profile' && <TestSection />}

                {tab == 'effect' && <Effect />}
            </section> */}
        </>
    )
}