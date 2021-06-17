import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { deleteEvent } from '../../actions/eventAction';
import isEmpty from '../../validation/is-Empty';
import EventCard from './EventCard/EventCard';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


class EventsDisplay extends Component {
  constructor(props){
    super(props);
    this.state = {
     
      eventId: ''
    };
   
  }

  
  handleDeleteOnClick = (e,  _id) => {
    e.preventDefault();
    
    this.setState({eventId: _id}, ()=>{
      const data = {
    
        eventId: this.state.eventId
        
        
       };
      
      this.props.deleteEvent(data, this.props.history);
      
    })
    
     
  }

    
    
  render() {

    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
      },
      tablet: {
        breakpoint: { max: 1024, min: 769 },
        items: 2
      },
      mobile: {
        breakpoint: { max: 769, min: 0 },
        items: 1
      }
    };
    const subject  = this.props.subject;
    console.log(this.props.deviceType)
    // cla.forEach(element => {
      
    // });
    var notes = '';
    var display= '';
    if(!subject || subject.length===0 || isEmpty(subject )){
         display = <div>
              <h4 className="md-4">No Event created yet!</h4>
         </div>
            
        
    } else{
        notes = subject.map(key =>(
          <div className='row' style={{margin:'0 5px'}}>
            <EventCard  
              key={key._id} 
              headding={key.eventHeading} 
              description={key.description} 
              url={key.file.file_url} 
            />
            
            <div className='row justify-content-center' style={{ width:'100%',margin:'0 15px'}}>
              
              <button style={{width:'100%'}} onClick={(e)=>this.handleDeleteOnClick(e, key._id)} className="btn btn-danger">Delete</button>
            </div>
          </div>  
        ));
        display = 
        <Carousel
                deviceType={this.props.deviceType}
                swipeable={true}
                draggable={false}
                showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                //this.props.deviceType !== "mobile" ? true : 
                autoPlay={this.props.deviceType !== "mobile" ? true :false}
                autoPlaySpeed={1000}
                //keyBoardControl={true}
                customTransition="transform 1000ms ease-in-out"
                transitionDuration={1000}
                //containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                
                //dotListClass="custom-dot-list-style"
                //itemClass="carousel-item-padding-40-px"
                >
                {notes}
            </Carousel>
        
        
    }
      
    return (
      <div style={{backgroundColor:'#efeaea', margin:'10px 0', borderRadius:'10px', padding:' 15px 0'}}>
        {display}
      </div>
    )
  }
}

EventsDisplay.prototypes = {
  deleteEvent: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  
}

const mapStateProps = state => ({

 
  auth: state.auth,
  user: state.auth.user
})

export default connect(mapStateProps, {deleteEvent})(withRouter(EventsDisplay));
