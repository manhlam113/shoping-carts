import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductDetail from "../product/ProductDetail";
import ProductList from "../product/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { child, onValue, ref } from "firebase/database";
import { database } from "../../firebase";
import { db } from "../../firebaseFireStore";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";

const Product = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.stateUser);
  // Phải lấy được userId
  const dbRef = ref(database);
  useEffect(() => {
    // dispatch({
    //   type: "GET_PRODUCT",
    // });

    onValue(dbRef, (snapshot) => {
      console.log("snapshot", snapshot.val().users[user.userId]);
      dispatch({
        type: "GET_CARTS",
        payload: snapshot.val().users[user.userId].carts.items,
      });
    });
  }, [user]);

  const { products, carts } = useSelector((state) => state.stateProduct);
  const { loading } = useSelector((state) => state.stateProduct);
  console.log("Carts....", carts);
  return (
    <div>
      {loading ? (
        <div className="absolute inset-0 bg-opacity-25 bg-black flex justify-center items-center">
          <div
            className="w-20 h-20 rounded-full border-8 border-dotted border-t-4 border-t-transparent border-blue-500
          animate-spin mx-auto"
          ></div>
        </div>
      ) : (
        <div className="max-w-[600px] mx-auto md:mt-10 md:mb-10 md:max-w-[1200px] mx-auto md:flex md:justify-start md:gap-x-10 md0:h-[600px] p-10 md:p-10 lg:md-0 lg:p-0">
          {products.length > 0 ? (
            <>
              <ProductDetail productData={products}></ProductDetail>
              <h3 className="md:hidden font-bold text-xl text-primary mb-4">
                Related Product
              </h3>
              <ProductList productData={products}></ProductList>
            </>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default Product;
