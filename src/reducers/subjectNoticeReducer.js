import {GET_SUBJECTNOTICE, SUBJECTNOTICE_LOADING, CLEAR_CURRENT_SUBJECTNOTICE } from '../actions/types';


const initialState = {
    subjectNotice: null,
    subjectNoticese: null,
    loading: false
}

export default function(state = initialState, action){
    switch (action.type){
        case SUBJECTNOTICE_LOADING:
            return{
                ...state,
                loading: true
            }
        case GET_SUBJECTNOTICE:
            return{
                ...state,
                subjectNotice: action.payload,
                loading: false
            }

        case CLEAR_CURRENT_SUBJECTNOTICE:
            return{
                ...state,
                subjectNotice: null
            }
        default:
            return state;
    }
}