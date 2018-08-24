import React, {Component} from 'react';
//import dataMap from '../constants/ApiSettings';
//kimport { connect } from 'react-redux';


class ProfileDetails extends Component {

    constructor() {
        super();
        this.state = {
            username: "Bobby Axelrod",
            user_email: "baxe@gmail.com",
            user_location: "New York/NY/USA",
            u_id: 1,
        }
    };

    render() {
        const {username, user_location, user_email} = this.state;
            return (
                <div>
                    <p>Name: {username}</p>
                    <p> Email: {user_email}</p>
                    <p>Location: {user_location}</p>
                </div>
            );
        }

}
export default ProfileDetails;