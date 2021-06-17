import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getSubject } from '../../actions/subjectAction';
import { getCurrentSubjectNotice } from '../../actions/subjectNoticeAction';
import isEmpty from '../../validation/is-Empty';
//import { clearCurrentClassroom } from "../../actions/classroomAction";



class ClassDisplay extends Component {
  
  constructor(props){
    super(props);
    this.state = {
        
       
        
        subjectTitle:'',  
      
    };
    //this.onClick = this.onClick.bind(this);
  }
  
  
  handleOnClick = (e, subjectTitle) => {
    e.preventDefault();
    this.setState({subjectTitle}, ()=>{
      const data = {
    
        // yearOfAdmission: this.props.user.year,
        // branch: this.props.user.branch,
        // section: this.props.user.section,
        // role: this.props.user.role,
        subjectTitle:this.state.subjectTitle,
        
       };
       ////console.log("ooyee data",data);
    
      this.props.getSubject(data);
      this.props.getCurrentSubjectNotice(data);
      
      
    })
    
     
  }
  render() {

    const classroom  = this.props.classroom;
    var display = '';
    // cla.forEach(element => {
      if(!classroom || classroom.length===0  || isEmpty(classroom)){
        display = <div>
                    <h4>Classroom will created soon</h4>
                  </div>
      } 
      else{
        const sub = classroom.map(key =>(
          <tr key={key._id}>
              <td>{key.subjectTitle}</td>
              <td>{key.description}</td>
              <td><button  onClick={(e)=>this.handleOnClick(e, key.subjectTitle)}  className="btn btn-success" >Notes / Notice</button></td>
          </tr>
          
        ));
      
      display = <div>
                  <h4 className="md-4">Subjects</h4>
                  <table className="table">
                      <tr>
                          <th>Subject</th>
                          <th>Discription</th>
                          <th>Click Button</th>
                      </tr>
                      <tbody>
                          {sub}
                      </tbody>
                  </table>
                </div>

      }
    // });
      
      //console.log(" hello ye hai",classroom);
    return (
      <div>
        {display}
      </div>
    )
  }
}

ClassDisplay.prototypes = {
  getCurrentSubjectNotice: PropTypes.func.isRequired,
  getSubject: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  
}

const mapStateProps = state => ({

 
  auth: state.auth,
  user: state.auth.user
})

export default connect(mapStateProps, { getSubject, getCurrentSubjectNotice })(withRouter(ClassDisplay));
