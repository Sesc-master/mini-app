import React from "react";
import { List, Div } from "@vkontakte/vkui";
import styles from "./Option.module.scss"

type ISetOptions = (option: string) => void;

type IOptions = {
    options: string [],
    setOption : ISetOptions
}

const Options = ({options, setOption}: IOptions) => {
    return (
        <>
            <List>
                {options?.map((option, index) =>
                    (<Div key={index} onClick={() => setOption(option)} className={styles.option}>
                        {option}
                    </Div>))}
            </List>
            <div className="end"/>
        </>
    );
}

export default Options;