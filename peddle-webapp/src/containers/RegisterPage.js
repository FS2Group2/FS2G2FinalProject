import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import '../css/loginPage.css';


class RegisterPage extends Component {
    render(){
        return(
            <div className="login-box">
                <div className="main-box-header">
                    <div className="main-box-stick"></div>
                    <p className="main-box-header-left">Sign Up</p>
                    <Link to="/login">Login</Link>
                </div>
                <input className="input-box" type="text" name="login" placeholder="You Name"/>
                       {/*value={this.state.login} onChange={this.onLoginChange}/>*/}
                <input className="input-box" type="email" name="Email" placeholder="Email"/>
                <input className="input-box" type="password" name="pass1" placeholder="Choose Password"/>
                <input className="input-box" type="password" name="pass2" placeholder="Confirm Password"/>
                       {/*// value={this.state.password} onChange={this.onPasswordChange}/>*/}
                <input className="button-create" type="button" value="Register"/>
                       {/*// onClick={this.goLogin} />*/}
            </div>
        )
    }
}

export default RegisterPage;