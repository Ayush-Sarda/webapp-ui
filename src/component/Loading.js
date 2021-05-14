import React from 'react'
import styles from '../css/Loading.module.css'

function Loading() {
    return (
        <div class="container justify-content-center d-flex align-items-center" style={{ width: "100%", minHeight: "52vh" }}>
            <div className={styles.skChase}>
                <div className={styles.skChaseDot}></div>
                <div className={styles.skChaseDot}></div>
                <div className={styles.skChaseDot}></div>
                <div className={styles.skChaseDot}></div>
                <div className={styles.skChaseDot}></div>
                <div className={styles.skChaseDot}></div>
            </div>
        </div>
    )
}

export default Loading