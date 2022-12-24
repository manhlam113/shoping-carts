import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigator = useNavigate();
  const { products, loading } = useSelector((state) => state.stateProduct);
  console.log("PRODUCTS at home page", products);

  return (
    <>
      {loading ? (
        <div className="absolute inset-0 bg-opacity-25 bg-black flex justify-center items-center">
          <div
            className="w-20 h-20 rounded-full border-8 border-dotted border-t-4 border-t-transparent border-blue-500
          animate-spin mx-auto"
          ></div>
        </div>
      ) : (
        <div className="grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-5 gap-y-5 p-10">
          {products.map((item) => (
            <div
              key={item.productId}
              onClick={() => navigator(`/products/${item.productId}`)}
              className="hover:border-pink-400 cursor-pointer product-item bg-white sm:h-[400px] rounded-md mb-4 shadow-lg border border-pink-200 p-2"
            >
              <div className="w-full h-[200px]">
                <img
                  src={item.imageUrl}
                  alt=""
                  className="w-full h-full rounded-md"
                />
              </div>
              <div className="content flex flex-col mt-10">
                <div className="h-[100px]">
                  <h3 className="font-semibold">{item.productName}</h3>
                  <p className="desc text-gray-400 decoration truncate">
                    {item.description}
                  </p>
                  <span className="font-semibold text-primary">
                    ${item.price}
                  </span>
                </div>
                <button
                  className="bg-primary text-white rounded-md p-1 w-full flex-1 hover:bg-opacity-25"
                  onClick={() => navigator(`/products/${item.productId}`)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
