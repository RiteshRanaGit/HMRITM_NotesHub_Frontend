import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import isEmpty from '../../validation/is-Empty';
//import { getSubject } from '../../actions/subjectAction';



class ClassNoticeDisplay extends Component {
  
  render() {

    
    const ClassNotice  = this.props.ClassNotice;
    var display = '';
    if(!ClassNotice || ClassNotice.length===0 || isEmpty(ClassNotice) ){
         display  = <div>
             <h4> No notice is avalable </h4>
         </div>
            
        
    } else{
      const  notice = ClassNotice.map(key =>(
           
            <div key={key._id} className="row " style={{margin:'0', borderRadius:'5px', border:'1px solid', padding:'10px'}}>
              
                <h3 style={{width:'100%'}}>{key.classNoticeTitle}</h3>
                <p style={{width:'100%'}}>{key.description}</p>
               
              
            </div>
            
        ));
        display = 
        <div>
        <h1 className="md-4">Class Notice</h1>
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

  auth: PropTypes.object.isRequired,
  
}

const mapStateProps = state => ({

 
  auth: state.auth,
  user: state.auth.user
})

export default connect(mapStateProps)(withRouter(ClassNoticeDisplay));
