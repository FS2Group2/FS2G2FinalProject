import React,{Component} from 'react';
import { render } from 'react-dom';
import ProfileDetails from "../components/ProfileDetails";


class Profile extends Component{
    constructor() {
        super();
        this.state = ({
            User: {
                u_id: 1,
                username: "Bobby Axelrod",
                user_email: "baxe@gmail.com",
                user_location: "New York/NY/USA"
            }
        })
    };

  render(){
    return(
        <div>

        <p>
            Profile details
        </p>
            <ProfileDetails
                u_id={this.state.u_id}
                username={this.state.username}
                user_email={this.state.user_email}
                user_location= {this.state.user_location}
            />

        </div>

    )
  }
}
render(<Profile />, document.getElementById('root'));
export default Profile;