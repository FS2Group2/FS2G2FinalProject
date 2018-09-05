import {combineReducers} from 'redux';
import eventReducer from './eventReducer';
import userReducer from "./userReducer";
import wishListReducer from "./wishListReducer"
import purchaseReducer from "./purchaseReducer"

const reducer = combineReducers({
  eventReducer,
  userReducer,
  wishListReducer,
  purchaseReducer,
});

export default reducer;
