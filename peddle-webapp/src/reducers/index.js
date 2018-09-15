import {combineReducers} from 'redux';
import eventReducer from './eventReducer';
import userReducer from "./userReducer";
import wishListReducer from "./wishListReducer"
import purchaseReducer from "./purchaseReducer"
import fillListsReducer from "./fillListsReducer";
import transferReducer from "./transferReducer";
import fetchDataReducer from "./fetchDataReducer";

const reducer = combineReducers({
  eventReducer,
  userReducer,
  wishListReducer,
  purchaseReducer,
  fillListsReducer,
  transferReducer,
  fetchDataReducer
});

export default reducer;
