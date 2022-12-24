const initialValue = {
  lsUsers: [],
  user: [],
  errLogin: false,
};

const rdcUser = (state = initialValue, { type, payload }) => {
  switch (type) {
    case "GET_USERS": {
      return {
        ...state,
        lsUsers: payload,
      };
    }
    case "SET_USER": {
      return {
        ...state,
        user: payload,
      };
    }
    case "CLEAR_USER": {
      return {
        ...state,
        user: [],
      };
    }
    case "ERROR_LOGIN": {
      return {
        ...state,
        errLogin: payload,
      };
    }

    default:
      return state;
  }
};

export default rdcUser;
