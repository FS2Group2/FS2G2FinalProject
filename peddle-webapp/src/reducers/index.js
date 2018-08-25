import {combineReducers} from 'redux';
import eventReducer from './eventReducer';
import userReducer from "./userReducer";

const reducer = combineReducers({
  eventReducer,
  userReducer
});

export default reducer;
