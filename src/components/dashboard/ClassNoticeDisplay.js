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
  
      
    // });
    var notice = '';
    var display='';
    if(!classNotice || classNotice.length===0){
         display = <div>
             <h4 className="md-4">Class Notice</h4>
         </div>
            
        
    } else{
        notice = classNotice.map(key =>(
            <tr key={key._id}>
                <td>{key.classNoticeTitle}</td>
                <td>{key.description}</td>
                <td>
                    <button onClick={(e)=>this.handleDeleteOnClick(e, key._id)}  className="btn btn-danger"  >Delete</button>
                </td>
            </tr>
            
        ));
        display=<div>
            <h4 className="md-4">Class Notice</h4>
            <table className="table">
                <tr>
                    <th>Notice Title</th>
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

ClassNoticeDisplay.prototypes = {
  deleteNoticeClass: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  
}

const mapStateProps = state => ({

 
  auth: state.auth,
  user: state.auth.user
})

export default connect(mapStateProps, {deleteNoticeClass})(withRouter(ClassNoticeDisplay));
