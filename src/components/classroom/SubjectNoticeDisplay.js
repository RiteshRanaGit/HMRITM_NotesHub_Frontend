import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
//import { getSubject } from '../../actions/subjectAction';



class SubjectNoticeDisplay extends Component {

  render() {

    const subjectNotice  = this.props.subjectNotice;

    var notice = '';
    var display = '';
    if(!subjectNotice || subjectNotice.length===0){
         display = <div>
            <h4 className="md-4"> Subject Notice</h4>
         </div> 
    } else{
        notice = subjectNotice.map(key =>(
            
            <div key={key._id} className="row " style={{margin:'0', borderRadius:'5px', border:'1px solid', padding:'10px'}}>            
                <h3 style={{width:'100%'}}>{key.subjectNoticeTitle}</h3>
                <p style={{width:'100%'}}>{key.description}</p>
            </div>
            
        ));
        display = 
        <div>
            <h1 className="md-4"> Subject Notice</h1>
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

SubjectNoticeDisplay.prototypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateProps = state => ({
  auth: state.auth,
  user: state.auth.user
})

export default connect(mapStateProps)(withRouter(SubjectNoticeDisplay));
