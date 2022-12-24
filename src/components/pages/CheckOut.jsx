import { ref, remove, set } from "firebase/database";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { database } from "../../firebase";

const CheckOut = () => {
  const navigator = useNavigate();
  const { user } = useSelector((state) => state.stateUser);
  const { carts, totalCarts } = useSelector((state) => state.stateProduct);
  console.log("Caerrt....", carts);
  console.log("user,....", user);

  function handleCheckOut() {
    let cartEmpty = {
      0: [""],
    };
    // const cartHistory = carts.slice(1, carts.length);
    set(ref(database, `users/${user.userId}/carts/items`), cartEmpty);
    set(ref(database, `/users/${user.userId}/history/${new Date()}`), carts);
    navigator("/thank");
  }
  let cartsTemp = [];
  if (carts.length >= 2) {
    cartsTemp = Object.values(carts).slice(1, carts.length);
  } else {
    cartsTemp = [];
  }
  let shipCost = 10;
  function caculateSubtotal(price, quantity) {
    console.log("Price", price);
    console.log("quantity", quantity);
    return price * quantity;
  }

  function cartTotal(carts) {
    let subTotal = 0;

    carts.map((item) => {
      subTotal += item.price * item.quantity;
    });
    return subTotal;
  }

  console.log("CartTempCheckout", cartsTemp);
  console.log("cartHistory", carts);
  return (
    <div className="xl:px-24 mx-auto mt-10">
      <div className="form-checkout rounded-md p-4">
        <div className="info-container grid grid-cols-2 gap-x-5">
          <div className="info-customer bg-white rounded-md p-4">
            <h1 className="text-black font-semibold border-b-2 mb-4">
              INFO OF CUSTOMER
            </h1>
            <form action="">
              <div className="form-info-fill grid grid-cols-2 gap-x-2">
                <div className="form-left">
                  <div className="form-group flex flex-col mb-5">
                    <label htmlFor="firstName">Your Name</label>
                    <input
                      type="text"
                      name="firstName"
                      className="outline-none border border-gray-300 rounded-md p-1"
                    />
                  </div>
                  <div className="form-group flex flex-col mb-5">
                    <label htmlFor="firstName">Address</label>
                    <input
                      type="text"
                      name="firstName"
                      className="outline-none border border-gray-300 rounded-md p-1"
                    />
                  </div>
                </div>
                <div className="form-right">
                  <div className="form-group flex flex-col mb-5">
                    <label htmlFor="firstName">Email</label>
                    <input
                      type="text"
                      name="firstName"
                      className="outline-none border border-gray-300 rounded-md p-1"
                    />
                  </div>
                  <div className="form-group flex flex-col mb-5">
                    <label htmlFor="firstName">Phone Number</label>
                    <input
                      type="text"
                      name="firstName"
                      className="outline-none border border-gray-300 rounded-md p-1"
                    />
                  </div>
                </div>
              </div>
              <div className="form-note">
                <label htmlFor="">Notes</label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  className="w-full outline-none border border-gray-300 p-2 rounded-md"
                ></textarea>
              </div>
            </form>
          </div>
          <div className="info-products bg-white rounded-md p-4">
            <h1 className="text-black font-semibold border-b-2 mb-4">
              INFOMATIONS OF PRODUCTS
            </h1>
            <div className="info-product-table">
              <table className="w-full text-xl">
                <thead>
                  <tr className="border-b-2">
                    <td className="font-semibold">Products</td>
                    <td className="font-semibold">SubTotal</td>
                  </tr>
                </thead>
                <tbody>
                  {cartsTemp?.map((item) => (
                    <tr className="border-b-2">
                      <td>
                        {item.productName} <span className="ml-2">x</span>
                        <span className="ml-8">{item.quantity}</span>
                      </td>
                      <td>${caculateSubtotal(item.quantity, item.price)}</td>
                    </tr>
                  ))}
                  <tr className="border-b-2">
                    <td className="font-semibold">Shiping cost:</td>
                    <td className="font-semibold">${shipCost}</td>
                  </tr>
                </tbody>
                <tfoot className="">
                  <tr className="order-total">
                    <td className="font-semibold">Total:</td>
                    <td>
                      <strong className="total-price">
                        ${cartTotal(cartsTemp, caculateSubtotal) + shipCost}
                      </strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <button
              onClick={handleCheckOut}
              className="px-10 py-2 rounded-md bg-primary hover:bg-opacity-25 animate-bounce mt-10 ml-[400px] relative text-white font-semibold"
            >
              ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
