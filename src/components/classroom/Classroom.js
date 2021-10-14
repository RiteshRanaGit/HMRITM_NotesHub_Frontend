import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentClassroom } from '../../actions/classroomAction';
import { getCurrentClassNotice } from '../../actions/classNoticeAction';
import {  Redirect} from 'react-router-dom';

import Spinner from '../common/Spinner';
import ClassDisplay from './ClassDisplay';
import SubjectDisplay from './SubjectDisplay';
import ClassNoticeDisplay from './ClassNoticeDisplay';
import SubjectNoticeDisplay from './SubjectNoticeDisplay';


class Classroom extends Component {
    constructor(props){
        super(props);
        this.state = {
            
           
            id: '',
            name: '',
            enroll: '',
            email: '',
            year: '',
            branch: '',
            role: '',
            section:'',
            errors: {}
        };

       
    }

    static getDerivedStateFromProps(props) {
        if (props.auth) {
          return {
            name: props.user.name,
            enroll: props.user.enroll,
            email: props.user.email,
            year: props.user.year,
            branch: props.user.branch,
            section: props.user.section,
            role: props.user.role,
  

          };
        }
      }
    
    componentDidMount(){
        this.props.getCurrentClassroom();
        this.props.getCurrentClassNotice(); 
    }

  render() {
    const { user } = this.props.auth;
    const { classroom, loading } = this.props.classroom;
    const { subject } = this.props.subject;
    const { classNotice } = this.props.classNotice;
    const { subjectNotice } = this.props.subjectNotice;
    let classroomContent;
    if(this.props.auth.isAuthenticated && this.props.user.role === "STUDENT"){
        if(classroom === null || loading ){
            classroomContent = <Spinner/>;
        } else {
            if(Object.keys(this.props.user).length > 0){
                
                
                classroomContent =
                <div>
                    
                            <h4>Welcome {user.name}</h4>
                            <div className="m-4 row" style={{display:"flex"}}>
                                <div className=" col-lg-6 md-12">
                                    <ClassNoticeDisplay ClassNotice={classNotice}/>
                                    
                                </div>
                                <div className="col-lg-6 md-12">
                                    <ClassDisplay classroom={classroom}/>
                                </div>
                                
                            </div>
                            <div className="m-4 row" style={{display:"flex"}}>
                                <div className=" col-lg-6 md-12">
                                    <SubjectDisplay subject={subject}/>
                                </div>
                                <div className=" col-lg-6 md-12">
                                    <SubjectNoticeDisplay subjectNotice={subjectNotice}/>
                                </div>
                                
                            </div>
                            
    
                </div>
                
            } else {
                classroomContent = (
                    <div>
                        <p className="lead text-muted">welcom { user.name }</p>
                        <p>class will be created soon</p>
                    </div>
                )
            }
        }
      }else if (this.props.auth.isAuthenticated && this.props.user.role === "DEPARTMENT"){
        <Redirect to ={this.props.history.push('/dashboard')}/>
      }
   

    return (
      <div className="classroom">
          <div className="container">
              <div className="row">
                <div className="col-md-12">
                    <h1 className="display-4">Classroom</h1>
                    {classroomContent}
                </div>          
              </div>
          </div>
      </div>    
    )
  }
}

Classroom.prototypes = {
    getCurrentClassroom: PropTypes.func.isRequired,
    getCurrentClassNotice: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    classroom: PropTypes.object.isRequired,
    subject: PropTypes.object.isRequired,
    classNotice: PropTypes.object.isRequired,
    subjectNotice: PropTypes.object.isRequired
}

const mapStateProps = state => ({
    subjectNotice: state.subjectNotice,
    classNotice: state.classNotice,
    subject: state.subject,
    classroom: state.classroom,
    auth: state.auth,
    user: state.auth.user
})
export default connect(mapStateProps, { getCurrentClassroom, getCurrentClassNotice }) (Classroom); 