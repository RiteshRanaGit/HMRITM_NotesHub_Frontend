import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllClassrooms } from '../../actions/classroomAction';
import {  Redirect} from 'react-router-dom';
import ClassesDisplay from './ClassesDisplay';
import ClassDisplay from './ClassDisplay';
import ClassNoticeDisplay from './ClassNoticeDisplay';
import SubjectNoticeDisplay from './SubjectNoticeDisplay';
import NotesDisplay from './NotesDisplay';
import Spinner from '../common/Spinner';


//import Spinner from '../common/Spinner'

class Classroom extends Component {
    componentDidMount(){
        //this.props.getCurrentClassroom(); 
        this.props.getAllClassrooms();
    }
  render() {
    const { user } = this.props.auth;
    const { classrooms, loading } = this.props.classrooms;
    const { classroom } = this.props.classroom;
    const { classNotice } = this.props.classNotice;
    const { subjectNotice } = this.props.subjectNotice;
    const { subject } = this.props.subject;

    

    
    //const { classroom, loading } = this.props.classroom
    let classroomContent;
    if(this.props.auth.isAuthenticated && this.props.user.role === "STUDENT"){
        return(
            <Redirect to ={this.props.history.push('/classroom')}/>
        )
      }else if (this.props.auth.isAuthenticated && this.props.user.role === "DEPARTMENT"){
        
            classroomContent = (
                <div>
                    <div className="mt-2 row">
                        <div className="col-6">
                        <   p className="lead text-muted">Welcom { user.name }</p>
                        </div>
                        <div className="col-6" style={{textAlign:"right"}}>
                            <Link to="/register-admin" className="lead text-muted">
                            Register-Admin
                            </Link>
                        </div>
                    </div>
                    <div className="mt-2 row">
                        <Link to="/create-classroom" className="btn btn-lg btn-info m-2">
                            Create-Classroom
                        </Link>
                        <Link to="/create-class-notice" className="btn btn-lg btn-info m-2">
                            Create-Classroom-Notice
                        </Link>
                        <Link to="/create-subject" className="btn btn-lg btn-info  m-2">
                            Create-Subject
                        </Link>
                        <Link to="/create-subject-notice" className="btn btn-lg btn-info m-2">
                            Create-Subject-Notice
                        </Link>
                        <Link to="/upload-notes" className="btn btn-lg btn-info m-2">
                            Upload-Notes
                        </Link>
                    </div>
                   
                </div>
            )
        
    }
    let classes ;
    if( classrooms === null || loading ){
        classes = <Spinner/>
    }else{
        classes=
    
            <ClassesDisplay classrooms={classrooms}/>
            

      
    }

    return (
      <div className="classroom">
          <div className="container">
              <div className="row">
                <div className="m-1 col-md-12">
                    <h1 className="display-4">Dashboard</h1>
                    {classroomContent}
                </div>
                <div className="m-1 col-md-12">
                    <div className="row">
                        <div className="col-lg-8 md-12">
                            {classes}
                        </div>
                        <div className="col-lg-4 md-12">
                            <ClassNoticeDisplay classNotice={classNotice}/>
                        </div>
                    </div>
                </div>
                <div className="m-1 col-md-12">
                <div className="row">
                        <div className="col-lg-8 md-12">
                            <ClassDisplay classroom={classroom}/>
                        </div>
                        <div className="col-lg-4 md-12">
                            <SubjectNoticeDisplay subjectNotice={subjectNotice}/>
                        </div>
                    </div>
                    
                </div>
                <div className="m-1 col-md-12">
                    
                        <NotesDisplay subject={subject}/>
                    
                </div>       
              </div>
          </div>
      </div>    
    )
  }
}

Classroom.prototypes = {
    //getCurrentClassroom: PropTypes.func.isRequired,
    getAllClassrooms: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    classrooms: PropTypes.object.isRequired,
    classroom: PropTypes.object.isRequired,
    classNotice: PropTypes.object.isRequired,
    subjectNotice: PropTypes.object.isRequired,
    subjet: PropTypes.object.isRequired

}

const mapStateProps = state => ({
    classNotice: state.classNotice,
    classrooms: state.classroom,
    classroom: state.classroom,
    subjectNotice: state.subjectNotice,
    subject: state.subject,
    auth: state.auth,
    user: state.auth.user
})


export default connect(mapStateProps, {  getAllClassrooms }) (Classroom); 