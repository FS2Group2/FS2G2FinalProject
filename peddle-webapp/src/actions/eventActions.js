import {CHOSEN_EVENT} from "./actionsTypes";

export function chooseEvent(eventId) {
  return{
    type: CHOSEN_EVENT, eventId
  }

}