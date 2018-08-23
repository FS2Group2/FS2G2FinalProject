import React, { Component } from 'react';
import '../styles/Registers.css';


class Register extends Component {
    render(){
        return(
            <div className="Register-bg">
                <h2 className="Register-head">Register</h2>
                <div className="Register-form">
                    <form>
                        <input type="text" className="Register-field" placeholder="Enter your Name"/><br/>
                        <input type="text" className="Register-field" placeholder="Enter your Surname"/><br/>
                        <input type="text" className="Register-field" placeholder="Enter your @userame"/><br/>
                        <input type="password" className="Register-field" placeholder="Enter your Password"/><br/>
                        <input type="text" className="Register-field" placeholder="Re-enter your Password"/><br/>
                        <input type="submit" className="Register-reg-btn" value="Create Account"/>
                    </form>
                </div>
            </div>
        );
    }
}
export default Register;