import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
//import { getSubject } from '../../actions/subjectAction';



class SubjectDisplay extends Component {
  

    
    
  render() {

    
    const subject  = this.props.subject;
    
    // cla.forEach(element => {
      
    // });
    var notes = '';
    var display= '';
    if(!subject || subject.length===0 ){
         display = <div>
              <h4 className="md-4"> Subject Notes</h4>
         </div>
            
        
    } else{
        notes = subject.map(key =>(
            <div key={key._id} className="row" style={{margin:'10px 0', border:'1px solid', borderRadius:'5px'}}>
              <h3 style={{width:'100%', padding:'5px'}}>{key.notesTitle}</h3>
              <p style={{width:'100%', padding:'5px'}}>{key.description}</p>
              <button style={{width:'100%'}} className="m-1 btn btn-success"  ><a href={key.file.file_url} download target="_blank" style={{color:"white"}}>Download</a>
              </button>
            </div>
        ));
        display = 
        <div>
          <h1 className="md-4"> Subject Notes</h1>
          {notes}
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

SubjectDisplay.prototypes = {
  auth: PropTypes.object.isRequired,
  
}

const mapStateProps = state => ({

 
  auth: state.auth,
  user: state.auth.user
})

export default connect(mapStateProps)(withRouter(SubjectDisplay));
