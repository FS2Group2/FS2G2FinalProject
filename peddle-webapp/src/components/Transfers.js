import React, {Component} from 'react';

class Transfers extends Component{
  render(){
    const transferHeader = this.props.transferHeader;
    return(
        <div>
<p className='container-header-p'>{transferHeader}</p>
        </div>
    )
  }



}
export default Transfers;