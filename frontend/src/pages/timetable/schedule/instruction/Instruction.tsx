import React from 'react';
import {Text} from "@vkontakte/vkui";
import styles from "./Instruction.module.scss"

const Instruction = () => {
    return (
        <Text className={styles.instruction} weight="semibold" >Выберите день недели, класс или учителя</Text>
    );
};

export default Instruction;