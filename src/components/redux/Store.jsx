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

const persistReducer2 = persistReducer(persistConfig, allRdc);
const store = createStore(persistReducer2, applyMiddleware(middleware));
middleware.run(mysaga);

const persistor = persistStore(store);
export default store;
export { persistor };
