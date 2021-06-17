import axios from 'axios';
import { GET_CLASSROOM, CLASSROOM_LOADING, GET_ERRORS, CLEAR_CURRENT_CLASSROOM, GET_CLASSROOMS, DELETE_CLASSROOM} from './types';

import url from "../config/url";
// Get current classroom

export const getCurrentClassroom = (data) => dispatch =>{
    dispatch(setClassroomLoading());
    
    axios.get(url+'/api/classrooms', data)
        .then(res =>
            {console.log("ye hai response", res.data); dispatch({
                type: GET_CLASSROOM,
                payload: res.data,
                loading: false
            })}
            
        )
        .catch(err => 
            dispatch({
                type: GET_CLASSROOM,
                payload: {}
            })    
        )
       
}

// get current department classroom
export const getCurrentDepartmentClassroom = (data) => dispatch =>{
    dispatch(setClassroomLoading());
    //console.log('data', data, ' data.classId', data.classId);
    axios.get(url+`/api/classrooms/department/${data.classId}`)
        .then(res =>
            {   //console.log("ye hai response", res.data);
                dispatch({
                type: GET_CLASSROOM,
                payload: res.data,
                loading: false
            })}
        )
        .catch(err => 
            dispatch({
                type: GET_CLASSROOM,
                payload: {}
            })    
        )
       
}


// create classroom 

export const createClassroom = ( classroomData, history) => dispatch =>{
    axios
        .post(url+'/api/classrooms/', classroomData)
        .then(res => history.push('/dashboard'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));
}

// classroom loading 
 export const setClassroomLoading = () => {
     return{
         type: CLASSROOM_LOADING
     }
 }

 // clear current classroom  
 export const clearCurrentClassroom = () => {
    return{
        type: CLEAR_CURRENT_CLASSROOM
    }
}

// get all classroms
export const getAllClassrooms = () => dispatch =>{
    dispatch(setClassroomLoading());
    axios.get(url+'/api/classrooms/all')
        .then(res =>
            dispatch({
                type: GET_CLASSROOMS,
                payload: res.data,
                loading: false
            })
        )
        .catch(err => 
            dispatch({
                type: GET_CLASSROOMS,
                payload: {}
            })    
        )
}

// delete class

export const deleteClass = (data, history) => dispatch =>{
    
    if(window.confirm('Are you sure? This can Delet this class and all subject, notice, sunject notice, notes delete and cannot be undone! ')){
        console.log("action datat", data)
        axios.delete(url+`/api/classrooms/${data.classId}`)
        .then(res =>
            // history.push('/dashboard')
            {
                dispatch({
                type: GET_CLASSROOMS,
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
