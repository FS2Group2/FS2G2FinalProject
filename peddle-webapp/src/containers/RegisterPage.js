import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import '../css/Register.css'
import {fetchRegister} from "../actions/userActions";
import {connect} from "react-redux";


class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    let registrationData = {
      name: name,
      email: email,
      password: password1
    };
    event.preventDefault();
    this.props.sendRegistrationData(registrationData)
  };

  render() {
    const {regState} = this.props;
    let {name, email, password1, password2} = this.state;

    return (
      <Fragment>
        {regState.message.success ? <div className="register-box">
            <div className="register-message">
              <p className="success-msg-p">{regState.message.message}</p>
            </div>
          </div> :
          <div className="register-box">
            <div className="register-box-header">
              <p className="register-box-header-left">Sign Up</p>
            </div>
            <input className="register-input-box" type="text" name="name" placeholder="You Name"
                   value={name} onChange={this.handleChange}/>
            <input className="register-input-box" type="email" name="email" placeholder="Email"
                   value={email} onChange={this.handleChange}/>
            <input className="register-input-box" type="password" name="password1" placeholder="Choose Password"
                   value={password1} onChange={this.handleChange}/>
            <input className="register-input-box" type="password" name="password2" placeholder="Confirm Password"
                   value={password2} onChange={this.handleChange}/>
            <input className="reg-btn" type="button" value="Register"
                   onClick={this.handleSubmit}/>
            {(regState.registerError || regState.message.success) && <div className="register-message">
              <p className="err-msg-p">{regState.registerError.massage || regState.registerError.message ||
              regState.message.message}</p>
            </div>}
            <Link to="/login" className="register-login-link">Login</Link>
          </div>}
      </Fragment>

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
      sendRegistrationData: (registrationData) => dispatch(fetchRegister(registrationData))
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);