import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import '../css/loginPage.css';
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
          <div className="login-box">
            <div className="main-box-header">
              <div className="main-box-stick"></div>
              <p className="main-box-header-left">Log In</p>
              <Link to="/register">Sign Up</Link>
            </div>
            <input className="input-box" type="text" name="username" placeholder="You Name"
                 value={username} onChange={this.handleChange}/>
              {submitted && !username &&
              <div className="help-block">Username is required</div>
              }
            <input className="input-box" type="password" name="password" placeholder="Password"
               value={password} onChange={this.handleChange}/>
              {submitted && !password &&
              <div className="help-block">Password is required</div>
              }
            <input className="button-create" type="button" value="Login" onClick={this.handleSubmit} />
          </div>
      )
  }
}

export default Login;