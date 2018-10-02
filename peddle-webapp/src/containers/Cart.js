import React, {Component} from 'react';
import PurchaseSummary from "../components/PurchaseSummary";

class Cart extends Component{
  render(){
    return(
      <div className='page-content'>
        <PurchaseSummary/>
      </div>
    )
  }
}

export default Cart;