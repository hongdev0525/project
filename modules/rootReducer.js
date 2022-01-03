import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import Counter from "../modules/example/Counter";

const rootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  }
  return combineReducers({
    Counter
    //여기에 리듀서 등록
  })(state, action);
};

export function* rootSaga() {
  yield all(
    [
      //여기에 사가 등록
    ]
  );
}

export default rootReducer;
