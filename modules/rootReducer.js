import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import { HYDRATE } from "next-redux-wrapper";
import Logins, { loginSaga } from "../modules/common/login";

const rootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  }
  //여기에 리듀서 등록
  return combineReducers({
    Logins
  })(state, action);
};

export function* rootSaga() {
  yield all([
    loginSaga()
    //여기에 사가 등록
  ]);
}

export default rootReducer;
