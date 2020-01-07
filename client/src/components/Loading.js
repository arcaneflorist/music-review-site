import React, { useEffect } from 'react';
import anime from 'animejs';

export default function Loading() {

    console.log(anime);

    useEffect(() => {
        anime({              
            targets: '.rs-load',  
            width: '100%', // -> from '0px' to '100%',
            easing: 'easeInOutQuad',
            direction: '',
            opacity: [10, 60],
            loop: true
        })
    })

    const style = {        
        margin: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        height: 2,
        width: 0,
        letterSpacing: '0.2em',
        backgroundColor: "hotpink",
        display: 'block'                 
    }

    return(
        <>
            <div style={style} id="id" className="rs-load"></div>
        </>
    )
}