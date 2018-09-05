import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../css/Login.css'
import dataMap from "../constants/ApiSettings";
import {connect} from "react-redux";
import {changeUser, setLoggedIn} from "../actions/userActions";
import {loadWishList} from "../actions/wishListActions";
import {loadPurchaceList} from "../actions/purchaceActions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      submitted: false,
      userId: 0,
      username: '',
      password: '',
      userInf: '',
      wishlist: [],
      purchace:[],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({submitted: true});
    // const {username, password} = this.state;
    this.findUser()
  };

  closeWarning() {
    let close = document.getElementsByClassName("warn-close");
    let i;

    for (i = 0; i < close.length; i++) {
      // When someone clicks on a close button
      close[i].onclick = function () {
        let div = this.parentElement;
        div.style.opacity = "0";
        setTimeout(function () {
          div.style.display = "none";
        }, 600);
      }
    }
  }

  findUser() {
    const {changeUser, setLoggedIn} = this.props;
    let loginHeader = new Headers();
    loginHeader.append("Content-Type", "application/JSON");
    let query = {
      name: this.state.username,
      password: this.state.password
    };
    let reqParam = {
      method: 'POST',
      headers: loginHeader,
      body: JSON.stringify(query)
    };
    const url = dataMap.user;
    console.log('request params:' + JSON.stringify(reqParam));
    fetch(url, reqParam)
        .then(res => res.json())
        .then(
            (result) => {
              if (result.id) {
                changeUser(result);
                setLoggedIn(true);
              }
              this.setState({
                isLoaded: true,
                userInf: result
              }, () => this.loadWishList(result.id))
            },

            (error) => {
              this.setState({
                isLoaded: true,
                error
              })
            })
  };

  loadWishList(userId) {
    let header = new Headers();
    header.append("Content-Type", "application/JSON");
    let reqParam = {
      method: 'GET',
      headers: header
    };
    const url = dataMap.wishlist + userId;
    console.log('request params:' + JSON.stringify(reqParam));
    fetch(url, reqParam)
        .then(res => res.json())
        .then(
            (result) => {
              this.props.loadWishListToStore(result)
            })
  }
    loadPurchaceList(userId) {
        let header = new Headers();
        header.append("Content-Type", "application/JSON");
        let reqParam = {
            method: 'GET',
            headers: header
        };
        const url = dataMap.purchace + userId;
        console.log('request params:' + JSON.stringify(reqParam));
        fetch(url, reqParam)
            .then(res => res.json())
            .then(
                (result) => {
                    this.props.loadPurchaceListToStore(result)
                })
    }

  render() {
    const {username, password, submitted, userInf} = this.state;
    const {userState} = this.props;
    return (
        userState.currentUser.id ?
            <div className="login-box">
              <h2 className='login-msg success-msg'> Hello, {userState.currentUser.name}!</h2>
            </div>
            :
            <div>
              <div className="login-box">
                <div className="login-box-header">
                  <p className="login-box-header-left">Log In</p>
                </div>
                <input className="login-input-box" type="text" name="username" placeholder="Your Name"
                       value={username} onChange={this.handleChange}/>
                {submitted && !username &&
                <div className="login-help-block">
                  <p className="warning-text">Username is required</p>
                  <span className="warn-close" onClick={this.closeWarning}>&times;</span>
                </div>
                }
                <input className="login-input-box" type="password" name="password" placeholder="Password"
                       value={password} onChange={this.handleChange}/>
                {submitted && !password &&
                <div className="login-help-block">
                  <p className="warning-text">Password is required</p>
                  <span className="warn-close" onClick={this.closeWarning}>&times;</span>
                </div>
                }
                <input className="login-btn" type="button" value="Login" onClick={this.handleSubmit}/>
                {userInf.error && <p className='login-msg error-msg'>{userInf.message}</p>}
                <Link to="/register" className="login-reg-link">Sign Up</Link>
              </div>
            </div>
    )
  }
}

const mapStateToProps = state => ({
  userState: state.userReducer
});

const mapDispatchToProps = dispatch => {
  return {
    setLoggedIn: isLogged => {
      dispatch(setLoggedIn(isLogged))
    },
    changeUser: user => {
      dispatch(changeUser(user))
    },
    loadWishListToStore: data => {
      dispatch(loadWishList(data))
    },
    loadPurchaceListToStore: data => {
      dispatch(loadPurchaceList(data))
    }

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);