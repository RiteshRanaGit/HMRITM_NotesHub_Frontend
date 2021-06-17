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
      // branch: '',
      // year: '',
      // section:'',
      // semester:''
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
       //console.log("ooyee data",data);
    
      // this.props.getSubject(data);
      //console.log("data hai ye", data);
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
            <tr key={key._id}>
                <td>{key.branch}</td>
                <td>{key.year}</td>
                <td>{key.section}</td>
                <td>{key.semester}</td>
                {/* onClick={(e)=>this.handleOnClick(e)} */}
                
                <td>
                  <button   onClick={(e)=>this.handleOnClick(e, key._id)}  className="m-1 btn btn-success" >Subjects</button>
                
                </td>
                <td>
                  <button onClick={(e)=>this.handleDeleteOnClick(e, key._id)}   className="m-1 btn btn-danger" >delete</button>
                </td>
            </tr>
            
        ));
        display = <div>
                    <h4 className="">Classrooms</h4>
                    <table className="table">
                        <tr>
                            <th>Branch</th>
                            <th>year</th>
                            <th>section</th>
                            <th>semester</th>
                            <th>Action</th>
                            <th>Delete</th>
                        </tr>
                        <tbody>
                            {classes}
                        </tbody>
                    </table>
                  </div>
    }


      
      //console.log(" hello ye hai",classroom);
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
