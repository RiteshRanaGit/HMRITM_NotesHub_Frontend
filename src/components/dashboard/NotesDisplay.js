import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { deleteNotes } from '../../actions/notesAction';
import isEmpty from '../../validation/is-Empty';




class NotesDisplay extends Component {
  constructor(props){
    super(props);
    this.state = {
     
      notesId: ''
      
    };
   
  }

  
  handleDeleteOnClick = (e,  _id) => {
    e.preventDefault();
    
    this.setState({notesId: _id}, ()=>{
      const data = {
    
        notesId: this.state.notesId

        
       };
      
      this.props.deleteNotes(data, this.props.history);
      
    })
    
     
  }

    
    
  render() {

    
    const subject  = this.props.subject;
    
    // cla.forEach(element => {
      
    // });
    var notes = '';
    var display= '';
    if(!subject || subject.length===0 || isEmpty(subject )){
         display = <div>
              <h4 className="md-4"> Subject Notes</h4>
         </div>
            
        
    } else{
        notes = subject.map(key =>(
            <tr key={key._id}>
                <td>{key.notesTitle}</td>
                <td>{key.description}</td>
                <td>
                  <button  className="btn btn-success"  ><a href={key.file.file_url} download target="_blank" style={{color:"white"}}>Download</a>
                  </button>
                </td>
                <td><button onClick={(e)=>this.handleDeleteOnClick(e, key._id)} className="btn btn-danger">Delete</button></td>
            </tr>
            
        ));
        display = 
        <div>
          <h4 className="md-4"> Subject Notes</h4>
          <table className="table">
              <tr>
                  <th>Notes Title</th>
                  <th>Discription</th>
                  <th> Download</th>
                  <th>Delete</th>
              </tr>
              <tbody>
                  {notes}
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

NotesDisplay.prototypes = {
  deleteNotes: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  
}

const mapStateProps = state => ({

 
  auth: state.auth,
  user: state.auth.user
})

export default connect(mapStateProps, {deleteNotes})(withRouter(NotesDisplay));
