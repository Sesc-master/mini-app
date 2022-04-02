import React from "react";
import styles from "./MarksTable.module.scss"

type IMarksTable = {
    marks: string | number [],
    subject: string
}

const MarksTable = ({marks, subject} : IMarksTable) => {

    return(
        <div className={styles.main}>
            <div className={styles.subject}>{subject}</div>
            <div className={styles.flex}>
                <div className={`${styles.cell} ${styles.border}`}>
                    <div className={styles.head}>1ч</div>
                    <div>{marks[0]}</div>
                </div>
                <div className={`${styles.cell} ${styles.border}`}>
                    <div className={styles.head}>2ч</div>
                    <div>{marks[1]}</div>
                </div>
                <div className={`${styles.cell} ${styles.border}`}>
                    <div className={styles.head}>1п</div>
                    <div>{marks[2]}</div>
                </div>
                <div className={`${styles.cell} ${styles.border}`}>
                    <div className={styles.head}>3ч</div>
                    <div>{marks[3]}</div>
                </div>
                <div className={`${styles.cell} ${styles.border}`}>
                    <div className={styles.head}>4ч</div>
                    <div>{marks[4]}</div>
                </div>
                <div className={`${styles.cell} ${styles.border}`}>
                    <div className={styles.head}>год</div>
                    <div>{marks[5]}</div>
                </div>
                <div className={`${styles.cell}`}>
                    <div className={styles.head}>1ч</div>
                    <div>{marks[6]}</div>
                </div>
            </div>
        </div>
    )
}

export default MarksTable;