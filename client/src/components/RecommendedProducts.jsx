import React from "react";
import ProductCard from "./ProductCard";
import { useGetRelatedProductsQuery } from "@/slices/productsApiSlice";
import Loader from "./Loader";

function RecommendedProducts({productId}) {

  const {data,isLoading}=useGetRelatedProductsQuery(productId)

  if(!isLoading){
    console.log(data)
  }
  return (
    <div>
        <h1 className="text-center text-2xl font-bold">You May also like</h1>
        {!isLoading ? (
          <div>
            {data.length>0 && data.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <Loader />
        )}
    </div>
  );
}

export default RecommendedProducts;
