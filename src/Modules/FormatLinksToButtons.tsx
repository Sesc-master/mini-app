import * as linkify from 'linkifyjs';

export const formatLinksToButtons = (homework : string) => {
    let formatedHomework = homework.replace( /<\/?[^>]+(>|$)/g, "")
    // deleted tags
    let links = linkify.find(formatedHomework)
    let splitSymbol = '<>'

    if (links.length === 0) return (formatedHomework);

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

function getDomain(url: string){
    let domain = (new URL(url));
    return domain.hostname;
}