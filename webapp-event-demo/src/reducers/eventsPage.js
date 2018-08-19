import R from 'ramda'

import {
  FETCH_EVENTS_SUCCESS,
  LOAD_MORE_EVENTS_SUCCESS,
  SEARCH_EVENT
} from '../actionTypes'

const initialState = {
  ids: [],
  search: ''
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_EVENTS_SUCCESS:
      return R.merge(state, {
        ids: R.pluck('id', payload)
      })
    case LOAD_MORE_EVENTS_SUCCESS:
      const ids = R.pluck('id', payload)
      return R.merge(state, {
        ids: R.concat(ids, state.ids)
      })
    case SEARCH_EVENT:
      return R.merge(state, {
        search: payload
      })

    default:
      return state
  }
}