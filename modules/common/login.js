import { takeLatest } from "redux-saga/effects";
import createRequestSage from "../createRequestSaga";
import { authPhoneNumber } from "/API/common/login";

/**Actions */
const GET_AUTH_NUMBER = "phone/GET_AUTH_NUMBER";
const GET_AUTH_NUMBER_SUCCESS = "phone/GET_AUTH_NUMBER_SUCCESS";
const GET_AUTH_NUMBER_FAILURE = "phone/GET_AUTH_NUMBER_FAILURE";
const AUTH_DONE = "phone/AUTH_DONE";

/**Action function */
export const getAuthNumber = (userName, userPhone) => {
  return {
    type: GET_AUTH_NUMBER,
    payload: {
      userName: userName,
      userPhone: userPhone
    }
  };
};

export const checkAuth = () => {
  return {
    type: AUTH_DONE
  };
};

/**Saga */
const authPhonNumberSage = createRequestSage(GET_AUTH_NUMBER, authPhoneNumber);

export function* loginSaga() {
  yield takeLatest(GET_AUTH_NUMBER, authPhonNumberSage);
}

let initialState = {
  inAuth: false,
  authNumber: "",
  authDone: false,
  error: ""
};

/**Reducer */
const Logins = (state = initialState, action) => {
  switch (action.type) {
    case GET_AUTH_NUMBER_SUCCESS:
      return { ...state, authNumber: action.payload.authNumber, inAuth: true };
    case GET_AUTH_NUMBER_FAILURE:
      return { ...state, error: action.payload.error };
    case AUTH_DONE:
      return { ...state, authDone: true, inAuth: false };
    default:
      return state;
  }
};

export default Logins;
