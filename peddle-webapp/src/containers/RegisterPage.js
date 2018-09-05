import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import  '../css/Register.css'


class RegisterPage extends Component {
    render(){
        return(
            <div className="register-box">
                <div className="register-box-header">
                    <p className="register-box-header-left">Sign Up</p>
                </div>
                <input className="register-input-box" type="text" name="login" placeholder="You Name"/>
                       {/*value={this.state.login} onChange={this.onLoginChange}/>*/}
                <input className="register-input-box" type="email" name="Email" placeholder="Email"/>
                <input className="register-input-box" type="password" name="pass1" placeholder="Choose Password"/>
                <input className="register-input-box" type="password" name="pass2" placeholder="Confirm Password"/>
                       {/*// value={this.state.password} onChange={this.onPasswordChange}/>*/}
                <input className="reg-btn" type="button" value="Register"/>
                       {/*// onClick={this.goLogin} />*/}
                <Link to="/login" className="register-login-link">Login</Link>
            </div>
        )
    }
}

export default RegisterPage;