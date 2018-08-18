import {createStore, combineReducers, applyMiddleware} from 'redux'
// import {reducer as formReducer} from 'redux-form'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'

// const reducers = {
//   choosenAlbum,
//   form: formReducer
// }
// const reducer = combineReducers(reducers)
// const store = createStore(rootReducer);
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
