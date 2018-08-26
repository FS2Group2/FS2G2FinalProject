import React, {Component} from 'react';
//import dataMap from '../constants/ApiSettings';
//import { connect } from 'react-redux';


class ProfileDetails extends Component {
    render() {
            return (
                <div>
                    <p>Name: {this.props.user.name}</p>
                    <p> Email: {this.props.user.email}</p>
                    <p>Location: {this.props.user.cityName}</p>
                    <p>Info: {this.props.user.profileInfo}</p>
                    <img src={this.props.user.profilePhoto} alt="ProfileAvatar"/>
                </div>
            );
        }

}
/*trtrtr*/
export default ProfileDetails;