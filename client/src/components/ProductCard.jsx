import React from "react";
import { Link } from "react-router-dom";
import RatingStar from "./RatingStar";

function ProductCard({ product }) {
  return (
    <div className="flex bg-[#020817] px-2 py-1 gap-x-2 max-sm:items-center sm:px-2 mt-4 lg:w-[46.5625rem]">
      <img
        src={product.images[0].imageUrl}
        alt="product_img"
        className="lg:h-44 max-sm:h-28 sm:h-32 sm:"
      />
      <Link to={`/product/${product._id}`} className="flex flex-col gap-y-1">
        <h1 className="font-semibold sm:text-lg">{product.name}</h1>
        <h2 className="max-sm:hidden text-sm">{product.description}</h2>
        <span className="text-sm flex items-center gap-x-1">
          {RatingStar(product.rating)} <span>{product.numReviews}</span>
        </span>
        <span className="text-sm">{product.price}</span>
      </Link>
    </div>
  );
}

export default ProductCard;
