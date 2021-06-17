import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import isEmpty from '../../validation/is-Empty';
//import { getSubject } from '../../actions/subjectAction';



class ClassNoticeDisplay extends Component {
  
//   constructor(props){
//     super(props);
//     this.state = {
        
       
        
//         subjectTitle:'',  
      
//     };
//     //this.onClick = this.onClick.bind(this);
//   }
  
  
//   handleOnClick = (e, subjectTitle) => {
//     e.preventDefault();
//     this.setState({subjectTitle}, ()=>{
//       const data = {
    
//         // yearOfAdmission: this.props.user.year,
//         // branch: this.props.user.branch,
//         // section: this.props.user.section,
//         // role: this.props.user.role,
//         subjectTitle:this.state.subjectTitle,
        
//        };
//        ////console.log("ooyee data",data);
//       this.props.getSubject(data);
//     })
    
     
 // }
  render() {

    
    const ClassNotice  = this.props.ClassNotice;
    
    // cla.forEach(element => {
      
    // });
    //var notice= '';
    var display = '';
    if(!ClassNotice || ClassNotice.length===0 || isEmpty(ClassNotice) ){
         display  = <div>
             <h4> No notice is avalable </h4>
         </div>
            
        
    } else{
      const  notice = ClassNotice.map(key =>(
            <tr key={key._id}>
                <td>{key.classNoticeTitle}</td>
                <td>{key.description}</td>
                {/* <td><button  className="btn btn-success"  ><a href={key.file.file_url} download target="_blank" style={{color:"white"}}>Download</a></button></td> */}
            </tr>
            
        ));
        display = 
        <div>
        <h4 className="md-4">Class Notice</h4>
        <table className="table">
            <tr>
                <th>Notice Title</th>
                <th>Discription</th>
                
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
  //getSubject: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  
}

const mapStateProps = state => ({

 
  auth: state.auth,
  user: state.auth.user
})

export default connect(mapStateProps)(withRouter(ClassNoticeDisplay));
