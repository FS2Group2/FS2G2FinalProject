import React, {Component} from 'react';
import '../css/Register.css'
import {setRegisterData, setRegisterError} from "../actions/userActions";
import {connect} from "react-redux";
import {fetchData} from "../components/fetchData";
import dataMap from "../constants/ApiSettings";


class ForgotPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: false,
      errMsg: '',
      email: '',
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
    this.validateRegData().validated ? this.remindPassQuery() : setErrMessage(this.validateRegData().errMsg)
  };

  remindPassQuery() {
    const email = this.state.email;
    fetchData(dataMap.remindPass, 'post', {email: email})
      .then(res => res.json())
      .then(json => {
        this.props.setMsg(json)
      })
      .then(() =>
        {setTimeout(()=>(this.props.history.push('/login')),2500);
          setTimeout(()=>(this.props.setMsg({message: ''})),2500)}
      )
  }

  validateRegData() {
    let {email} = this.state;

    if (!(email)) {
      return {errMsg: 'Empty email!', validated: false}
    }
    else if (/ /ig.test(email)) return {errMsg: 'Email can not contain spaces', validated: false};
    else return {errMsg: '', validated: true}

  }

  render() {
    const {regState} = this.props;
    let {email} = this.state;

    return (
      <div>
        {regState.message.message ? <div className="register-box">
            <div className="register-message">
              <p className="success-msg-p">{regState.message.message}</p>
            </div>
          </div> :
          <div className="login-box">
            <div className="login-box-header">
              <p className="login-box-header-center">Password recovery</p>
            </div>
            <label htmlFor="email" className={'login-input-label forgot-msg'}>Enter the email address you
              registered:</label>
            <input className="login-input-box" type="email" name="email" id='email' placeholder="Email"
                   value={email} onChange={this.handleChange}/>

            <input className="btn login-btn" type="button" value="Remind password"
                   onClick={this.handleSubmit}/>
            {(regState.registerError || this.state.errMsg) &&
            <div className="register-message">
              <p className="err-msg-p">{this.state.errMsg || regState.message.message ||
              regState.registerError.message
              }</p>
            </div>}
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
      // sendRegistrationData: (registrationData) => dispatch(fetchRegister(registrationData)),
      setMsg: (json) => {dispatch(setRegisterData(json))},
      setErrMessage: (msg) => dispatch(setRegisterError({success: false, message: msg}))
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPass);