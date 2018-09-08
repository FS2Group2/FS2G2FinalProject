import {CHOSEN_EVENT} from "../actions/actionsTypes";

const initialState = {
   event: ''
};

function eventReducer(state = initialState, action) {
  switch (action.type) {
    case CHOSEN_EVENT:
      return action.eventId;
    default:
      return state;
  }
}

export default eventReducer;