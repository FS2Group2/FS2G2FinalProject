import {combineReducers} from 'redux';
import eventReducer from './eventReducer';
import userReducer from "./userReducer";
import wishListReducer from "./wishListReducer"
import purchaseReducer from "./purchaseReducer"
import fillListsReducer from "./fillListsReducer";
import transferReducer from "./transferReducer";
import fetchDataReducer from "./fetchDataReducer";
import filterReducer from "./filterReducer";
import cartReducer from "./cartReducer";
import accommodationReducer from "./accommodationReducer";

const reducer = combineReducers({
  eventReducer,
  userReducer,
  wishListReducer,
  purchaseReducer,
  fillListsReducer,
  accommodationReducer,
  transferReducer,
  fetchDataReducer,
  filterReducer,
  cartReducer
});

export default reducer;
