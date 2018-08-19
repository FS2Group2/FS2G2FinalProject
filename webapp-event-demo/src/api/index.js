import R from 'ramda'
import request from 'superagent'

import events from './mockEvents'
import categories from './mockCategories'

/*export const fetchEvents = async () => {
  const {body} = await request.get(
    'http://www.mocky.io/'
  )
  return body.events
}*/


export const fetchEvents = async () => {
    return new Promise(resolve => {
        resolve(events)
    })
}


export const loadMoreEvents = async ({offset}) => {
  return new Promise(resolve => {
    resolve(events)
  })
}

export const fetchEventById = async (id) => {
  return new Promise((resolve, reject) => {
    const event = R.find(R.propEq('id', id), events)
    resolve(event)
  })
}

export const fetchCategories = async () => {
  return new Promise((resolve, reject) => {
    resolve(categories)
  })
}
