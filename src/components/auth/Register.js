import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGrop from '../common/TextFieldGroup';

class Register extends Component {
  constructor(){
    super();
    this.state ={
      name: '',
      enroll: '',
      email:'',
      password:'',
      password2:'',
      yearOfAdmission:'',
      branch:'',
      section:'',
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  onSubmit(e) {
    e.preventDefault();
     const newUser = {
       name: this.state.name,
       enroll: this.state.enroll,
       email: this.state.email,
       password: this.state.password,
       password2: this.state.password2,
       yearOfAdmission: this.state.yearOfAdmission,
       branch: this.state.branch,
       section: this.state.section
     }

     this.props.registerUser(newUser, this.props.history);
    
  }
  componentDidMount(){
    if(this.props.auth.isAuthenticated && this.props.user.role === "STUDENT"){
      this.props.history.push('/classroom');
    }else if (this.props.auth.isAuthenticated && this.props.user.role === "DEPARTMENT"){
      this.props.history.push('/dashboard');
    }
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

    return (

        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">Student Registration</p>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGrop
                    
                    placeholder="name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                  />

                  <TextFieldGrop
                    type="number"
                    placeholder="Enrollment Number"
                    name="enroll"
                    value={this.state.enroll}
                    onChange={this.onChange}
                    error={errors.enroll}
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
                  
                  <TextFieldGrop
                    type="number"
                    placeholder="Year of Admission"
                    name="yearOfAdmission"
                    value={this.state.yearOfAdmission}
                    onChange={this.onChange}
                    error={errors.yearOfAdmission}
                  />
                  
                  <TextFieldGrop
                    
                    placeholder="Branch"
                    name="branch"
                    value={this.state.branch}
                    onChange={this.onChange}
                    error={errors.branch}
                  />
                  
                  
                  <TextFieldGrop
                    
                    placeholder="Section"
                    name="section"
                    value={this.state.section}
                    onChange={this.onChange}
                    error={errors.section}
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.auth.user,
  errors: state.errors
});




export default connect( mapStateToProps, { registerUser }) (withRouter(Register));