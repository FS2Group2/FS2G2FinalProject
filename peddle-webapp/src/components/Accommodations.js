import React, {Component} from 'react';

class Accommodations extends Component {

  render() {
    const {accommodations, addA} = this.props;
    return (
        <div>
          <p className='container-header-p'>Accommodations in {this.props.city}:</p>

          {accommodations.map(accommodation =>
              <div key={accommodation.id} className='accommodation-item'>
                <div className='accommodation-item-hotel'>
                  <p className='accommodation-item-hotel'><span
                      className='accommodation-item-header'>Hotel: </span>{accommodation.name}</p>
                </div>
                <div className='accommodation-item-price'>
                  <p><span className='accommodation-item-header'>price: </span>${accommodation.price}</p>
                </div>
                <div className='accommodation-item-min-time'>
                  <p><span className='accommodation-item-header'>duration: </span>{accommodation.minOrderTime} hours</p>
                </div>
                <input type="button" className='btn purchase-btn' value='add to cart'
                       onClick={() => addA(accommodation)}/>
              </div>
          )}

        </div>
    )
  }

}

export default Accommodations;