import React, {Component} from 'react';
import '../css/message.css';

class Message extends Component {
  render() {
    const message = this.props.message;
    return (
      <div className={'message-container'}>
        <div>
          <p className={"message-p"}>{message}</p>
        </div>
      </div>
    )

  }
}

export default Message;