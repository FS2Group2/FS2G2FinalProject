import React, {Component} from 'react';
//import dataMap from '../constants/ApiSettings';
//import { connect } from 'react-redux';


class ProfileDetails extends Component {
    render() {
            return (
                <div>
                    <p>Name: {this.props.User.username}</p>
                    <p> Email: {this.props.User.user_email}</p>
                    <p>Location: {this.props.User.user_location}</p>
                </div>
            );
        }

}
/*trtrtr*/
export default ProfileDetails;