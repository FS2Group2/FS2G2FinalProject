import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../css/Login.css'
import dataMap from "../constants/ApiSettings";
import {connect} from "react-redux";
import {changeUser, setLoggedIn} from "../actions/userActions";
import {loadWishList} from "../actions/wishListActions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      submitted: false,
      userId: 0,
      username: '',
      password: '',
      rememberMe: false,
      wishlist: [],
      error: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleCheck(event) {
    const {name, checked} = event.target;
    this.setState({[name]: checked});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({submitted: true});
    this.login();
    // this.findUser()
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

  login() {
    let loginHeader = new Headers();
    loginHeader.append("Content-Type", "application/JSON");
    let query = {
      name: this.state.username,
      password: this.state.password,
      rememberMe: this.state.rememberMe
    };
    let reqParam = {
      method: 'POST',
      headers: loginHeader,
      body: JSON.stringify(query)
    };
    const url = dataMap.login;
    fetch(url, reqParam)
      .then(res => res.json())
      .then(res => res.accessToken ?
        localStorage.setItem('accessToken', res.accessToken) : this.setState({error: 'error'}))
      .then(() => localStorage.getItem('accessToken')
        ? this.findUser() : null)

  };

  findUser() {
    const {changeUser, setLoggedIn} = this.props;
    let query = {
      name: this.state.username,
    };
    let reqParam = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    };
    const url = dataMap.user;
    fetch(url, reqParam)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          if (result.id) {
            changeUser(result);
            setLoggedIn(true);
            localStorage.setItem('logged', '1');
            localStorage.setItem('usr', result.name);
            localStorage.setItem('uid', result.id);
          }
          this.setState({
            isLoaded: true
          }, () => this.loadWishList(result.id), setTimeout(() => this.props.history.push('/'), 1500))

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
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
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

  render() {
    const {username, password, submitted, error} = this.state;
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
              <p className="login-box-header-center">Log In</p>
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
            <div className="input-group">
              <div>
                <input type="checkbox" name={'rememberMe'} id={'rememberMe'}
                onChange={this.handleCheck}/>
                <label htmlFor="rememberMe" className={'login-input-label'}>Remember me</label>
              </div>
              <Link to={'/forgotPass'} className={'forgot-pass-link'}>Forgot your password?</Link>
            </div>

            <input className="login-btn" type="button" value="Login" onClick={this.handleSubmit}/>
            {error && <p className='login-msg error-msg'>{'error login failed - username or password is incorrect'}</p>}
            <span className="register-login-span">Still not registered? >></span>
            <Link to="/register" className="login-reg-link">Register</Link>
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
    }

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);