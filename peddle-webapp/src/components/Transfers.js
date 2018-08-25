import React, {Component} from 'react';

class Transfers extends Component {
  render() {
    const {cityFrom, cityTo} = this.props;
    return (
        <div>
          <p className='container-header-p'>Transfer from {cityFrom} to {cityTo}</p>
        </div>
    )
  }


}

export default Transfers;