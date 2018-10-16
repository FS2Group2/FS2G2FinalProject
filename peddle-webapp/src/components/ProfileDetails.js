import React, {Component} from 'react';
import dataMap from '../constants/ApiSettings';
import '../css/profile.css'
import {connect} from "react-redux";
import {setUpdateProfileError, updateProfile} from "../actions/userActions";
import Preloader from "../containers/Preloader";
import {userData} from "../constants/queryTypes";
import {fetchDataFromApi} from "../actions/fetchDataActions";


class ProfileDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      selectedFile: null,
      email: this.props.user.email,
      cityName: this.props.user.cityId,
      profileInfo: this.props.user.profileInfo,
      profilePhoto: this.props.user.profilePhoto,
      profileCityLiving: this.props.user.profileCityLiving,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      loadPhotoPending: false,
      loadPhotoSuccess: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const {name, value} = event.target;
    this.setState({[name]: value});
  };

  handleSubmit(event) {
    let {
      email, cityName, profileInfo, profilePhoto, profileCityLiving,
      firstName, lastName
    } = this.state;
    const {updateUserProfile} = this.props;
    let profileData = {
      userId: this.props.user.id,
      name: this.props.user.name,
      role: 2,
      email: email,
      city: cityName,
      profileInfo: profileInfo,
      profilePhoto: profilePhoto,
      profileCityLiving: profileCityLiving,
      firstName: firstName,
      lastName: lastName
    };
    event.preventDefault();
    updateUserProfile(profileData);
    setTimeout(() => this.setState({editMode: false}, () => this.props.setUpdateProfileError('')), 2500);
  };

  fileSelectedHandler = (event) => {
    this.setState({selectedFile: event.target.files[0]});
  };

  fileUploadHandler = () => {
    let img = this.state.selectedFile;
    let form = new FormData();
    form.append("image", img);
    let ulr = dataMap.userPhoto;
    let headers = {
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
    };
    let reqParam = {
      method: 'post',
      headers: headers,
      body: form
    };
    let responseStatus = false;
    this.setState({loadPhotoPending: true, loadPhotoSuccess: false});

    fetch(ulr, reqParam)
      .then(response => {
        this.setState({loadPhotoPending: false});
        responseStatus = response.ok;
        return response;
      })
      .then(response => response.json())
      .then(json => {
        if (responseStatus) {
          this.setState({loadPhotoSuccess: true, profilePhoto: json.message});
          this.props.fetchDataFromApi(userData, {name: this.props.user.name});
        }
      })
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isProfileUpdateSuccess !== this.props.isProfileUpdateSuccess) {
      if (nextProps.isProfileUpdateSuccess) this.setState({editMode: false});
    }
  }

  render() {
    const {
      name, email, cityName, profileInfo, profilePhoto, profileCityLiving,
      firstName, lastName
    } = this.props.user;
    const {cities, profileUpdateError} = this.props;
    const editMode = this.state.editMode;
    return (
      <div className='profile'>
        {this.state.loadPhotoPending && <Preloader/>}
        <div className='profile-detail'>
          <div className="user-photo-section">
            <div className="user-photo-container">
              {profilePhoto ? <img className='user-photo' src={profilePhoto} alt="ProfileAvatar"/> :
                <img className='user-photo' src='https://peddle-bucket.s3.amazonaws.com/avatars/unknown_user.png'
                     alt="ProfileAvatar"/>}
            </div>
            {editMode && <div>
              <label htmlFor="fileSelect" className='fileContainer'>
                <img src="/img/icons/user.svg" className='user-icon' alt=""/>
                Select new user photo
                <input name='fileSelect' className='file-select-button' type="file"
                       onChange={this.fileSelectedHandler}/>
              </label>
              {this.state.selectedFile &&
              <button className='btn-upload' onClick={this.fileUploadHandler}>Upload</button>
              }

            </div>}

          </div>

          {!editMode ? <div className="user-info-container">
              <p className='user-info-name'>{name}</p>
              <p className='user-info-item-p'><span className="user-info-item-header">First name: </span>{firstName}</p>
              <p className='user-info-item-p'><span className="user-info-item-header">Last name: </span>{lastName}</p>
              <p className='user-info-item-p'><span className="user-info-item-header">Email: </span>{email}</p>
              <p className='user-info-item-p'><span className="user-info-item-header">My city: </span>{profileCityLiving}
              </p>
              <p className='user-info-item-p'><span
                className="user-info-item-header">Default city for transfer: </span>{cityName}</p>
              {profileInfo && <p><span className="user-info-item-header">About me:</span></p>}
              <p className='user-info-item-p'>{profileInfo}</p>
            </div> :
            <div className="user-info-container">
              {this.props.isProfileUpdatePending && <Preloader/>}
              <h3 className="edit-form-header">Edit personal data:</h3>
              <form action="">
                <label htmlFor="firstName" className='user-info-input-header'>First name: </label>
                <input className="profile-input" type="text" name="firstName" placeholder="First name"
                       value={this.state.firstName} onChange={this.handleChange}/>

                <label htmlFor="lastName" className='user-info-input-header'>Last name: </label>
                <input className="profile-input" type="text" name="lastName" placeholder="Last name"
                       value={this.state.lastName} onChange={this.handleChange}/>

                <label htmlFor="email" className='user-info-input-header'>email: </label>
                <input className="profile-input" type="text" name="email" placeholder="email"
                       value={this.state.email} onChange={this.handleChange}/>

                <label htmlFor="cityName" className='user-info-input-header'>Default city for transfer:</label>
                <select className="profile-input" name="cityName" placeholder="City name"
                        value={this.state.cityName} onChange={this.handleChange}>
                  {cities[0] && cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>

                <label htmlFor="profileCityLiving" className='user-info-input-header'>My city: </label>
                <input className="profile-input" type="text" name="profileCityLiving" placeholder="My city"
                       value={this.state.profileCityLiving} onChange={this.handleChange}/>

                <label htmlFor="profileInfo" className='user-info-input-header'>About me: </label>
                <input className="profile-input" type="text" name="profileInfo"
                       value={this.state.profileInfo} onChange={this.handleChange}/>

                <button className="btn-save" onClick={this.handleSubmit}>Save to profile</button>
                {profileUpdateError && <p className="err-message">{profileUpdateError.message}</p>}
              </form>
            </div>
          }
        </div>

        {!editMode && <button className="btn-edit" onClick={() => this.setState({editMode: true})}
                              disabled={this.state.editMode}> Edit
        </button>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.currentUser,
    cities: state.fillListsReducer.cities,
    isProfileUpdatePending: state.userReducer.isProfileUpdatePending,
    isProfileUpdateSuccess: state.userReducer.isProfileUpdateSuccess,
    profileUpdateError: state.userReducer.profileUpdateError
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserProfile: (profileData) => dispatch(updateProfile(profileData)),
    setUpdateProfileError: (error) => dispatch(setUpdateProfileError(error)),
    fetchDataFromApi: (queryType, query) => {
      dispatch(fetchDataFromApi(queryType, query))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetails);