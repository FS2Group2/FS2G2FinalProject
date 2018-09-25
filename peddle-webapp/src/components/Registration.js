import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {setRegisterData} from "../actions/userActions";
import {fetchData} from "./fetchData";
import dataMap from "../constants/ApiSettings";

class Registration extends Component {
  componentDidMount() {
    const token = this.props.match.params.token;
    if (token) {
      fetchData(dataMap.registrationConfirm + token, 'get', '')
        .then(res => res.json())
        .then(json => {
          this.props.setMsg(json)
        })
        .then(()=>
        setTimeout(()=>(this.props.history.push('/login')),2500))
    }
  }

  render() {
    const {message} = this.props;
    return (
      <Fragment>
        {message.success ?
          <div className="register-box">
            <div className="register-message">
              <p className="success-msg-p">{message.message}</p>
            </div>
          </div>
          :
          <div className="register-box">
            <div className={'register-message'}>
              <p className="err-msg-p">{message.message}</p>
            </div>
          </div>}
      </Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMsg: (json) => {
      dispatch(setRegisterData(json))
    }
  }
};

const mapStateToProps = (state) => {
  return {
    message: state.userReducer.message,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);