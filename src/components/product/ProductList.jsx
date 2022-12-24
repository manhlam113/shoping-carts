import React from "react";
import { useNavigate } from "react-router-dom";

const ProductList = ({ productData }) => {
  const navigator = useNavigate();
  return (
    <div className="overflow-y-auto h-[600px] lg:w-3/6 flex gap-y-2 flex-col">
      {productData &&
        productData.length > 0 &&
        productData.map((item, index) => (
          <div
            key={index}
            className="md:h-auto product-item mb-4 md:mb-0 product-item p-3 shadow-lg border border-pink-200 md:block lg:flex items-start lg:h-[200px] gap-x-4 bg-white rounded-md cursor-pointer"
            onClick={() => navigator(`/products/${item.productId || 1}`)}
          >
            <img
              src={item.imageUrl}
              alt=""
              className="lg:w-[180px] lg:h-full object-cover rounded-md"
            />
            <div className="product-info md:flex md:flex-col">
              <div className="lg:h-[150px]">
                <h2 className="font-bold text-xl mb-6">{item.productName}</h2>
                <span className="text-gray-400">{item.description}</span>
              </div>
              <div className="flex justify-between mt-auto">
                <span className="font-bold text-xl">${item.price}</span>
                <span className="font-bold text-lg text-primary">Details</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductList;
