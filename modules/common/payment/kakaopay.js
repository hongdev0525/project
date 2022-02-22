import { takeLatest } from "redux-saga/effects";
import createRequestSage from "../../createRequestSaga";
import { kakopayRequestAPI } from "../../../API/common/payment";

const KAKAOPAY_PAYMENT_REQUERT = "payment/KAKAOPAY_PAYMENT_REQUERT";
const KAKAOPAY_PAYMENT_REQUERT_SUCCESS =
  "payment/KAKAOPAY_PAYMENT_REQUERT_SUCCESS";
const KAKAOPAY_PAYMENT_REQUERT_FIALURE =
  "payment/KAKAOPAY_PAYMENT_REQUERT_FAILURE";

export const kakaopayRequest = (orderInfo, url) => {
  return {
    type: KAKAOPAY_PAYMENT_REQUERT,
    payload: { orderInfo: orderInfo, url: url }
  };
};

const kakaopayRequestSaga = createRequestSage(
  KAKAOPAY_PAYMENT_REQUERT,
  kakopayRequestAPI
);

export function* kakaopaySaga() {
  console.log("actionsss");

  yield takeLatest(KAKAOPAY_PAYMENT_REQUERT, kakaopayRequestSaga);
}

const initialState = {
  paymentResult: {},
  paymentSuccess: ""
};

const KakaoPay = (state = initialState, action) => {
  switch (action.type) {
    case KAKAOPAY_PAYMENT_REQUERT_SUCCESS:
      return {
        ...state,
        paymentResult: action.payload.data,
        paymentSuccess: action.payload.success
      };
    case KAKAOPAY_PAYMENT_REQUERT_FIALURE:
      return "API ERROR OCCURED";
    default:
      return state;
  }
};

export default KakaoPay;
