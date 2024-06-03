import { Link } from "react-router-dom"
import styles from '../../../../pages/Catalog/index.module.scss'
import { CellsFirst, CellsSecond } from '../../../../data'

export default function Inventory() {
    return (
        <>
            <div className={`${styles.container} ${styles.center}`}>
                <div className={`${styles.catalog_section} ${styles.center}`}>
                    <div className={`${styles.catalog_section_block} ${styles.center} ${styles.first}`}>
                        {CellsFirst.map(item => (
                            <Link key={item.text} to={item.link} className={`${styles.cells} ${styles.center}`}>
                                <p>{item.text}</p>
                                <div className={`${styles.cell} ${styles.center}`}>
                                    <p>+</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <Link to="/404" className={`${styles.catalog_section_block} ${styles.center} ${styles.second}`}></Link>
                    <div className={`${styles.catalog_section_block} ${styles.center} ${styles.third}`}>
                        {CellsSecond.map(item => (
                            <Link key={item.text} to={item.link} className={`${styles.cells} ${styles.center}`}>
                                <p>{item.text}</p>
                                <div className={`${styles.cell} ${styles.center}`}>
                                    <p>+</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}