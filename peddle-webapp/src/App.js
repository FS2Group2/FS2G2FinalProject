import React, {Component} from 'react';
import './css/App.css';
import MainMenu from './containers/MainMenu';

class App extends Component {
  render() {
    return (
        <div className="App">
          <div className="container">
            <MainMenu/>
          </div>
        </div>
    );
  }
}

export default App;
