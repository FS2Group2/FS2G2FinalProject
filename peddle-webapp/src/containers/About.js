import React, {Component} from 'react';
import {connect} from "react-redux";

class About extends Component{
  render(){
    return(
        <h1>About Page</h1>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    EventsState: state.eventReducer
  }
};

export default connect(mapStateToProps)(About);