export default (rootReducer = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return rootReducer + 1;
    case 'DECREMENT':
      return rootReducer - 1;
    default:
      return rootReducer
  }
}
