import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { getCloudinarySrcSet } from "../utils/cloudinary";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Link className="text-gray-700 cursor-pointer relative" to={`/product/${id}`}>

      {/* Image container — aspect-square ensures skeleton has correct height */}
      <div className="overflow-hidden relative aspect-square bg-gray-100">

        {/* Skeleton loader — tab tak dikhega jab tak image load na ho */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}

        <img
          className={`w-full h-full object-cover hover:scale-110 transition-all ease-in-out duration-500 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
          src={image[0]}
          srcSet={getCloudinarySrcSet(image[0], [400, 700])}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          alt={name}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
        />
      </div>

      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}{Number(price).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
      </p>
    </Link>
  );
};

export default ProductItem;
