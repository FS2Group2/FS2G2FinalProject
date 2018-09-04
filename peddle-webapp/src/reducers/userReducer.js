import {USER_LOGIN} from "../actions/actionsTypes";

const initialState = {
  // id: '0',
  // name: 'Huan Antonio Samaranch',
  // email: 'hoolio@gmail.com',
  // cityName: 'Kyiv',
  // profilePhoto: '1.jpg',
  // profileInfo: 'Very old man with glasses on the head',
  cityId: 1,
  cityName: "Kyiv",
  email: "alex@gmail.com",
  firstName: "First name Alex",
  id: 1,
  lastName: "Last name Alex",
  name: "Alex",
  profileCityLiving: "New Vasiyki",
  profileInfo: "Alex info",
  profilePhoto: "1.jpg",
  roleId: 2,
  roleName: "CUSTOMER"
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {...state, ...action.data};
    default:
      return state;
  }
}

export default userReducer;