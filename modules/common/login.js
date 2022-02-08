import { takeLatest } from "redux-saga/effects";
import createRequestSage from "../createRequestSaga";
import { authPhoneNumber } from "/API/common/login";

/**Actions */
const AUTh_INITIALIZE = "phone/INITIALIZE";
const GET_AUTH_NUMBER = "phone/GET_AUTH_NUMBER";
const GET_AUTH_NUMBER_SUCCESS = "phone/GET_AUTH_NUMBER_SUCCESS";
const GET_AUTH_NUMBER_FAILURE = "phone/GET_AUTH_NUMBER_FAILURE";
const EXPIRE_AUTH = "phone/EXPIRE_AUTH";
const AUTH_DONE = "phone/AUTH_DONE";
const SET_AUTH_TYPE = "phone/SET_AUTH_TYPE";

/**Action function */

export const authInitialize = () => {
  return {
    type: AUTh_INITIALIZE,
    payload: {
      authType: "",
      inAuth: false,
      authNumber: "",
      authDone: false,
      inquiryToken: "",
      error: ""
    }
  };
};

export const setAuthType = authType => {
  return {
    type: SET_AUTH_TYPE,
    payload: {
      authType: authType
    }
  };
};

export const expireAuth = () => {
  return {
    type: EXPIRE_AUTH
  };
};

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

console.log("asdfasdfsadf");

/**Saga */
const authPhoneNumberSaga = createRequestSage(GET_AUTH_NUMBER, authPhoneNumber);

export function* loginSaga() {
  console.log("asg12321415");
  yield takeLatest(GET_AUTH_NUMBER, authPhoneNumberSaga);
  console.log("asg12321415");
}

let initialState = {
  authType: "",
  inAuth: false,
  authNumber: "",
  authDone: false,
  inquiryToken: "",
  error: ""
};

/**Reducer */
const Logins = (state = initialState, action) => {
  switch (action.type) {
    case AUTh_INITIALIZE:
      return action.payload;
    case SET_AUTH_TYPE:
      return { ...state, authType: action.payload.authType };
    case EXPIRE_AUTH:
      return { ...state, authNumber: "", inAuth: false };
    case GET_AUTH_NUMBER_SUCCESS:
      return {
        ...state,
        authNumber: action.payload.authNumber,
        inAuth: true,
        inquiryToken: action.payload.inquiryToken
      };
    case GET_AUTH_NUMBER_FAILURE:
      return { ...state, error: action.payload.error };
    case AUTH_DONE:
      return { ...state, authDone: true, inAuth: false };
    default:
      return state;
  }
};

export default Logins;
