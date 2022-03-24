import React from "react";
import * as linkify from "linkifyjs";

function getDomain(url: string){
    let domain = (new URL(url));
    return domain.hostname;
}

const TextWithLinks = ({str} : {str: string}) : JSX.Element => {
    let formatedHomework = str.replace( /<\/?[^>]+(>|$)/g, "")
    // deleted tags
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
    // links were changed by split symbol

    let formatedHomeworkArr = formatedHomework.split(splitSymbol)

    return (
        <>
            {formatedHomeworkArr.map((value, index) => {
                return (
                    <>
                        {value}
                        {index !== formatedHomeworkArr.length - 1 && 
                        <button className='btn-link' 
                            onClick={() => window.open(links[index]?.href)} type='button'>
                            {getDomain(links[index]?.href)}
                        </button>} 
                    </>
                )
            })}
        </>
    )
    //returned buttons instead links 
}

export default TextWithLinks