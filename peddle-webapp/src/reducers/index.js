import {combineReducers} from 'redux';
import eventReducer from './eventReducer';
import userReducer from "./userReducer";
import wishListReducer from "./wishListReducer"

const reducer = combineReducers({
  eventReducer,
  userReducer,
  wishListReducer
});

export default reducer;
