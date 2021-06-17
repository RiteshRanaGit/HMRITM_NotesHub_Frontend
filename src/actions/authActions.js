import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import url from "../config/url";


import { GET_ERRORS, SET_CURRENT_USER } from './types';


// Register User

export const registerUser = (userData, history) => dispatch => {
     axios
        .post(url+'/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })     
        );
};

// Register department

export const registerDepartment = (userData, history) => dispatch => {
    axios
       .post(url+'/api/department/register', userData)
       .then(res => history.push('/dashboard'))
       .catch(err =>
           dispatch({
               type: GET_ERRORS,
               payload: err.response.data
           })     
       );
};


// Login user

export const loginUser = userData => dispatch => {
    axios
       .post(url+'/api/users/login', userData)
       .then(res => {
           // save to localStorage 
           const { token } = res.data;
           // set token to LocalStorage 
            localStorage.setItem('jwtToken', token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode the token to get user data
            const decoded = jwt_decode(token);
            // set current user data
            dispatch(setCurrentUser(decoded));
       })
       .catch(err =>
           dispatch({
               type: GET_ERRORS,
               payload: err.response.data
           })     
       );
};

// Login Department

export const loginDepartmentUser = userData => dispatch => {
    axios
       .post(url+'/api/department/login', userData)
       .then(res => {
           // save to localStorage 
           const { token } = res.data;
           // set token to LocalStorage 
            localStorage.setItem('jwtToken', token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode the token to get user data
            const decoded = jwt_decode(token);
            // set current user data
            dispatch(setCurrentUser(decoded));
       })
       .catch(err =>
           dispatch({
               type: GET_ERRORS,
               payload: err.response.data
           })     
       );
};

// set current user 

export const setCurrentUser = ( decoded ) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// Log out user 

export const logoutUser = () => dispatch => {
    // Remove token from localStorage 
    localStorage.removeItem('jwtToken');
    // remove auth header for future request
    setAuthToken(false);
    // set current user to {} which will set isAuntheticated to false
    dispatch(setCurrentUser({}));

    // window.location.href = '/';
}