import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootReducer, { rootSaga } from "./rootReducer";
const sagaMiddleware = createSagaMiddleware();

const storeConfig = context => {
  //redux toolkit으로 store config 설정
  const store = configureStore({
    reducer: rootReducer,
    middleware: [logger, sagaMiddleware],
    devTools: process.env.NODE_ENV !== "production"
  });
  //Saga 미들웨어 구동
  sagaMiddleware.run(rootSaga);
  return store;
};

//store config를 wrapper에 적용
export const wrapper = createWrapper(storeConfig, {
  debug: process.env.NODE_ENV !== "production"
});
