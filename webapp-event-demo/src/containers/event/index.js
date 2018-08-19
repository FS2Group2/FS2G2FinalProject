import React, {Component} from 'react'
import {connect} from 'react-redux'
import R from 'ramda'
import {Link} from 'react-router'

import {getEventById} from '../../selectors'
import {fetchEventById, addEventToBasket} from '../../actions'
import BasketCart from '../../components/basketCart'

class Event extends Component {
  componentDidMount () {
    this.props.fetchEventById(this.props.params.id)
  }

  renderFields () {
    const {event} = this.props
    const columnFields = R.compose(
      R.toPairs,
      R.pick([
        'city',
        'owner',
        'duration',
        'date'
      ])
    )(event)

    return columnFields.map(([key, value]) => (
      <div className='column' key={key}>
        <div className='ab-details-title'>
          <p>{key}</p>
        </div>
        <div className='ab-details-info'>
          {value}
        </div>
      </div>
    ))
  }

  renderContent () {
    const {event} = this.props

    return (
      <div className='thumbnail'>
        <div className='row'>
          <div className='col-md-6'>
            <img
              className='img-thumbnail'
              src={event.image}
              alt={event.name}
            />
          </div>
          <div className='col-md-6'>
            {this.renderFields()}
          </div>
        </div>
        <div className='caption-full'>
          <h4 className='pull-right'>${event.price}</h4>
          <h4>{event.name}</h4>
          <p>{event.e_info}</p>
        </div>
      </div>
    )
  }

  renderSidebar () {
    const {event, addEventToBasket} = this.props
    return (
      <div>
        <p className='lead'>Quick shop</p>
        <BasketCart />
        <div className='form-group'>
          <h1>{event.name}</h1>
          <h2>${event.price}</h2>
        </div>
        <Link to='/' className='btn btn-info btn-block'>Back to store</Link>
        <button
          type='button'
          className='btn btn-success btn-block'
          onClick={() => addEventToBasket(event.id)}
        >
          Add to cart
        </button>
      </div>
    )
  }

  render () {
    const {event} = this.props
    return (
      <div className='view-container'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-9'>
              {event && this.renderContent()}
            </div>
            <div className='col-md-3'>
              {event && this.renderSidebar()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    event: getEventById(state, state.eventPage.id)
  }
}

const mapDispatchToProps = {
  fetchEventById,
  addEventToBasket
}

export default connect(mapStateToProps, mapDispatchToProps)(Event)
