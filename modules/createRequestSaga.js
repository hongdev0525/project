import { call, put } from "redux-saga/effects";

const createRequestSage = (type, request) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return function*(action) {
    console.log("actionnnnnnnnnnnn:", action);
    try {
      const response = yield call(request, action.payload);
      yield put({
        type: SUCCESS,
        payload: response.data
      });
    } catch (err) {
      yield put({
        type: FAILURE,
        payload: err,
        error: true
      });
    }
  };
};

export default createRequestSage;
