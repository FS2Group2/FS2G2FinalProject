import React, { Component } from 'react';
import '../styles/Recoverys.css';

class Recovery extends Component {
    render() {
        return(
            <div className="Recovery-bg">
                <h2 className="Recovery-head">Forgot password</h2>
                <div className="Recovery-form">
                     <form>
                    <input type="email" className="Recovery-field" placeholder="emailKK" /><br/>
                    <input type="submit" className="Recovery-btn" value="Send password" />
                     </form>
                </div>
            </div>
        );
    }
}
export default Recovery;