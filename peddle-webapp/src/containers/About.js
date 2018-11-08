import React, {Component} from 'react';
import '../css/About.css'

class About extends Component{
  render(){
    return(
        <div className="about-page-root">
          <h1 className="about-head">About Project:</h1>
          <p className="about-info"><span>EventTour</span> - is a platform for safe traveling around the world.</p>
          <h2 className="about-goal">Our goal:</h2>
          <p className="about-content">We what to create a platform where user could combine traveling</p>
          <p className="about-content">and work around the world with best offers</p>
          <p className="about-content">like tours, transfers and accommodations </p>
        </div>
    )
  }
}

export default About;