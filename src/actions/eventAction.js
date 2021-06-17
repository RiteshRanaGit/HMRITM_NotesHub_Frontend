import axios from 'axios';
import { GET_EVENT, EVENT_LOADING, GET_ERRORS, CLEAR_CURRENT_EVENT} from './types';

import url from "../config/url";
// Get current event

export const getEvent = () => dispatch =>{
    dispatch(setEventLoading());
    axios.get(url+'/api/event')
        .then(res =>
            dispatch({
                type: GET_EVENT,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_EVENT,
                payload: {}
            })    
        )
}


// create classroom 

export const createEvent = ( eventData, history) => dispatch =>{
    axios
        .post(url+'/api/event', eventData)
        .then(res => history.push('/dashboard'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));
}

// event loading 
 export const setEventLoading = () => {
     return{
         type: EVENT_LOADING
     }
 }

 // clear current event  
 export const clearCurrentEvent = () => {
    return{
        type: CLEAR_CURRENT_EVENT
    }
}

//delete 
export const deleteEvent = (data) => dispatch =>{
    
    if(window.confirm('Are you sure? This can Delete notes and cannot be undone! ')){
        console.log("action datat", data)
        axios.delete(url+`/api/event/${data.eventId}`)
        .then(res =>
            
            {
                dispatch({
                type: GET_EVENT,
                payload: res.data
                });
         }
        )
        .catch(err => 
            dispatch({
                type: GET_EVENT,
                payload: {}
            })    
        )
    }
}