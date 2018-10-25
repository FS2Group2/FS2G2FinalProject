import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../css/Register.css'
import {fetchRegister, setRegisterError} from "../actions/userActions";
import {connect} from "react-redux";


class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: false,
      errMsg: '',
      name: '',
      email: '',
      password1: '',
      password2: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const {name, value} = event.target;
    this.setState({[name]: value});
  };

  handleSubmit(event) {
    let {name, email, password1} = this.state;
    const {setErrMessage, sendRegistrationData} = this.props;
    let registrationData = {
      name: name,
      email: email,
      password: password1
    };
    event.preventDefault();
    this.validateRegData().validated ? sendRegistrationData(registrationData) : setErrMessage(this.validateRegData().errMsg)
  };


  validateRegData() {
    let {name, email, password1, password2} = this.state;

    if (!(name && email && password1)) {
      return {errMsg: 'All fields must be filled in', validated: false}
    }
    else if (/ /ig.test(name)) return {errMsg: 'Name can not contain spaces', validated: false};
    else if (password1 !== password2) {
      return {errMsg: 'Passwords are not the same in both fields', validated: false}
    }
    else return {errMsg: '', validated: true}

  }

  render() {
    const {regState} = this.props;
    let {name, email, password1, password2} = this.state;

    return (
      <div className="page-content">
        {regState.message.message ? <div className="register-box">
            <div className="register-message">
              <p className="success-msg-p">{regState.message.message}</p>
            </div>
          </div> :
          <div className="register-box">
            <div className="login-box-header">
              <p className="login-box-header-center">Register</p>
            </div>
            <input className="login-input-box" type="text" name="name" placeholder="You Name"
                   value={name} onChange={this.handleChange}/>
            <input className="login-input-box" type="email" name="email" placeholder="Email"
                   value={email} onChange={this.handleChange}/>
            <input className="login-input-box" type="password" name="password1" placeholder="Choose Password"
                   value={password1} onChange={this.handleChange}/>
            <input className="login-input-box" type="password" name="password2" placeholder="Confirm Password"
                   value={password2} onChange={this.handleChange}/>
            <input className="btn login-btn" type="button" value="Register"
                   onClick={this.handleSubmit}/>
            {(regState.registerError ||
              this.state.errMsg) &&
            <div className="register-message">
              <p className="err-msg-p">
                {this.state.errMsg || (regState.registerError && regState.registerError.message)}
              </p>
            </div>}
            <span className="register-login-span">Already registered? >></span>
            <Link to="/login" className="login-reg-link">Login</Link>
          </div>}
      </div>

    )
  }
}

const
  mapStateToProps = (state) => {
    return {
      regState: state.userReducer
    }
  };

const
  mapDispatchToProps = (dispatch) => {
    return {
      sendRegistrationData: (registrationData) => dispatch(fetchRegister(registrationData)),
      setErrMessage: (msg) => dispatch(setRegisterError({success: false, message: msg}))
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);