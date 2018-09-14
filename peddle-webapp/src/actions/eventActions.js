import {CHOSEN_EVENT, LOAD_EVENTS} from "./actionsTypes";

export function chooseEvent(eventId) {
  return{
    type: CHOSEN_EVENT, eventId
  }
}

export function loadEvents(events) {
  return{ type: LOAD_EVENTS, payload: events}
}