import { takeLatest } from "redux-saga/effects";
import createRequestSage from "../../createRequestSaga";
import { idExist, setPassword } from "/API/common/userInquiry";

const SET_NEW_PASSWORD = "inquiry/SET_NEW_PASSWORD";
const SET_NEW_PASSWORD_SUCCESS = "inquiry/SET_NEW_PASSWORD_SUCCESS";
const SET_NEW_PASSWORD_FAILURE = "inquiry/SET_NEW_PASSWORD_FAILURE";
const ID_EXIST_CHECK = "inquiry/ID_EXIST_CHECK";
const ID_EXIST_CHECK_SUCCESS = "inquiry/ID_EXIST_CHECK_SUCCESS";
const ID_EXIST_CHECK_FAILURE = "inquiry/ID_EXIST_CHECK_FAILURE";

export const setNewPassword = (userId, userPassword) => {
  return {
    type: SET_NEW_PASSWORD,
    payload: {
      userId: userId,
      userPassword: userPassword
    }
  };
};

export const idExistCheck = userId => {
  return {
    type: ID_EXIST_CHECK,
    payload: {
      userId: userId
    }
  };
};

const idExistCheckSage = createRequestSage(ID_EXIST_CHECK, idExist);
const setNewPasswordSage = createRequestSage(SET_NEW_PASSWORD, setPassword);

export function* pwdinquirySaga() {
  yield takeLatest(ID_EXIST_CHECK, idExistCheckSage);
  yield takeLatest(SET_NEW_PASSWORD, setNewPasswordSage);
}

let initialState = {
  id: "",
  isExist: "",
  setDone: false,
  pwdDuplicate: false,
  error: ""
};

/**Reducer */
const PwdInquiry = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEW_PASSWORD_SUCCESS:
      if (action.payload.status === "fail") {
        return {
          ...state,
          setDone: false,
          pwdDuplicate: action.payload.duplicate == true ? true : false
        };
      } else {
        return { ...state, setDone: true };
      }
    case SET_NEW_PASSWORD_FAILURE:
      return { ...state, error: "API error occured" };
    case ID_EXIST_CHECK_SUCCESS:
      if (action.payload.status === "fail") {
        return { ...state, isExist: false };
      } else {
        return { ...state, isExist: true };
      }
    case ID_EXIST_CHECK_FAILURE:
      return { ...state, error: "API error occured" };
    default:
      return state;
  }
};

export default PwdInquiry;
