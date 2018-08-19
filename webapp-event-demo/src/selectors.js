import R from 'ramda'

export const getEventById = (state, id) => R.prop(id, state.events)

export const getEvents = (state, ownProps) => {
  const activeCategoryId = getActiveCategoryId(ownProps)
  const applySearch = item => R.contains(
    state.eventsPage.search,
    R.prop('name', item)
  )
  const applyCategory = item => R.equals(
    activeCategoryId,
    R.prop('categoryId', item)
  )

  const events = R.compose(
    R.filter(applySearch),
    R.when(R.always(activeCategoryId), R.filter(applyCategory)),
    R.map(id => getEventById(state, id))
  )(state.eventsPage.ids)

  return events
}

export const getRenderedEventsLength = state => R.length(state.eventsPage.ids)

export const getTotalBasketCount = state => R.length(state.basket)

export const getTotalBasketPrice = state => {
  const totalPrice = R.compose(
    R.sum,
    R.pluck('price'),
    R.map(id => getEventById(state, id))
  )(state.basket)

  return totalPrice
}

export const getCategories = state => R.values(state.categories)

export const getActiveCategoryId = ownProps => R.path(['params', 'id'], ownProps)

export const getBasketEventsWithCount = state => {
  const eventCount = id => R.compose(
    R.length,
    R.filter(basketId => R.equals(id, basketId))
  )(state.basket)
  const eventWithCount = event => R.assoc('count', eventCount(event.id), event)

  const uniqueIds = R.uniq(state.basket)
  const events = R.compose(
    R.map(eventWithCount),
    R.map(id => getEventById(state, id))
  )(uniqueIds)

  return events
}
