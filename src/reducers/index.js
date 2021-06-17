import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import classroomReducer from './classroomReducer';
import subjectReducer from './subjectReducer';
import classNoticeReducer from './classNoticeReducer';
import subjectNoticeReducer from './subjectNoticeReducer';
import notesReducer from './notesReducer';
import eventReducer from './eventReducer';




export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    classroom: classroomReducer,
    subject: subjectReducer,
    classNotice: classNoticeReducer,
    subjectNotice: subjectNoticeReducer,
    notes: notesReducer,
    events: eventReducer
})
