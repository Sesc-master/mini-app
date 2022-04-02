import React from "react";
import * as linkify from "linkifyjs";
import styles from './TextWithLinks.module.scss';

function getDomain(url: string){
    let domain = (new URL(url));
    return domain.hostname;
}

const TextWithLinks = ({str} : {str: string}) : JSX.Element => {
    const getSplitedTextByLinks = (str: string) => {
        let formatedStr = str.replace( /<\/?[^>]+(>|$)/g, "")
        let links = linkify.find(formatedStr)
        let splitSymbol = "<>"

        links.forEach(value => {
            if (value.isLink){
                formatedStr = formatedStr.replace(value.value, splitSymbol)
            }
        })

        return {textArray: formatedStr.split(splitSymbol), links}
    }

    const {textArray, links} = getSplitedTextByLinks(str)

    return (
        <>
            {linkify.find(str).length === 0 ? (
                <div>{str}</div>
            ) : textArray.map((value, index) => (
                <>
                    {value}
                    {index !== textArray.length - 1 && (
                        <button className={styles.link}
                                onClick={() => window.open(links[index]?.href)}>
                            {getDomain(links[index]?.href)}
                        </button>
                    )}
                </>)
            )}
        </>
    )
}

export default TextWithLinks;