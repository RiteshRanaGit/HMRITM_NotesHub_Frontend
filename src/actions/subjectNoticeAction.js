import axios from 'axios';
//import subjectNoticeReducer from '../reducers/subjectNoticeReducer';
import { GET_SUBJECTNOTICE, SUBJECTNOTICE_LOADING, GET_ERRORS, CLEAR_CURRENT_SUBJECTNOTICE} from './types';
import url from "../config/url";


// Get current classroom

export const getCurrentSubjectNotice = (data) => dispatch =>{
    dispatch(setSubjectNoticeLoading());
    axios.get(url+`/api/subjectnotice/${data.subjectTitle}`)
        .then(res =>
            dispatch({
                type: GET_SUBJECTNOTICE,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_SUBJECTNOTICE,
                payload: {}
            })    
        )
}

// Get current department subject notice 
export const getCurrentDepartmentSubjectNotice = (data) => dispatch =>{
    
    dispatch(setSubjectNoticeLoading());
    axios.get(url+`/api/subjectnotice/department/${data.subjectId}`)
        .then(res =>
            {  //console.log("res data of subject notice", res.data)
                dispatch({
                type: GET_SUBJECTNOTICE,
                payload: res.data
            })}
        )
        .catch(err => 
            dispatch({
                type: GET_SUBJECTNOTICE,
                payload: {}
            })    
        )
}

// create subject notice 

export const createSubjectNotice = ( subjectNoticeData, history) => dispatch =>{
    axios
        .post(url+'/api/subjectnotice', subjectNoticeData)
        .then(res => history.push('/dashboard'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));
}

// subject notice loading 
 export const setSubjectNoticeLoading = () => {
     return{
         type: SUBJECTNOTICE_LOADING
     }
 }

 // clear current subject notice 
 export const clearCurrentSubjectNotice = () => {
    return{
        type: CLEAR_CURRENT_SUBJECTNOTICE
    }
}

//delete
export const deleteNoticeSubject = (data) => dispatch =>{
    
    if(window.confirm('Are you sure? This can Delet class notice and cannot be undone! ')){
        console.log("action datat", data)
        axios.delete(url+`/api/subjectnotice/${data.noticeId}`)
        .then(res =>
            
            {
                dispatch({
                type: GET_SUBJECTNOTICE,
                payload: res.data
                });
         }
        )
        .catch(err => 
            dispatch({
                type: GET_SUBJECTNOTICE,
                payload: {}
            })    
        )
    }
}