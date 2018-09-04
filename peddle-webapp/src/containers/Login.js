import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import  '../css/Login.css'
import dataMap from "../constants/ApiSettings";

class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
        isLoaded: false,
        submitted: false,
        userId: 0,
        username: '',
        password: '',
        userInf: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
      const { name, value } = event.target;
      this.setState({ [name]: value });
  }

  handleSubmit(event) {
      event.preventDefault();
      this.setState({ submitted: true });
//      const { username, password } = this.state;
//      this.findUser()
  };

closeWarning() {
    let close = document.getElementsByClassName("warn-close");
    let i;

    for (i = 0; i < close.length; i++) {
        // When someone clicks on a close button
        close[i].onclick = function(){
            let div = this.parentElement;
            div.style.opacity = "0";
            setTimeout(function(){ div.style.display = "none"; }, 600);
        }
    }
}
  findUser() {
      let loginHeader = new Headers();
      loginHeader.append("Content-Type", "application/JSON");
      let query = {
          name: this.state.username,
          password: this.state.password
      };
      let reqParam = {
          method: 'POST',
          headers: loginHeader,
          body: JSON.stringify(query)
      };
      const url = dataMap.user;
      console.log('request params:' + JSON.stringify(reqParam));
      fetch(url, reqParam)
          .then(res => res.json())
          .then(
              (result) => {
                  this.setState({
                      isLoaded: true,
                      userInf: result
                  })
              },

              (error) => {
                  this.setState({
                      isLoaded: true,
                      error
                  })
              });

      console.log(this.state.userInf.name);
  };


  render(){
      const { username, password, submitted } = this.state;
      return(
          <div>
          <div className="login-box">
            <div className="login-box-header">
              <p className="login-box-header-left">Log In</p>
            </div>
            <input className="login-input-box" type="text" name="username" placeholder="Your Name"
                 value={username} onChange={this.handleChange}/>
              {submitted && !username &&
              <div className="login-help-block">
                  <p className="warning-text">Username is required</p>
                  <span className="warn-close"  onClick={this.closeWarning}>&times;</span>
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
            <input className="login-btn" type="button" value="Login" onClick={this.handleSubmit} />
              <Link to="/register" className="login-reg-link">Sign Up</Link>
          </div>
          </div>
      )
  }
}

export default Login;