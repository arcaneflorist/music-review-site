import React, { useEffect, useState} from 'react';
import anime from 'animejs';

const Upvote = () => {
    
    const [hide, setHide] = useState(false);   
    const [down, setDown] = useState(false);

    const handleVote = (tran) => {        
        console.log(tran)
        anime({
        targets: ['.vote-container'],
        translateY: {
            value: tran,
            duration: 400,
            easing: 'easeInOutExpo'
        },
        backgroundColor: 'green',
        opacity: [100, 20],
        delay: 250 // All properties except 'scale' inherit 250ms delay
        });        
        setHide(true);
    };

    return(
    <div className="vote-container">    
          <div className="v-button" onClick={() => {handleVote('-60')}}><i hidden={hide} className="fas fa-chevron-up"></i></div>
          <div className="v-button" onClick={() => {handleVote('60')}}><i hidden={hide} className="fas fa-chevron-down"></i></div>            
          <p hidden={hide === true ? false : true}>+2</p>          
    </div>
    )
}

export default Upvote;