import axios from 'axios';
//import classNoticeReducer from '../reducers/classNoticeReducer';
import { GET_CLASSNOTICE, CLASSNOTICE_LOADING, GET_ERRORS, CLEAR_CURRENT_CLASSNOTICE} from './types';
import url from "../config/url";

// Get current classroom

export const getCurrentClassNotice = () => dispatch =>{
    dispatch(setClassNoticeLoading());
    axios.get(url+'/api/classnotice')
        .then(res =>
            dispatch({
                type: GET_CLASSNOTICE,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_CLASSNOTICE,
                payload: {}
            })    
        )
}


// Get current department class notice

export const getCurrentDepartmentClassNotice = (data) => dispatch =>{
    dispatch(setClassNoticeLoading());
    //console.log( " data of class notice", data)
    axios.get(url+`/api/classnotice/department/${data.classId}`)
        .then(res =>
            {console.log('res of class notice', res.data);
                dispatch({
                type: GET_CLASSNOTICE,
                payload: res.data
            })}
        )
        .catch(err => 
            dispatch({
                type: GET_CLASSNOTICE,
                payload: {}
            })    
        )
}


// create classroom 

export const createClassNotice = ( classNoticeData, history) => dispatch =>{
    axios
        .post(url+'/api/classnotice', classNoticeData)
        .then(res => history.push('/dashboard'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));
}

// classroom loading 
 export const setClassNoticeLoading = () => {
     return{
         type: CLASSNOTICE_LOADING
     }
 }

 // clear current classroom  
 export const clearCurrentClassNotice = () => {
    return{
        type: CLEAR_CURRENT_CLASSNOTICE
    }
}


//delete
export const deleteNoticeClass = (data) => dispatch =>{
    
    if(window.confirm('Are you sure? This can Delet class notice and cannot be undone! ')){
        console.log("action datat", data)
        axios.delete(url+`/api/classnotice/${data.noticeId}`)
        .then(res =>
            
            {
                dispatch({
                type: GET_CLASSNOTICE,
                payload: res.data
                });
         }
        )
        .catch(err => 
            dispatch({
                type: GET_CLASSNOTICE,
                payload: {}
            })    
        )
    }
}