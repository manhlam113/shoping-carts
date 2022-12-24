import { ref, remove, set } from "firebase/database";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { database } from "../../firebase";
const Cart = () => {
  const { user } = useSelector((state) => state.stateUser);
  const { carts } = useSelector((state) => state.stateProduct);
  const navigator = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {}, [user.email]);

  function updateSubtotal(carts) {
    let subTotal = 0;

    carts.map((item) => {
      subTotal += item.price * item.quantity;
    });
    return subTotal;
  }

  let shipCost = 0;
  function handleDecrement(item) {
    console.log("itemProducId", item.productId);
    console.log("cartsDecrement", carts);
    if (carts[item.productId].quantity == 1) {
      handleDeleteCart(item.productId);
      // set(ref(database, `/users/0/carts/items/${item.productId}`), {
      //   ...item,
      //   quantity: 1,
      // });
    } else {
      set(
        ref(database, `/users/${user.userId}/carts/items/${item.productId}`),
        {
          ...item,
          quantity: item.quantity - 1,
        }
        // () => {
        //   dispatch({
        //     type: "DRECREMENT_QUANTITY",
        //     payload: item.productId,
        //   });
        // }
      );
    }
    // dispatch({
    //   type: "DRECREMENT_QUANTITY",
    //   payload: item.productId,
    // });
  }
  function handleIncrement(item) {
    // dispatch({
    //   type: "INCREMENT_QUANTITY",
    //   payload: item.productId,
    // });
    set(
      ref(database, `/users/${user.userId}/carts/items/${item.productId}`),
      {
        ...item,
        quantity: item.quantity + 1,
      }
      // () => {
      //   dispatch({
      //     type: "INCREMENT_QUANTITY",
      //     payload: item.productId,
      //   });
      // }
    );
  }

  function handleDeleteCart(id) {
    let confirmText = confirm("Do you want to remove product out of cart?");
    if (confirmText) {
      // dispatch({
      //   type: "DELETE_CART",
      //   payload: id,
      // });
      remove(ref(database, `/users/${user.userId}/carts/items/${id}`));
      // () => {
      //   dispatch({
      //     type: "DELETE_CART",
      //     payload: id,
      //   });
      // }
    }
  }

  function handleCheckOut() {
    if (!user.email) {
      navigator("/login");
    } else {
      dispatch({
        type: "SUB_TOTAL_CART",
        payload: updateSubtotal(carts),
      });
      navigator("/checkout");
    }

    // if (user.length > 0) {
    //
    // } else {
    //   navigator("/login");
    // }
  }
  console.log("carts", carts);
  let cartsTemp = [];
  if (carts) {
    cartsTemp = Object.values(carts).slice(1, carts.length);
  } else {
    cartsTemp = [];
  }
  console.log("CARTS_TEMP", cartsTemp);
  return (
    <div>
      <div
        className="rounded-lg mx-auto overflow-hidden bg-transparent container xl:px-24 mb-10"
        style={{ height: "auto" }}
      >
        <div className="grid lg:grid-cols-12 pt-5 gap-4 h-full auto-rows-min p-10 lg:p-10">
          <div className="lg:col-span-12">
            <div className="p-3 bg-white shadow-lg w-full rounded-lg">
              <div className="w-full text-center font-semibold">
                My Shopping Cart
              </div>
            </div>
          </div>
          <div className="lg:col-span-8 overflow-auto">
            <div className="grid grid-cols-12">
              <div className="col-span-12">
                <div className="md:grid girds-col-12 gap-4 w-full h-full rounded-lg overflow-auto">
                  {cartsTemp?.length <= 0 ? (
                    <h4 className="text-center mt-12 font-bold text-xl">
                      You have no products in cart
                    </h4>
                  ) : (
                    <>
                      {cartsTemp?.map((item) => (
                        <div
                          className="bg-white w-full rounded-md p-2 md:flex border border-pink-200 mb-4 md:mb-0"
                          key={item.productId}
                        >
                          <div className="md:w-2/6">
                            <img
                              src={item.imageUrl}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="md:w-4/6 p-4">
                            <div className="md:h-[150px]">
                              <h1 className="flex justify-between font-bold text-2xl mb-5">
                                {item.productName}{" "}
                                <span
                                  className="text-primary"
                                  onClick={() =>
                                    handleDeleteCart(item.productId)
                                  }
                                >
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
                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                  </svg>
                                </span>
                              </h1>
                              <span className="text-gray-400">
                                {item.description}
                              </span>
                            </div>
                            <div className="sm:flex justify-between items-center mt-auto">
                              <div className="flex bg-gray-300 rounded-md sm:w-[150px] justify-between px-3 py-1 text-3xl font-semibold cursor-pointer">
                                <span
                                  className="text-gray-500"
                                  onClick={() => handleDecrement(item)}
                                >
                                  -
                                </span>
                                <span className="text-black font-semibold">
                                  {item.quantity}
                                </span>
                                <span
                                  className="text-yellow-600"
                                  onClick={() => handleIncrement(item)}
                                >
                                  +
                                </span>
                              </div>
                              <h4 className="mt-4 font-bold text-2xl">
                                ${item.price}
                              </h4>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <div className="bg-gray-100 px-4 py-2 grid gap-1 gird-cols-12 w-full rounded-lg h-44">
                  <div className="col-span-12">
                    <h6 className="text-lg font-medium">Order Info</h6>
                  </div>
                  <div className="col-span-12 text-lg">
                    <div className="flex items-center justify-between">
                      <p className="font-light text-gray-700">Subtotal:</p>
                      <p className="font-normal">
                        ${updateSubtotal(cartsTemp).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-light text-gray-700">Shipping Cost:</p>
                      <p className="font-normal">
                        ${cartsTemp?.length > 0 ? (shipCost = 10) : "0"}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="flex items-center justify-between font-semibold text-3xl">
                      <p className="">Total:</p>
                      <p className="">
                        ${(updateSubtotal(cartsTemp) + shipCost).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12">
                <button
                  onClick={handleCheckOut}
                  className="flex items-center justify-center duration-100 shadow-md gap-2 px-4 py-2 text-md rounded-md   
  bg-primary text-white hover:bg-opacity-25 cursor-allowed w-full"
                >
                  Checkout
                </button>
              </div>
              <div className="col-span-12">
                <button
                  onClick={() => navigator("/products/1")}
                  className="flex items-center justify-center duration-100 shadow-md gap-2 px-4 py-2 text-md rounded-md   
  border border-primary text-primary hover:bg-blue-200 false w-full"
                >
                  Continue shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
