import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {setRegisterData, setRegisterError} from "../actions/userActions";
import {fetchData} from "./fetchData";
import dataMap from "../constants/ApiSettings";

class ChangePass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: false,
      errMsg: '',
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
    const {setErrMessage} = this.props;
    event.preventDefault();
    this.validateRegData().validated ? this.changePassQuery() : setErrMessage(this.validateRegData().errMsg)
  };

  changePassQuery() {
    const newPassword = this.state.password1;
    let url = dataMap.remindPass + '/changePass';
    let query = {password: newPassword, token: this.props.match.params.token};
    fetchData(url, 'post', query)
      .then(res => res.json())
      .then(json => {
        this.props.setMsg(json)
      })
      .then(() =>
        setTimeout(() => (this.props.history.push('/login')), 5000))
  }


  validateRegData() {
    let {password1, password2} = this.state;

    if (!(password1 && password2)) {
      return {errMsg: 'All fields must be filled in', validated: false}
    }
    else if (/ /ig.test(password1)) return {errMsg: 'Password can not contain spaces', validated: false};
    else if (password1 !== password2) {
      return {errMsg: 'Passwords are not the same in both fields', validated: false}
    }
    else return {errMsg: '', validated: true}

  }

  render() {
    const {messageOk, regState} = this.props;
    const {password1, password2} = this.state;
    return (
      <Fragment>
        {messageOk.message ?
          <div className="register-box">
            <div className="register-message">
              <p className="success-msg-p">{messageOk.message}</p>
            </div>
          </div>
          :
          <div className="register-box">
            <div className="login-box-header">
              <p className="login-box-header-center">Set up new password:</p>
            </div>
            <input className="login-input-box" type="password" name="password1" placeholder="New Password"
                   value={password1} onChange={this.handleChange}/>
            <input className="login-input-box" type="password" name="password2" placeholder="Confirm Password"
                   value={password2} onChange={this.handleChange}/>
            <input className="btn login-btn" type="button" value="Change password"
                   onClick={this.handleSubmit}/>
            {(regState.registerError || this.state.errMsg) &&
            <div className="register-message">
              <p className="err-msg-p">
                {this.state.errMsg ||
                (regState.registerError && regState.registerError.message)}
              </p>
            </div>}

          </div>}
      </Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMsg: (json) => {
      dispatch(setRegisterData(json))
    },
    setErrMessage: (msg) => dispatch(setRegisterError({success: false, message: msg}))
  }
};

const mapStateToProps = (state) => {
  return {
    messageOk: state.userReducer.message,
    regState: state.userReducer
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePass);