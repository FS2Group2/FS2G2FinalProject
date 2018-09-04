import React, {Component} from 'react';
import {userPhotoPath} from '../constants/ApiSettings';
import '../css/profile.css'


class ProfileDetails extends Component {
  render() {
    const {name, email, cityName, profileInfo, profilePhoto} = this.props.user;
    return (
          <div className='profile-detail'>
            <div className="user-photo-container">
              <img className='user-photo' src={userPhotoPath + profilePhoto} alt="ProfileAvatar"/>
            </div>
            <div className="user-info-container">
                <p className='user-info-name'>{name}</p>
                <p>{email}</p>
                <p>City: {cityName}</p>
                <p>Info</p>
                <p>{profileInfo}</p>
            </div>
          </div>
    );
  }
}

export default ProfileDetails;