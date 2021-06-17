import {GET_CLASSNOTICE, CLASSNOTICE_LOADING, CLEAR_CURRENT_CLASSNOTICE } from '../actions/types';


const initialState = {
    classNotice: null,
    classNoticese: null,
    loading: false
}

export default function(state = initialState, action){
    switch (action.type){
        case CLASSNOTICE_LOADING:
            return{
                ...state,
                loading: true
            }
        case GET_CLASSNOTICE:
            return{
                ...state,
                classNotice: action.payload,
                loading: false
            }

        case CLEAR_CURRENT_CLASSNOTICE:
            return{
                ...state,
                classNotice: null
            }
        default:
            return state;
    }
}