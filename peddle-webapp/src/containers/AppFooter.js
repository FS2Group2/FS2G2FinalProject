import React, {Component} from 'react';
import '../css/footer.css';
import {Link} from "react-router-dom";

class AppFooter extends Component{
  render(){
    return(
        <div className='footer'>
          <Link className="footer-link" to={'/about'}>About project</Link>
          <div className='copyright'>
            <p className='copyright-p'>Copyrigth FS2 Dan.IT Education.2018</p>
          </div>
        </div>
    );
  }
}

export default AppFooter;