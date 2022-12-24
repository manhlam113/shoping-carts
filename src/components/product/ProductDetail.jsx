import { ref, set } from "firebase/database";
import {
  addDoc,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { database } from "../../firebase";
import { db } from "../../firebaseFireStore";
const ProductDetail = ({ productData }) => {
  const [quantity, setQuantity] = useState(1);
  // const [cartsFirebase, setCartsFirebase] = useState([]);
  // const [total, setTotal] = useState(1);
  const navigator = useNavigate();
  const params = useParams();
  const productId = params.productId;
  const dispatch = useDispatch();
  const { carts } = useSelector((state) => state.stateProduct);
  const { user } = useSelector((state) => state.stateUser);

  useEffect(() => {
    setQuantity(1);
  }, [productId]);

  const increasementQuantity = () => {
    if (quantity >= 99) return 99;
    setQuantity((quantity) => quantity + 1);
  };
  const decreasementQuantity = () => {
    if (quantity <= 1) return 1;
    setQuantity((quantity) => quantity - 1);
  };

  const productDetail = [...productData].filter((item) => {
    return item.productId === productId;
  });

  function handleAddCart() {
    if (user.email) {
      const productItem = {
        productId: productDetail[0].productId,
        productName: productDetail[0].productName,
        price: productDetail[0].price,
        imageUrl: productDetail[0].imageUrl,
        description: productDetail[0].description,
        quantity: quantity + (carts[productDetail[0].productId]?.quantity || 0),
      };
      set(
        ref(
          database,
          `users/${user.userId}/carts/items/${productDetail[0].productId}`
        ),
        productItem
      );

      toast("Thêm Sản phẩm thành công!", {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 2000,
        type: toast.TYPE.SUCCESS,
      });
      setQuantity(1);
    } else {
      navigator("/login");
    }
  }
  console.log("Carts.....", carts);
  if (!productData) return;

  return (
    <div className="md:h-[620px] md:w-4/6 bg-white rounded-md p-3 shadow-md border-pink-200 border mb-10 md:mb-0">
      <div className="images w-full md:h-[400px] flex justify-center">
        <img
          src={productDetail[0].imageUrl}
          alt=""
          className="h-full rounded-md"
        />
      </div>
      <div className="product-title mb-10 md:mb-0 py-2">
        <h1 className="text-black font-bold text-2xl">
          {productDetail[0].productName}
        </h1>
        <span className="text-gray-500">{productDetail[0].description}</span>
      </div>
      <div className="product-price md:flex md:justify-between items-center">
        <div className="mb-4 md:mb-0 flex bg-gray-300 rounded-md md:w-[150px] justify-between px-4 py-2 text-3xl font-semibold cursor-pointer">
          <span className="text-gray-500" onClick={decreasementQuantity}>
            -
          </span>
          <span className="text-black font-semibold">{quantity}</span>
          <span className="text-yellow-600" onClick={increasementQuantity}>
            +
          </span>
        </div>
        <div className="md:flex justify-between items-center gap-x-4 gap-y-2 md:gap-y-0">
          <h3 className="font-bold text-4xl text-black text-center mb-4 md:mb-0">
            ${productDetail[0].price}
          </h3>
          <button
            onClick={handleAddCart}
            className="w-full px-6 py-2 rounded-md bg-primary animate-bounce flex justify-center items-center gap-x-4 text-white"
          >
            <span>
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
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </span>
            <span className="md:hidden lg:block">Add To Cart</span>
            <ToastContainer></ToastContainer>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
