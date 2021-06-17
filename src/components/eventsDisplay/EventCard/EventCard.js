/** @jsxImportSource @emotion/react */
//import { jsx } from '@emotion/react'
//import React from 'react'
import * as styles from './EventCard.style'
const EventCard = ({ headding, description, url , key}) => {
    //const  = this.props 
    //console.log(headding, description, url, key);
    return (
        <div key={key} css={[styles.topDiv]}>
            <div className='row' css={[styles.maiRow]} >    
                <img src={url} alt="icon" />
                <div css={[styles.disDiv]}>
                <h3>{headding}</h3>
                <p>{description}</p> 
                </div>              
            </div>
        </div>
    )
}

export default EventCard
