import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginDepartmentUser } from '../../actions/authActions';
import TextFieldGrop from '../common/TextFieldGroup';



class LoginDepartment extends Component {
    constructor(){
        super();
        this.state ={
          email:'',
          password:'',
          errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
      }
      componentDidMount(){
        if(this.props.auth.isAuthenticated && this.props.user.role === "STUDENT"){
          this.props.history.push('/classroom');
        }else if (this.props.auth.isAuthenticated && this.props.user.role === "DEPARTMENT"){
          this.props.history.push('/dashboard');
        }
      }
      componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated ){
            this.props.history.push('/dashboard');
        } 
        if(nextProps.errors) {
          this.setState({errors: nextProps.errors});
        }
      }
    
      onSubmit(e) {
        e.preventDefault();
         const user = {
           email: this.state.email,
           password: this.state.password
         };
         this.props.loginDepartmentUser(user);
         
      }
    
      onChange(e){
        this.setState({[e.target.name]: e.target.value});
      }
  render(){
    const { errors } = this.state;

    return (
        <div className="login">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Log In</h1>
                    <p className="lead text-center">Login to Dashbord</p>
                        <form onSubmit={this.onSubmit}>
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
                            <input type="submit" className="btn btn-info btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
      )
  }
}

LoginDepartment.propTypes = {
    loginDepartmentUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };


const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.auth.user,
    errors: state.errors
  });

export default connect(mapStateToProps, { loginDepartmentUser }) (LoginDepartment);