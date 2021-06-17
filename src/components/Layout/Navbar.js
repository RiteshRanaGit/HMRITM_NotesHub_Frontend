import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentClassroom } from '../../actions/classroomAction';
import logo from '../../img/HMRLogo.png'

class Navbar extends Component {

    onLogoutClick(e) {
        e.preventDefault();
        this.props.clearCurrentClassroom();
        this.props.logoutUser();
    }

    render(){

        const { isAuthenticated, user } = this.props.auth;

        const gestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        );

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a 
                        href="/"
                        className="nav-link">
                        {user.name}
                    </a>
                    
                </li>
                <li className="nav-item">
                    <a 
                        href="/" 
                        onClick={this.onLogoutClick.bind(this)} 
                        className="nav-link">Logout

                    </a>
                </li>
            </ul>
        );

        return (
            <nav className="navbar navbar-expand-sm navbar-dark  mb-4" style={{backgroundColor:'#02009C'}}>
                <div className="container">
                <Link className="navbar-brand" to="/">
                    <img style={{ height: "40px", width:'140px', borderRadius:'5px', backgroundColor:'#ffffff'}} src={logo} alt="" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/adminlogin"> 
                                Admin
                            </Link>
                        </li>
                    </ul>
                    {isAuthenticated ? authLinks : gestLinks}
                    
                </div>
                </div>
            </nav>
          )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});


export default connect( mapStateToProps, { logoutUser, clearCurrentClassroom }) (Navbar);
