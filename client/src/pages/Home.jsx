import Carousel from "@/components/Carousel";
import React from "react";
import logo2 from "../assets/logo2.png";
import FeatureCard from "@/components/FeatureCard";
import { useGetFeaturedProductsQuery } from "@/slices/productsApiSlice";
import Loader from "@/components/Loader";

function Home() {
  const { data, isLoading } = useGetFeaturedProductsQuery();

  if (!isLoading) {
    console.log(data);
  }
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <Carousel />
        <div id="trust_logos" className="flex justify-center w-full my-4">
          <img loading="lazy" src={logo2} alt="brands_img" />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h1
          id="featured_heading"
          className="text-center text-2xl font-semibold my-4"
        >
          Our Best Products
        </h1>

        {!isLoading ? (
          <div
            id="featured_cards"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mx-2"
          >
            {data.map((product) => (
              <FeatureCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default Home;
