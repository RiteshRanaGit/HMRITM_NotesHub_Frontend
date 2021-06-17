import axios from 'axios';
import { GET_NOTES, NOTES_LOADING, GET_ERRORS, CLEAR_CURRENT_NOTES, GET_SUBJECT} from './types';

import url from "../config/url";
// Get current classroom

export const getNotes = () => dispatch =>{
    dispatch(setNotesLoading());
    axios.get(url+'/api/notes')
        .then(res =>
            dispatch({
                type: GET_NOTES,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_NOTES,
                payload: {}
            })    
        )
}


// create classroom 

export const createNotes = ( notesData, history) => dispatch =>{
    axios
        .post(url+'/api/notes', notesData)
        .then(res => history.push('/dashboard'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));
}

// classroom loading 
 export const setNotesLoading = () => {
     return{
         type: NOTES_LOADING
     }
 }

 // clear current classroom  
 export const clearCurrentNotes = () => {
    return{
        type: CLEAR_CURRENT_NOTES
    }
}

//delete 
export const deleteNotes = (data) => dispatch =>{
    
    if(window.confirm('Are you sure? This can Delete notes and cannot be undone! ')){
        console.log("action datat", data)
        axios.delete(url+`/api/notes/${data.notesId}`)
        .then(res =>
            
            {
                dispatch({
                type: GET_SUBJECT,
                payload: res.data
                });
         }
        )
        .catch(err => 
            dispatch({
                type: GET_SUBJECT,
                payload: {}
            })    
        )
    }
}