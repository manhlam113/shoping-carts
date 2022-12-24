import { createStore, combineReducers, applyMiddleware } from "redux";
import reduxSaga from "redux-saga";
import mysaga from "./saga/MySaga";
import rdcProduct from "./reducer/rdcProduct";
import rdcUser from "./reducer/rdcUser";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const middleware = reduxSaga();

const persistConfig = {
  key: "root",
  storage,
};
const globalState = {
  stateProduct: rdcProduct,
  stateUser: rdcUser,
};

const allRdc = combineReducers(globalState);
export default createStore(allRdc, applyMiddleware(middleware));
middleware.run(mysaga);
