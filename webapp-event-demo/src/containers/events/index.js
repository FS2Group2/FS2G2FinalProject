import React, {Component} from 'react'
import {connect} from 'react-redux'
import R from 'ramda'
import {Link} from 'react-router'

import {
  fetchEvents,
  loadMoreEvents,
  addEventToBasket,
  fetchCategories
} from '../../actions'
import {getEvents} from '../../selectors'

class Events extends Component {
  componentDidMount () {
    this.props.fetchEvents()
    this.props.fetchCategories()
  }

  renderEvent (event, index) {
    const {addEventToBasket} = this.props
    const shortDescription = `${R.take(60, event.e_info)}...`

    return (
      <div className='col-sm-4 col-lg-4 col-md-4 book-list' key={index}>
        <div className='thumbnail'>
          <img
            className='img-thumbnail'
            src={event.image}
            alt={event.name}
          />
          <div className='caption'>
            <h4 className='pull-right'>${event.price}</h4>
            <h4>
              <Link to={`/events/${event.id}`}>
                {event.name}
              </Link>
            </h4>
            <p>{shortDescription}</p>
            <p className='itemButton'>
              <button
                className='btn btn-primary'
                onClick={() => addEventToBasket(event.id)}
              >
                  Order Now!
              </button>
              <Link
                to={`/events/${event.id}`}
                className='btn btn-default'
              >
                More info
              </Link>
            </p>
          </div>
        </div>
      </div>
    )
  }


  render () {
    const {events, loadMoreEvents} = this.props
    return (
      <div>
        <div className='books row'>
          {events.map((event, index) => this.renderEvent(event, index))}
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <button
              onClick={loadMoreEvents}
              className='pull-right btn btn-primary'
            >
              Load More
            </button>
          </div>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    events: getEvents(state, ownProps)
  }
}

const mapDispatchToProps = {
  fetchEvents,
  loadMoreEvents,
  addEventToBasket,
  fetchCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)
