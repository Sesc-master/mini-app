import React from "react";
import styles from "../Components.module.scss"
import Typography from "@mui/material/Typography";

type ITimetableItemLoader = {
    time: string []
}

const ScheduleLoaderItem = (props : ITimetableItemLoader) => {
    const {time} = props
    return (
        <section className={styles.task}>
            <div className={styles.date}>
                <Typography>
                    {time[0]}
                </Typography>
                <Typography>
                    {time[1]}
                </Typography>
            </div>
            <div className={styles.stick}/>
        </section>
    )
}; 

export default ScheduleLoaderItem;