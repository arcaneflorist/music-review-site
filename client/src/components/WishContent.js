import React from 'react';

const WishContent = ({title, details}) => {

    const maxTextLength = 240;

    const isUrl = (text) => {
        return text.substring(0, 4) == 'http';
    }

    const handleDetails = text => text.length > maxTextLength ? text.substring(0, maxTextLength) + "..." : text;

    return(
        <>
        { isUrl(title) ? <a href={title} className="title rs-text">{title}</a>  : <div className="title rs-text">{title}</div> }
        { isUrl(details) ? <a href={details} className="details rs-text">{details}</a>  : <div className="details rs-text">{handleDetails(details)}</div> }
        </>
    )
}

export default WishContent;