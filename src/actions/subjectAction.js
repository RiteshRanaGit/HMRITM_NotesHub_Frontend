import axios from 'axios';
import { GET_SUBJECT, SUBJECT_LOADING, GET_ERRORS, CLEAR_CURRENT_SUBJECT, GET_CLASSROOM} from './types';
//
import url from "../config/url";
// Get current classroom

export const getSubject = (data) => dispatch =>{
    //console.log("data hai yer",data)
    dispatch(setSubjectLoading());
    axios.get(url+`/api/subject/${data.subjectTitle}`)
        .then(res =>
           {console.log("ye raha mai",res.data);
                dispatch({
                type: GET_SUBJECT,
                payload: res.data
            })}
        )
        .catch(err => 
            dispatch({
                type: GET_SUBJECT,
                payload: {}
            })    
        )
}

// Get department current classroom

export const getDepartmentSubject = (data) => dispatch =>{
    //console.log("data hai yer",data)
    
    dispatch(setSubjectLoading());
    console.log('data id of sub', data.subjectId);
    axios.get(url+`/api/subject/department/${data.subjectId}`)
        .then(res =>
           {  //console.log("res data of subjects of clsas",res.data);
                dispatch({
                type: GET_SUBJECT,
                payload: res.data
            })}
        )
        .catch(err => 
            dispatch({
                type: GET_SUBJECT,
                payload: {}
            })    
        )
}
// create classroom 

export const createSubject = ( subjectData, history) => dispatch =>{
    axios
        .post(url+'/api/subject/', subjectData)
        .then(res => history.push('/dashboard'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));
}

// classroom loading 
 export const setSubjectLoading = () => {
     return{
         type: SUBJECT_LOADING
     }
 }

 // clear current classroom  
 export const clearCurrentSubject = () => {
    return{
        type: CLEAR_CURRENT_SUBJECT
    }
}


//delete 
export const deleteSubject = (data) => dispatch =>{
    
    if(window.confirm('Are you sure? This can Delete Subject, all notice and notes in this subject and cannot be undone! ')){
        console.log("action datat", data)
        axios.delete(url+`/api/subject/${data.subjectId}`)
        .then(res =>
            
            {
                dispatch({
                type: GET_CLASSROOM,
                payload: res.data
                });
         }
        )
        .catch(err => 
            dispatch({
                type: GET_CLASSROOM,
                payload: {}
            })    
        )
    }
}