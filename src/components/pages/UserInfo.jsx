import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { database } from "../../firebase";
// import { child, get, push, ref, update } from "firebase/database";
// import { database } from "../../firebase";

// import { useAuth } from "../../context/AuthContext";
const UserInfo = () => {
  const [valueInput, setValueInput] = useState("");
  const dbRef = ref(database);
  const { user } = useSelector((state) => state.stateUser);
  const { carts } = useSelector((state) => state.stateProduct);
  // const dbRef = ref(database);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const handleUpdateProfile = () => {};
  const handleLogOut = () => {
    dispatch({
      type: "CLEAR_USER",
    });
    dispatch({
      type: "RESET_CARTS",
      payload: [],
    });
    dispatch({
      type: "ERROR_LOGIN",
      payload: false,
    });
    navigator("/login");
  };
  let historyTempKeys = "";
  let historyTempValues = "";
  if (user.email) {
    //Lấy nó từ database
    onValue(dbRef, (snapshot) => {
      console.log(
        "snapshotUserInfo",
        snapshot.val().users[user.userId].history
      );
      user.history = snapshot.val().users[user.userId].history;
    });
    console.log("User.History", user.history);
    historyTempValues = Object.values(user.history).slice(
      1,
      Object.values(user.history).length
    );
    historyTempKeys = Object.keys(user.history).slice(
      1,
      Object.keys(user.history).length
    );
    console.log("historyTempKeys", historyTempKeys);
    console.log("historyTempValues", historyTempValues);
  }
  function handleInputChange(e) {
    setValueInput(e.target.value);
  }
  return (
    <div className="mx-auto max-w-[1200px] mt-10 flex gap-x-4">
      <div className="w-[250px] h-[500px] rounded-md p-2 bg-white">
        <div className="flex gap-x-1 items-center">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </span>
          <div className="">
            <h3>{user.email}</h3>
            <span className="text-gray-400 flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              Edit Profile
            </span>
          </div>
        </div>
        <ul className="list-profile flex flex-col gap-y-2 mt-2">
          <li>
            <button onClick={handleUpdateProfile} className="decoration-black">
              Profile
            </button>
          </li>
          <li className="font-semibold">History</li>
          <li>
            {" "}
            <div className="logout">
              <button onClick={handleLogOut}>LogOut</button>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex-1 bg-white rounded-md p-4">
        <h1 className="text-center font-bold text-xl mt-5 mb-5">
          Your history checkout
        </h1>
        <div className="">
          <input
            onChange={(e) => handleInputChange(e)}
            type="text"
            placeholder="Enter your ID, Name of product"
            name="product-search"
            className="w-full rounded-md outline-none border border-gray-300 
            p-2
            "
          />
        </div>
        <div className="history mt-4">
          {historyTempKeys.length > 0 &&
            historyTempKeys.map((item, index) => (
              <div className="mb-2">
                <h3 className="font-semibold">
                  {item.toLocaleString("en-us")}
                </h3>
                <div className="history-item">
                  {/* {console.log(
                    historyTempValues[0].slice(1, historyTempValues[0].length)
                  )} */}
                  {historyTempValues[index]
                    .slice(1, historyTempValues[index].length)
                    .filter(
                      (item1) =>
                        item1.productName?.toLowerCase().includes(valueInput) ||
                        item1.productId?.toLowerCase().includes(valueInput)
                    )
                    .map((product) => (
                      <div
                        key={product.productId}
                        className="product-item flex border border-b-0  border-r-0 border-l-0 mb-2 p-1 pr-6"
                      >
                        <img
                          src={product.imageUrl}
                          alt=""
                          className="w-[100px] h-[100px] "
                        />
                        <div className="product-info flex justify-between flex-1 items-stretch">
                          <div className="product-name-id">
                            <h3>{product.productName}</h3>
                            <span>ID: {product.productId}</span>
                          </div>

                          <span className="font-bold">${product.price}</span>
                        </div>
                      </div>
                    ))}
                  <span className="font-bold text-xl">Total: </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
