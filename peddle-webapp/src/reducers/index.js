import {combineReducers} from 'redux';
import eventReducer from './eventReducer';
import userReducer from "./userReducer";
import wishListReducer from "./wishListReducer"
import fillListsReducer from "./fillListsReducer";
import transferReducer from "./transferReducer";

const reducer = combineReducers({
  eventReducer,
  userReducer,
  wishListReducer,
  fillListsReducer,
  transferReducer
});

export default reducer;
