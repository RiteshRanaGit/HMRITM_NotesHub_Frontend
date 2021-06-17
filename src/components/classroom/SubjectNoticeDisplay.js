import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
//import { getSubject } from '../../actions/subjectAction';



class SubjectNoticeDisplay extends Component {
  

    
    
  render() {

    
    const subjectNotice  = this.props.subjectNotice;
    
    // cla.forEach(element => {
      
    // });
    var notice = '';
    var display = '';
    if(!subjectNotice || subjectNotice.length===0){
         display = <div>
            <h4 className="md-4"> Subject Notice</h4>
         </div>
            
        
    } else{
        notice = subjectNotice.map(key =>(
            <tr key={key._id}>
                <td>{key.subjectNoticeTitle}</td>
                <td>{key.description}</td>
                {/* <td><button  className="btn btn-success"  ><a href={key.file.file_url} download target="_blank" style={{color:"white"}}>Download</a></button></td> */}
            </tr>
            
        ));
        display = 
        <div>
            <h4 className="md-4"> Subject Notice</h4>
            <table className="table">
                <tr>
                    <th>Subject Notice Title</th>
                    <th>Discription</th>
                    <th></th>
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
  auth: PropTypes.object.isRequired,
  
}

const mapStateProps = state => ({

 
  auth: state.auth,
  user: state.auth.user
})

export default connect(mapStateProps)(withRouter(SubjectNoticeDisplay));
