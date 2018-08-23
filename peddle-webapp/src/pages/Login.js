import React, { Component } from 'react';
import '../styles/Logins.css';

class Login extends Component {
    render() {
        return (
            <div className= "Login-bg">
                <h2 className="Login-head">Log In</h2>
                <div className= "Login-form">
                <form>
                    <input type="text" className="Login-field" placeholder="@username" /><br/>
                    <input type="password" className="Login-field" placeholder="password" /><br/>
                    <input type="submit" className="Login-log_btn" value="Log In" /><br/>
                    <button className="Login-reg_btn">Register</button>
                    <p className="Login-txt">Lost your password?</p>
                </form>
                </div>
            </div>
        );
    }
}
export default Login;