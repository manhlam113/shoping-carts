import { call, put, takeEvery, takeLatest, delay } from "redux-saga/effects";

const getApiProduct = async () => {
  let res = await fetch("https://api.npoint.io/beef3d4f5c122e5a014a");
  let data = await res.json();
  return data;
};

function* getData() {
  yield put({
    type: "SET_LOADING",
    payload: true,
  });
  let data = yield call(getApiProduct);
  //lấy được cục data
  yield put({
    type: "GET_DATA",
    payload: data,
  });
  yield put({
    type: "SET_LOADING",
    payload: false,
  });
  //giống như dispatch
}

function* mysaga() {
  yield takeLatest("GET_PRODUCT", getData);
}
export default mysaga;
