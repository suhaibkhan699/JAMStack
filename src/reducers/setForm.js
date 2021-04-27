const setFormReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_FORM_DATA":
      state = action.payload;
      return state;
    default:
      return state;
  }
};

export default setFormReducer;
