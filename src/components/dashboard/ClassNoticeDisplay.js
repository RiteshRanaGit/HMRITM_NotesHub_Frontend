import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { deleteNoticeClass } from '../../actions/classNoticeAction';



class ClassNoticeDisplay extends Component {

  constructor(props){
    super(props);
    this.state = {
     
      noticeId: ''
      
    };
   
  }

  
  handleDeleteOnClick = (e,  _id) => {
    e.preventDefault();
    
    this.setState({noticeId: _id}, ()=>{
      const data = {
    
        noticeId: this.state.noticeId

        
       };
      
      this.props.deleteNoticeClass(data);
      
    })
    
     
  }
  render() {

    const classNotice  = this.props.classNotice;
    console.log(" console loge class notice", classNotice)

    var notice = '';
    var display='';
    if(!classNotice || classNotice.length===0){
         display = <div>
             <h4 className="md-4">Classroom Notice</h4>
         </div>
    } else{
        notice = classNotice.map(key =>(
            <div key={key._id} className="row " style={{margin:'0', borderRadius:'5px', border:'1px solid', padding:'10px'}}>    
                <h3 style={{width:'100%'}}>{key.classNoticeTitle}</h3>
                <p style={{width:'100%'}}>{key.description}</p>
                <button onClick={(e)=>this.handleDeleteOnClick(e, key._id)}className="btn btn-danger" style={{width:"100%", height:'100%'}} >Delete</button>
            </div>
            
        ));
        display=<div>
            <h1 className="md-4">Classroom Notices</h1>
            {notice}
        </div>
    }
      
    return (
      <div>
        {display}
      </div>
    )
  }
}

ClassNoticeDisplay.prototypes = {
  deleteNoticeClass: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  
}

const mapStateProps = state => ({

 
  auth: state.auth,
  user: state.auth.user
})

export default connect(mapStateProps, {deleteNoticeClass})(withRouter(ClassNoticeDisplay));
