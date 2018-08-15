import React, {Component} from 'react';
import '../css/notFound.css';

class PageNotFound extends Component {
  render() {
    return (
        <div className="not-found">
          <h2 className="not-found-h2">Oops..</h2>
          <p className="not-found-p">
            We searched, searched, searched ...<br/> but could not find this page :(
          </p>
          <img className="not-found-img" src='./img/missing.png' alt="..and even the pictures did not find"/>
        </div>

    );
  }
}

export default PageNotFound;