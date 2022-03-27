import React from "react";
import * as linkify from "linkifyjs";
import styles from './TextWithLinks.module.scss';

function getDomain(url: string){
    let domain = (new URL(url));
    return domain.hostname;
}

const TextWithLinks = ({str} : {str: string}) : JSX.Element => {
    let formatedHomework = str.replace( /<\/?[^>]+(>|$)/g, "")
    let links = linkify.find(formatedHomework)
    let splitSymbol = "<>"

    if (links.length === 0) return (
        <>
            {formatedHomework}
        </>
    );

    links.forEach(value => {
        if (value.isLink){
            formatedHomework = formatedHomework.replace(value.value, splitSymbol)
        }
    })

    let formatedHomeworkArr = formatedHomework.split(splitSymbol)

    return (
        <>
            {formatedHomeworkArr.map((value, index) => {
                return (
                    <>
                        {value}
                        {index !== formatedHomeworkArr.length - 1 && 
                        <button className={styles.link}
                            onClick={() => window.open(links[index]?.href)}>
                            {getDomain(links[index]?.href)}
                        </button>} 
                    </>
                )
            })}
        </>
    )
}

export default TextWithLinks;