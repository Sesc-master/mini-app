import React from 'react';
import {Spinner} from "@vkontakte/vkui";
import styles from "./Loading.module.scss"

const Loading = () => {
    return (
        <div className={styles.loader}>
            <Spinner size="medium"/>
        </div>
    );
};

export default Loading;