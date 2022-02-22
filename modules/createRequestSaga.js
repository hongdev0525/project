import { call, put } from "redux-saga/effects";
import { useDispatch } from "react-redux";
import { setLoading } from "/modules/common/loading";

const createRequestSage = (type, request) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return function* (action) {
    yield put(setLoading(true));
    try {
      const response = yield call(request, action.payload);
      yield put({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      yield put({
        type: FAILURE,
        payload: err,
        error: true,
      });
    }
    yield put(setLoading(false));
  };
};

export default createRequestSage;
