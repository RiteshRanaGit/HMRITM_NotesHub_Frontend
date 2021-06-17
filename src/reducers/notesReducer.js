import {GET_NOTES, NOTES_LOADING, CLEAR_CURRENT_NOTES } from '../actions/types';


const initialState = {
    notes: null,
    allNotes: null,
    loading: false
}

export default function(state = initialState, action){
    switch (action.type){
        case NOTES_LOADING:
            return{
                ...state,
                loading: true
            }
        case GET_NOTES:
            return{
                ...state,
                notes: action.payload,
                loading: false
            }

        case CLEAR_CURRENT_NOTES:
            return{
                ...state,
                notes: null
            }
        default:
            return state;
    }
}