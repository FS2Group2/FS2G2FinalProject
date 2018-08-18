import React, {Component} from 'react';
import '../css/footer.css';

class AppFooter extends Component{
  render(){
    return(
        <div className='footer'>
          <div className='copyright'>
            <p className='copyright-p'>Copyrigth FS2 Dan.IT Education.2018</p>
          </div>
        </div>
    );
  }
}

export default AppFooter;