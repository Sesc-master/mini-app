import React from "react";
import {Text} from "@vkontakte/vkui";
import styles from "../Components.module.scss"

type ITimetableItemLoader = {
    time: string []
}

const ScheduleLoaderItem = (props : ITimetableItemLoader) => {
    const {time} = props
    return (
        <div className={styles.task}>
            <div className={styles.date}>
                <Text weight="semibold">
                    {time[0]}
                </Text>
                <Text weight="semibold">
                    {time[1]}
                </Text>
            </div>
            <div className={styles.stick}/>
        </div>
    )
}; 

export default ScheduleLoaderItem;