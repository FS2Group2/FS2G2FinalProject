import React from 'react'
import {connect} from 'react-redux'
import R from 'ramda'
import {Link} from 'react-router'

import {
  getTotalBasketPrice,
  getBasketEventsWithCount,
} from '../../selectors'

import {
  removeEventFromBasket,
  basketCheckout,
  cleanBasket
} from '../../actions'

const Basket = ({
  events,
  totalPrice,
  basketCheckout,
  removeEventFromBasket,
  cleanBasket
}) => {
  const isBasketEmpty = R.isEmpty(events)

  const renderContent = () => {
    return (
      <div>
        {isBasketEmpty && <div>Your shopping cart is empty</div>}

        <div className='table-responsive'>
          <table className='table-bordered table-striped table-condensed cf'>
            <tbody>
            {events.map((event, index) => (
              <tr
                key={index}
                className='item-checout'
              >
                <td className='first-column-checkout'>
                  <img
                    className='img-thumbnail'
                    src={event.image}
                    alt={event.name}
                  />
                </td>
                <td>{event.name}</td>
                <td>${event.price}</td>
                <td>{event.count}</td>
                <td>
                    <span
                      className='delete-cart'
                      onClick={() => removeEventFromBasket(event.id)}
                    />
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        {
          R.not(isBasketEmpty) &&
          <div className='row'>
            <div className='pull-right total-user-checkout'>
              <b>Total:</b>
              ${totalPrice}
            </div>
          </div>
        }
      </div>
    )
  }

  const renderSidebar = () => (
    <div>
      <Link
        className='btn btn-info'
        to='/'
      >
        <span className='glyphicon glyphicon-info-sign'/>
        <span>Continue shopping!</span>
      </Link>
      {
        R.not(isBasketEmpty) &&
        <div>
          <button
            onClick={cleanBasket}
            className='btn btn-danger'
          >
            <span className='glyphicon glyphicon-trash' />
            Clear cart
          </button>
          <button
            className='btn btn-success'
            onClick={() => basketCheckout(events)}
          >
            <span className='glyphicon glyphicon-envelope' />
            Checkout
          </button>
        </div>
      }
    </div>
  )


  return (
    <div className='view-container'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-9'>
            {renderContent()}
          </div>
          <div className='col-md-3 btn-user-checkout'>
            {renderSidebar()}
          </div>
        </div>
      </div>
    </div>
  )

}

const mapStateToProps = state => {
  return {
    events: getBasketEventsWithCount(state),
    totalPrice: getTotalBasketPrice(state)
  }
}

const mapDispatchToProps = {
  basketCheckout,
  removeEventFromBasket,
  cleanBasket

}

export default connect(mapStateToProps, mapDispatchToProps)(Basket)

