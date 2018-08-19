import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import events from './events'
import eventsPage from './eventsPage'
import eventPage from './eventPage'
import basket from './basket'
import categories from './categories'

export default combineReducers({
  routing: routerReducer,
  events,
  eventsPage,
  eventPage,
  basket,
  categories
})