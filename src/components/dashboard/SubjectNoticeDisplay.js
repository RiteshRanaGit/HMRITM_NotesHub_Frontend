import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { deleteNoticeSubject } from '../../actions/subjectNoticeAction';
import isEmpty from '../../validation/is-Empty';



class SubjectNoticeDisplay extends Component {
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
      
      this.props.deleteNoticeSubject(data);
      
    })
    
     
  }

    
    
  render() {

    
    const subjectNotice  = this.props.subjectNotice;
    
    var notice = '';
    var display = '';
    if(!subjectNotice || subjectNotice.length===0 || isEmpty(subjectNotice)){
         display = <div>
            <h4 className="md-4"> Subject Notice</h4>
         </div>
            
        
    } else{
        notice = subjectNotice.map(key =>(
            <tr key={key._id}>
                <td>{key.subjectNoticeTitle}</td>
                <td>{key.description}</td>
                <td><button onClick={(e)=>this.handleDeleteOnClick(e, key._id)} className="btn btn-danger"  >Delete</button></td>
            </tr>
            
        ));
        display = 
        <div>
            <h4 className="md-4"> Subject Notice</h4>
            <table className="table">
                <tr>
                    <th>Subject Notice Title</th>
                    <th>Discription</th>
                    <th>Delete</th>
                </tr>
                <tbody>
                    {notice}
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

SubjectNoticeDisplay.prototypes = {
  deleteNoticeSubject: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  
}

const mapStateProps = state => ({

 
  auth: state.auth,
  user: state.auth.user
})

export default connect(mapStateProps,{ deleteNoticeSubject })(withRouter(SubjectNoticeDisplay));
