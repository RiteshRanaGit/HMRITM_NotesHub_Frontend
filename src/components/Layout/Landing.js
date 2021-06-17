import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getEvent } from '../../actions/eventAction';
import EventPublicDisplay from '../eventsDisplay/EventPublicDisplay'
class Landing extends  Component {

    componentDidMount(){
        if(this.props.auth.isAuthenticated && this.props.user.role === "STUDENT"){
          this.props.history.push('/classroom');
        }else if (this.props.auth.isAuthenticated && this.props.user.role === "DEPARTMENT"){
          this.props.history.push('/dashboard');
        }
        this.props.getEvent();
      }

    render(){
        const { events } = this.props.events;
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="display-3 mb-4">HMRITM NotesHub
                                </h1>
                                <p className="lead">Hey, Find your Notes and Important Notice here. </p>
                                <hr />
                                {/* <Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
                                <Link to="/login" className="btn btn-lg btn-light">Login</Link> */}
                                
                            </div>
                        </div>
                    </div>
                   
                        <EventPublicDisplay subject={events}/>
                    
                </div>
                 
            </div>
          )
    }
  
}

Landing.propTypes ={
    getEvent: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.auth.user,
    events: state.events
});

export default connect( mapStateToProps, {  getEvent } ) (Landing);