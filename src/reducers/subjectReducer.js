import {GET_SUBJECT, SUBJECT_LOADING, CLEAR_CURRENT_SUBJECT } from '../actions/types';


const initialState = {
    subject: null,
    subjects: null,
    loading: false
}

export default function(state = initialState, action){
    switch (action.type){
        case SUBJECT_LOADING:
            return{
                ...state,
                loading: true
            }
        case GET_SUBJECT:
            return{
                ...state,
                subject: action.payload,
                loading: false
            }

        case CLEAR_CURRENT_SUBJECT:
            return{
                ...state,
                subject: null
            }
        default:
            return state;
    }
}