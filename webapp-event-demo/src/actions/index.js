import {
  FETCH_EVENTS_START,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE,
  LOAD_MORE_EVENTS_START,
  LOAD_MORE_EVENTS_SUCCESS,
  LOAD_MORE_EVENTS_FAILURE,
  FETCH_EVENT_BY_ID_START,
  FETCH_EVENT_BY_ID_SUCCESS,
  FETCH_EVENT_BY_ID_FAILURE,
  ADD_EVENT_TO_BASKET,
  SEARCH_EVENT,
  FETCH_CATEGORIES_START,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  REMOVE_EVENT_FROM_BASKET,
  CLEAN_BASKET
} from '../actionTypes'
import {getRenderedEventsLength} from '../selectors'
import {
  fetchEvents as fetchEventsApi,
  loadMoreEvents as loadMoreEventsApi,
  fetchEventById as fetchEventByIdApi,
  fetchCategories as fetchCategoriesApi,
} from '../api'

export const fetchEvents = () => async dispatch => {
  dispatch({type: FETCH_EVENTS_START})

  try {
    const events = await fetchEventsApi()
    dispatch({
      type: FETCH_EVENTS_SUCCESS,
      payload: events
    })
  } catch (err) {
    dispatch({
      type: FETCH_EVENTS_FAILURE,
      payload: err,
      error: true
    })
  }
}

export const loadMoreEvents = () => async (dispatch, getState) => {
  const offset = getRenderedEventsLength(getState())

  dispatch({type: LOAD_MORE_EVENTS_START})

  try {
    const events = await loadMoreEventsApi({offset})
    dispatch({
      type: LOAD_MORE_EVENTS_SUCCESS,
      payload: events
    })
  } catch (err) {
    dispatch({
      type: LOAD_MORE_EVENTS_FAILURE,
      payload: err,
      error: true
    })
  }
}

export const fetchEventById = (id) => async dispatch => {
  dispatch({type: FETCH_EVENT_BY_ID_START})

  try {
    const event = await fetchEventByIdApi(id)
    dispatch({
      type: FETCH_EVENT_BY_ID_SUCCESS,
      payload: event
    })
  } catch (err) {
    dispatch({
      type: FETCH_EVENT_BY_ID_FAILURE,
      payload: err,
      error: true
    })
  }
}

export const addEventToBasket = id => dispatch => {
  dispatch({
    type: ADD_EVENT_TO_BASKET,
    payload: id
  })
}

export const searchEvent = (text) => dispatch => {
  dispatch({
    type: SEARCH_EVENT,
    payload: text
  })
}

export const fetchCategories = () => async dispatch => {
  dispatch({type: FETCH_CATEGORIES_START})

  try {
    const events = await fetchCategoriesApi()
    dispatch({
      type: FETCH_CATEGORIES_SUCCESS,
      payload: events
    })
  } catch (err) {
    dispatch({
      type: FETCH_CATEGORIES_FAILURE,
      payload: err,
      error: true
    })
  }
}

export const removeEventFromBasket = id => async dispatch => {
  dispatch({
    type: REMOVE_EVENT_FROM_BASKET,
    payload: id
  })
}

export const cleanBasket = () => dispatch => {
  dispatch({
    type: CLEAN_BASKET
  })
}


export const basketCheckout = events => () => {
  alert(JSON.stringify(events))
}