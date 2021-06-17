import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getDepartmentSubject, deleteSubject } from '../../actions/subjectAction';
import { getCurrentDepartmentSubjectNotice } from '../../actions/subjectNoticeAction';
import isEmpty from '../../validation/is-Empty';




class ClassDisplay extends Component {
  
  constructor(props){
    super(props);
    this.state = {
        
       
        
        subjectId:'',  
      
    };
    //this.onClick = this.onClick.bind(this);
  }
  
  
  handleOnClick = (e, key) => {
    e.preventDefault();
    this.setState({subjectId: key}, ()=>{
      const data = {
    
        
        subjectId: this.state.subjectId,
        
       };
       ////console.log("ooyee data",data);
      
      this.props.getDepartmentSubject(data);
      this.props.getCurrentDepartmentSubjectNotice(data);
      
      
    })
    
     
  }

  handleDeleteOnClick = (e,  _id) => {
    e.preventDefault();
    
    this.setState({subjectId: _id}, ()=>{
      const data = {
    
        subjectId: this.state.subjectId

        
       };
      
      this.props.deleteSubject(data);
      
    })
    
     
  }

  render() {

    
    const classroom  = this.props.classroom;
    var display ='';
    // cla.forEach(element => {
      
    // });
    if(!classroom || classroom.length===0 || isEmpty(classroom) ){
        display = <div>
             <h4 className="md-4"> class subjects</h4>
        </div>
           
       
   } else{
      const sub = classroom.map(key =>(
          <div  key={key._id} className="row" style={{margin:'10px 0', border:'1px solid', borderRadius:'5px'}}>
            <h3 style={{width:'100%', padding:'5px'}}>{key.subjectTitle}</h3>
            <p style={{width:'100%', padding:'5px'}}>{key.description}</p>
            <button style={{width:'48%'}}  onClick={(e)=>this.handleOnClick(e, key._id)}  className="m-1 btn btn-success" >Notes / Notice</button>
            <button style={{width:'48%'}} onClick={(e)=>this.handleDeleteOnClick(e, key._id)}  className="m-1  btn btn-danger" >Delete</button>
          </div>
          
          
      ));
      display =
      <div>
          <h1 className="md-4">Subjects</h1>
            {sub}
      </div>
    }
    return (
      <div>
        {display}
      </div>
    )
  }
}

ClassDisplay.prototypes = {
    deleteSubject: PropTypes.func.isRequired,
    getCurrentDepartmentSubjectNotice: PropTypes.func.isRequired,
    getDepartmentSubject: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  
}

const mapStateProps = state => ({

 
  auth: state.auth,
  user: state.auth.user
})

export default connect(mapStateProps, { getDepartmentSubject, getCurrentDepartmentSubjectNotice, deleteSubject })(withRouter(ClassDisplay));
