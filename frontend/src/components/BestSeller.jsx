import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { BESTSELLER_PRODUCT_IDS } from "../constants/bestsellers";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products?.length > 0) {
      const bestsellers = products.filter((item) => BESTSELLER_PRODUCT_IDS.includes(item._id));
      setBestSeller(bestsellers.slice(0, 10));
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-base text-gray-500">
          Customer favourites — the pieces everyone keeps coming back for.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.length > 0 ? (
          bestSeller.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))
        ) : (
          <p className="col-span-5 text-center text-gray-500">
            No bestsellers available.
          </p>
        )}
      </div>
    </div>
  );
};

export default BestSeller;
