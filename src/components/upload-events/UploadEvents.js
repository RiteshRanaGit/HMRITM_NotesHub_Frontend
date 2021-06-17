import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect} from 'react-router-dom'


import PropTypes from "prop-types";
import TextFieldGroup from '../common/TextFieldGroup'
//import SelectListGroup from '../common/SelectListGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'

import {createEvent} from '../../actions/eventAction';


class UploadEvents extends Component {
    constructor(props){
        super(props);
        this.state = {
            eventHeading:"",
            description: '',            
            file: null,
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors){
            this.setState({errors: nextProps.errors})
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const {eventHeading, description, file} = this.state;

        const formData = new FormData();
        formData.append("eventHeading", eventHeading);
        formData.append("description", description);
        formData.append("file", file);
    
        this.props.createEvent(formData, this.props.history )
    }
    onChange(e) {

        if(e.target.name === "file"){
            this.setState({[e.target.name]: e.target.files[0]});
         
        } else {
        this.setState({[e.target.name]: e.target.value});
    }}

    render() {
        
        const { errors } = this.state;

        if(this.props.auth.isAuthenticated && this.props.user.role === "STUDENT"){
            return(
                <Redirect to ={this.props.history.push('/classroom')}/>
            )
          }else if (this.props.auth.isAuthenticated && this.props.user.role === "DEPARTMENT"){
            return (
        
                <div className="create-notes">
                  <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="diplay-4 text-center">Upload Notes</h1>
                            <p className="lead text-center">
                                let's get started
                            </p>
                            <small className="d-block pd-3">* = Required field</small>
        
                            <form onSubmit={this.onSubmit}>
                                {errors.msg && <div className="text-danger" >{errors.msg}</div> }
                                <TextFieldGroup 
                                    placeholder="Event Heading"
                                    name="eventHeading"
                                    value={this.state.eventHeading}
                                    onChange={this.onChange}
                                    error={errors.notesTitle}
                                    
                                    info ="Write Notes Title"
                                />
        
                                <TextAreaFieldGroup
                                    placeholder="Description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    error={errors.description}
                                    
                                    info ="Add Description"
                                />
                                <TextFieldGroup 
                                    placeholder="select file"
                                    type="file"
                                    name="file"
                                    // value={this.state.file}
                                    onChange={this.onChange}
                                    error={errors.file}
                                    
                                    info ="Please Select File "
                                />
        
                               
                                {errors.notes && <div className="text-danger" >{errors.events}</div> }   
                                     
                                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" /> 
                            </form>
                        </div>  
                    </div>
                  </div>
                </div>
            )
          }
    
  }
}

UploadEvents.propTypes = {
    auth: PropTypes.object.isRequired,
    events: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    // user: state.auth.user,
    auth: state.auth,
    user: state.auth.user,
    events: state.events,
    errors: state.errors
})

export default connect(mapStateToProps, { createEvent })(withRouter(UploadEvents));  