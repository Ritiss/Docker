import { useState } from 'react'
import Button from '../../../common/Button'
import { introduction } from '../../../../data'
import styles from './index.module.scss'

export default function InstructionButtons() {
    const [desc, setDesc] = useState(null)

    function handleClick(type) {
        setDesc(type)
    }

    return (
        <section className={styles.buttons_block}>
            <div>
                <Button
                    isActive={desc == 'сyberware'}
                    onClick={() => handleClick('сyberware')}> Киберимпланты
                </Button>
                <Button
                    isActive={desc == 'ripperdoc'}
                    onClick={() => handleClick('ripperdoc')}> Риперы
                </Button>
                <Button
                    isActive={desc == 'сyberpsychosis'}
                    onClick={() => handleClick('сyberpsychosis')}> Киберпсихоз
                </Button>
            </div>

            {desc ? (
                <p>{introduction[desc]}</p>
            ) : (
                <p>Что вам известно о мире полном технологий?</p>
            )}
        </section>
    )
}