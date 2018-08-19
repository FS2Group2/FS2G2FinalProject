import R from 'ramda'

import {
  ADD_EVENT_TO_BASKET,
  REMOVE_EVENT_FROM_BASKET,
  CLEAN_BASKET
} from '../actionTypes'

const initialState = []

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case ADD_EVENT_TO_BASKET:
      return R.append(payload, state)
    case REMOVE_EVENT_FROM_BASKET:
      return R.without(R.of(payload), state)
    case CLEAN_BASKET:
      return []
    default:
      return state
  }
}
