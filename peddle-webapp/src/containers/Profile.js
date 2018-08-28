import React, {Component} from 'react';
import ProfileDetails from "../components/ProfileDetails";
import connect from "react-redux/es/connect/connect";

class Profile extends Component {
  render() {
    const user=this.props.currentUser;
    return (
        <div>
          <p> Profile details: </p>
          <ProfileDetails user={user}/>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer
  }
};

export default connect(mapStateToProps)(Profile);