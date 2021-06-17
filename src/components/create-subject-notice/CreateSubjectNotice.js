import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom'

import PropTypes from "prop-types";
import TextFieldGroup from '../common/TextFieldGroup'
import SelectListGroup from '../common/SelectListGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'

import {createSubjectNotice} from '../../actions/subjectNoticeAction';


class CreateSubjectNotice extends Component {
    constructor(props){
        super(props);
        this.state = {
            role:"",
            year: '',
            branch: '',
            section: '',
            semester: '',
            subjectTitle:'',
            subjectNoticeTitle: '',
            description: '',
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
        const subjectNoticeData = {

            // role: this.state.role,
            classroom: this.state.classroom,
            year: this.state.year,
            branch: this.state.branch,
            section: this.state.section,
            semester: this.state.semester,
            subjectTitle: this.state.subjectTitle,
            subjectNoticeTitle: this.state.subjectNoticeTitle,
            description: this.state.description
        }

        this.props.createSubjectNotice(subjectNoticeData, this.props.history )
    }
    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        
        const { errors } = this.state;

        // select options for year
        const yearOptions = [
            {label: "* Select Year ", value: 0},
            {label: "1st ", value: "1"},
            {label: "2nd", value: "2"},
            {label: "3rd", value: "3"},
            {label: "4th", value: "4"},
            
        ];
        const branchOptions = [
            {label: "* Select Branch ", value: 0},
            {label: "IT ", value: "IT"},
            {label: "CS", value: "CS"},
            {label: "ECE", value: "ECE"},
            {label: "EEE", value: "EEE"},
            {label: "MBA", value: "MBA"},
            
        ];
        const sectionOptions = [
            {label: "* Select Section ", value: 0},
            {label: "A", value: "A"},
            {label: "B", value: "B"},
            {label: "C", value: "C"},
            {label: "D", value: "D"},
            
        ];
        const semesterOptions = [
            {label: "* Select Semester ", value: 0},
            {label: "1 ", value: "1"},
            {label: "2", value: "2"},
            {label: "3", value: "3"},
            {label: "4", value: "4"},
            {label: "5", value: "5"},
            {label: "6", value: "6"},
            {label: "7", value: "7"},
            {label: "8", value: "8"},
            
        ];
    if(this.props.auth.isAuthenticated && this.props.user.role === "STUDENT"){
        return(
            <Redirect to ={this.props.history.push('/classroom')}/>
        )
        }else if (this.props.auth.isAuthenticated && this.props.user.role === "DEPARTMENT"){

            return (
            <div className="create-subject-notice">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="diplay-4 text-center">Create Subject Notice</h1>
                            <p className="lead text-center">
                                let's get started
                            </p>
                            <small className="d-block pd-3">* = Required field</small>

                            <form onSubmit={this.onSubmit}>
                                {errors.msg && <div className="text-danger" >{errors.msg}</div> }

                                <SelectListGroup
                                    placeholder="Year"
                                    name="year"
                                    value={this.state.year}
                                    onChange={this.onChange}
                                    error={errors.year}
                                    options={yearOptions}
                                    info ="Select your year"
                                />
                                <SelectListGroup
                                    placeholder="Branch"
                                    name="branch"
                                    value={this.state.branch}
                                    onChange={this.onChange}
                                    error={errors.branch}
                                    options={branchOptions}
                                    info ="Select your branch"
                                />
                                <SelectListGroup
                                    placeholder="Section"
                                    name="section"
                                    value={this.state.section}
                                    onChange={this.onChange}
                                    error={errors.section}
                                    options={sectionOptions}
                                    info ="Select your section"
                                />
                                <SelectListGroup
                                    placeholder="Semester"
                                    name="semester"
                                    value={this.state.semester}
                                    onChange={this.onChange}
                                    error={errors.semester}
                                    options={semesterOptions}
                                    info ="Select your semester"
                                />
                                
                                {errors.classroom && <div className="text-danger" >{errors.classroom}</div> }

                                <TextFieldGroup 
                                    placeholder="Subject Title"
                                    name="subjectTitle"
                                    value={this.state.subjectTitle}
                                    onChange={this.onChange}
                                    error={errors.subjectTitle}
                                    
                                    info ="Write Subject Title"
                                />
                                {errors.subject && <div className="text-danger" >{errors.subject}</div> } 
                                <TextFieldGroup 
                                    placeholder="Notice Title"
                                    name="subjectNoticeTitle"
                                    value={this.state.subjectNoticeTitle}
                                    onChange={this.onChange}
                                    error={errors.subjectNoticeTitle}
                                    
                                    info ="Write Notice Title"
                                />

                                <TextAreaFieldGroup
                                    placeholder="Description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    error={errors.description}
                                    
                                    info ="Add Description"
                                />

                            
                                {errors.subjectnotice && <div className="text-danger" >{errors.subjectnotice}</div> }  
                            
                                
                                
                                    
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

CreateSubjectNotice.propTypes = {
    auth: PropTypes.object.isRequired,
    subjectNotice: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.auth.user,
    subjectNotice: state.subjectNotice,
    errors: state.errors
})

export default connect(mapStateToProps, { createSubjectNotice })(withRouter(CreateSubjectNotice));  