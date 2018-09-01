import React, {Component} from 'react';
import {connect} from "react-redux";

class About extends Component{
  render(){
    return(
        <div>
            <h1>About Page</h1>
            <p>EventTour - is a platform for safe traveling around the world.</p>
            <h2>Our goal:</h2>
            <p>We what to create a platform where user could combine traveling</p>
            <p>and work around the world with best offers</p>
            <p>like tours, transfers and accomodations </p>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    EventsState: state.eventReducer
  }
};

export default connect(mapStateToProps)(About);