import {GET_EVENT, EVENT_LOADING, CLEAR_CURRENT_EVENT } from '../actions/types';


const initialState = {
    events: null,
    //allEvents: null,
    loading: false
}

export default function(state = initialState, action){
    switch (action.type){
        case EVENT_LOADING:
            return{
                ...state,
                loading: true
            }
        case GET_EVENT:
            return{
                ...state,
                events: action.payload,
                loading: false
            }

        case CLEAR_CURRENT_EVENT:
            return{
                ...state,
                events: null
            }
        default:
            return state;
    }
}