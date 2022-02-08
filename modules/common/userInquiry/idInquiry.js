import { takeLatest } from "redux-saga/effects";
import createRequestSage from "../../createRequestSaga";
import { idInquiry } from "/API/common/userInquiry";

const GET_INQUIRY_ID = "inquiry/GET_INQUIRY_ID";
const GET_INQUIRY_ID_SUCCESS = "inquiry/GET_INQUIRY_ID_SUCCESS";
const GET_INQUIRY_ID_FAILURE = "inquiry/GET_INQUIRY_ID_FAILURE";

export const getInquiryId = (userName, userPhone, inquiryToken) => {
  return {
    type: GET_INQUIRY_ID,
    payload: {
      userName: userName,
      userPhone: userPhone,
      inquiryToken: inquiryToken
    }
  };
};

const idInquirySage = createRequestSage(GET_INQUIRY_ID, idInquiry);

export function* idInquirySaga() {
  yield takeLatest(GET_INQUIRY_ID, idInquirySage);
}

let initialState = {
  id: "",
  inAuth: false,
  AuthDone: false,
  isExist: "",
  error: ""
};

const IdInquiry = (state = initialState, action) => {
  switch (action.type) {
    case GET_INQUIRY_ID_SUCCESS:
      return {
        ...state,
        authDone: true,
        id: action.payload.id ? action.payload.id : "",
        error: action.payload.message ? action.payload.message : ""
      };
    case GET_INQUIRY_ID_FAILURE:
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};

export default IdInquiry;
