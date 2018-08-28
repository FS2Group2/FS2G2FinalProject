import {USER_LOGIN} from "../actions/actionsTypes";

const initialState = {
  id: '1',
  name: 'Huan Antonio Samaranch',
  email: 'hoolio@gmail.com',
  cityName: 'Kyiv',
  profilePhoto: '1.jpg',
  profileInfo: 'Very old man with glasses on the head'
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {user: action.data};
    default:
      return state;
  }
}

export default userReducer;