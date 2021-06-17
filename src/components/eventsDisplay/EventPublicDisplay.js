import React, { Component } from 'react'
import { connect } from 'react-redux';
//import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
//import { deleteEvent } from '../../actions/eventAction';
import isEmpty from '../../validation/is-Empty';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import EventCard  from './EventCard/EventCard';


class EventPublicDisplay extends Component {
  
  
  render() {
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    
    const subject  = this.props.subject;
    
    var display= '';
    if(!subject || subject.length===0 || isEmpty(subject )){
         display = <div>
              <h4 className="md-4"></h4>
         </div>
            
        
    } else{
        display = subject.map(key =>(
            <EventCard  
                key={key._id} 
                headding={key.eventHeading} 
                description={key.description} 
                url={key.file.file_url} 
            />
            
        ));

    }
      

    return (
      <div>
          <h1 style={{textAlign:'center', fontWeight:'300', fontSize: '4rem'}}>Events</h1>
          <Carousel
                swipeable={false}
                draggable={false}
                showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                //this.props.deviceType !== "mobile" ? true : 
                autoPlay={true}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="transform 1000ms ease-in-out"
                transitionDuration={1000}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                deviceType={this.props.deviceType}
                //dotListClass="custom-dot-list-style"
                //itemClass="carousel-item-padding-40-px"
                >
                {display}
            </Carousel>
      </div>
    )
  }
}



const mapStateProps = state => ({
  auth: state.auth,
  user: state.auth.user
})

export default connect(mapStateProps)(withRouter(EventPublicDisplay));
