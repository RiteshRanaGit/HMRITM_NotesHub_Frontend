import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import classroomReducer from './classroomReducer';
import subjectReducer from './subjectReducer';
import classNoticeReducer from './classNoticeReducer';
import subjectNoticeReducer from './subjectNoticeReducer';
import notesReducer from './notesReducer';



export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    classroom: classroomReducer,
    subject: subjectReducer,
    classNotice: classNoticeReducer,
    subjectNotice: subjectNoticeReducer,
    notes: notesReducer,
})
