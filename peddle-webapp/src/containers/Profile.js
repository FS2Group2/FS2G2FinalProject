import React,{Component} from 'react';
import ProfileDetails from "../components/ProfileDetails";


class Profile extends Component{

  render(){
    return(
        <div>
        <h1>
            Profile details
        </h1>
            <ProfileDetails/>
        </div>

    )
  }
}

export default Profile;