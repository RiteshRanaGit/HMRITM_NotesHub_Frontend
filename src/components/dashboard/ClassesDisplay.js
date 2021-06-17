import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
//import { getSubject } from '../../actions/subjectAction';
import { getCurrentDepartmentClassroom, deleteClass } from '../../actions/classroomAction';
import { getCurrentDepartmentClassNotice } from "../../actions/classNoticeAction";
import { clearCurrentSubjectNotice } from "../../actions/subjectNoticeAction";
import { clearCurrentSubject } from "../../actions/subjectAction";
import isEmpty from '../../validation/is-Empty';



class ClassesDisplay extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      classId: ''
    };
    //this.onClick = this.onClick.bind(this);
  }
  
  
  handleOnClick = (e,  _id) => {
    e.preventDefault();
    
    this.setState({classId: _id}, ()=>{
      const data = {
    
        classId: this.state.classId

        
       };
      this.props.clearCurrentSubjectNotice();
      this.props.clearCurrentSubject();
      this.props.getCurrentDepartmentClassroom(data);
      this.props.getCurrentDepartmentClassNotice(data);
      
      
    })
    
     
  }
  handleDeleteOnClick = (e,  _id) => {
    e.preventDefault();
    
    this.setState({classId: _id}, ()=>{
      const data = {
    
        classId: this.state.classId

        
       };
  
      this.props.deleteClass(data, this.props.history);
      

      
    })
    
     
  }


  render() {

    
    const classrooms  = this.props.classrooms;
    
    var display= '';

    if(!classrooms || classrooms.length===0 || isEmpty(classrooms)){
      display = <div> 
                   <h4 className="">Classrooms</h4>
                </div>
    } else{
          const classes = classrooms.map(key =>(
            <div key={key._id} className='row' style={{margin:'10px 0', borderRadius:'5px', border:'1px solid'}}>
              <div className="row" style={{display:'flex',width:'100%', margin:0}}>
                <h3 style={{padding :'5px 10px'}}>Class </h3>
                <h3 className='ml-auto' style={{ textAlign:'center',padding :'5px 10px'}}> {key.branch} {key.year} {key.section} {key.semester}</h3>
                <button   onClick={(e)=>this.handleOnClick(e, key._id)}  className="m-1 btn btn-success" >Subjects</button>
                <button onClick={(e)=>this.handleDeleteOnClick(e, key._id)}   className="m-1 btn btn-danger" >delete</button>
              </div>

            </div>
            
        ));
        display = <div>
                    <h1 className="">Classrooms</h1>
                    {classes}
                  </div>
    }

    return (
      <div>
        {display}
      </div>
    )
  }
}

ClassesDisplay.prototypes = {
  clearCurrentSubjectNotice: PropTypes.func.isRequired,
  getCurrentDepartmentClassroom: PropTypes.func.isRequired,
  getCurrentDepartmentClassNotice: PropTypes.func.isRequired,
  clearCurrentSubject:  PropTypes.func.isRequired,
  deleteClass: PropTypes.func.isRequired,

  auth: PropTypes.object.isRequired,
  
}

const mapStateProps = state => ({

 
  auth: state.auth,
  user: state.auth.user
})

export default connect(mapStateProps, { getCurrentDepartmentClassroom, getCurrentDepartmentClassNotice, clearCurrentSubjectNotice, deleteClass, clearCurrentSubject })(withRouter(ClassesDisplay));
