import {GET_CLASSROOM, CLASSROOM_LOADING, CLEAR_CURRENT_CLASSROOM, GET_CLASSROOMS, DELETE_CLASSROOM } from '../actions/types';


const initialState = {
    classroom: null,
    classrooms: null,
    loading: false
}

export default function(state = initialState, action){
    switch (action.type){
        case CLASSROOM_LOADING:
            return{
                ...state,
                loading: true
            }
        case GET_CLASSROOM:
            return{
                ...state,
                classroom: action.payload,
                loading: false
            }

        case CLEAR_CURRENT_CLASSROOM:
            return{
                ...state,
                classroom: null
            }
        case GET_CLASSROOMS:
            return{
                ...state,
                classrooms: action.payload,
                loading: false
                
            }
        case DELETE_CLASSROOM:
            return{
                ...state,
                classroom: null,
                loading: false
            }
        default:
            return state;
    }
}