import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { registerDepartment } from '../../actions/authActions';
import TextFieldGrop from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';


class RegisterAdmin extends Component {
  constructor(){
    super();
    this.state ={
      name: '',
     
      email:'',
      password:'',
      password2:'',
      
      department:'',
      
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  onSubmit(e) {
    e.preventDefault();
     const newUser = {
       name: this.state.name,
       
       email: this.state.email,
       password: this.state.password,
       password2: this.state.password2,
       
       department: this.state.department
       
     }

     this.props.registerDepartment(newUser, this.props.history);
    
  }
  componentDidMount(){
    // if(this.props.auth.isAuthenticated && this.props.user.role === "STUDENT"){
    //   this.props.history.push('/classroom');
    // }else if (this.props.auth.isAuthenticated && this.props.user.role === "DEPARTMENT"){
    //   this.props.history.push('/dashboard');
    // }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  render(){

    const {errors} = this.state;
    const departmentOptions = [
        {label: "* Select Department ", value: 0},
        {label: "IT ", value: "IT"},
        {label: "CS", value: "CS"},
        {label: "ECE", value: "ECE"},
        {label: "EEE", value: "EEE"},
        {label: "MBA", value: "MBA"},
        
    ];
    if(this.props.auth.isAuthenticated && this.props.user.role === "STUDENT"){
        return(
            <Redirect to ={this.props.history.push('/classroom')}/>
        )
        }else if (this.props.auth.isAuthenticated && this.props.user.role === "DEPARTMENT"){
            return (

                <div className="register-admin">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h1 className="display-4 text-center">Sign Up</h1>
                                <p className="lead text-center">Admin Registration</p>
                                <form onSubmit={this.onSubmit}>
                                <TextFieldGrop
                                    
                                    placeholder="name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                    error={errors.name}
                                />

                                
                                

                                <TextFieldGrop
                                    type="email"
                                    placeholder="Email Address"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    error={errors.email}
                                />
                                
                                <TextFieldGrop
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    error={errors.password}
                                />
                                
                                <TextFieldGrop
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="password2"
                                    value={this.state.password2}
                                    onChange={this.onChange}
                                    error={errors.password2}
                                />
                                
                            
                                
                                <SelectListGroup
                                    placeholder="Department"
                                    name="department"
                                    value={this.state.department}
                                    onChange={this.onChange}
                                    error={errors.department}
                                    options={departmentOptions}
                                    info ="Select your department"
                                />
                                
                                
                                
                                
                                
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
  }
}

RegisterAdmin.propTypes = {
  registerDepartment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.auth.user,
  errors: state.errors
});




export default connect( mapStateToProps, { registerDepartment }) (withRouter(RegisterAdmin));