import {
  ADD_ACCOMMODATION_TO_CART,
  ADD_EVENT_TO_CART,
  ADD_TRANSFER_FROM_EVENT_TO_CARD,
  ADD_TRANSFER_TO_EVENT_TO_CART
} from "../actions/actionsTypes";

const initialState = {
  purchasedEvent: {},
  purchasedAccommodation: {},
  purchasedTransferTo: {},
  purchasedTransferFrom: {}
};

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_EVENT_TO_CART:
      return {...state, purchasedEvent: action.payload};
    case ADD_ACCOMMODATION_TO_CART:
      return {...state, purchasedAccommodation: action.payload};
    case ADD_TRANSFER_TO_EVENT_TO_CART:
      return {...state, purchasedTransferTo: action.payload};
    case ADD_TRANSFER_FROM_EVENT_TO_CARD:
      return {...state, purchasedTransferFrom: action.payload};
    default:
      return state;
  }
}

export default cartReducer;