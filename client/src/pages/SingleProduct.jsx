import React, { useEffect } from "react";
import ProductImages from "@/components/ProductImages";
import Reviews from "@/components/Reviews";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import RecommendedProducts from "@/components/RecommendedProducts";
import { useGetSingleProductQuery } from "@/slices/productsApiSlice";
import { useParams } from "react-router-dom";
import Loader from "@/components/Loader";
import RatingStar from "@/components/RatingStar";

function SingleProduct() {
  const { id: productId } = useParams();

  const { data, isLoading, refetch } = useGetSingleProductQuery(productId);

  if (!isLoading) {
    console.log(data);
  }
  
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[100dvh]">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div className="bg-black">
        <div className="md:flex bg-black px-2 pb-2">
          <ProductImages images={data.images} />

          <div className="md:w-3/5 md:flex md:justify-center lg:gap-x-2">
            <div className="lg:w-1/2 text-lg md:text-xl lg:text-xl font-semibold flex flex-col gap-y-2 lg:ml-2">
              <div className="">
                <span className="text-gray-500">Name: </span>
                {data.name}
              </div>
              <div className="flex items-center max-lg:justify-between ">
                <div className="flex flex-col gap-y-2">
                  <div className="flex gap-x-2 items-center">
                    {RatingStar(data.rating)} <span>{data.numReviews}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Brand: </span>
                    {data.brand}
                  </div>
                </div>
                <span className="max-md:mr-4  lg:ml-8 flex flex-col-reverse items-center">
                  <span className="text-gray-500">Wish List</span>
                  <i className="fa-regular fa-heart text-2xl text-[#F85606]"></i>
                </span>
              </div>
              <div className="text-[#F85606] ">
                <span className="text-gray-500">Price: </span>${data.price}
              </div>
              <div>
                <div>
                  <div className="flex gap-x-4">
                    <span className="text-gray-500">Quantity:</span>
                    <span className="flex gap-x-4">
                      <Button>-</Button>
                      <p>5</p>
                      <Button>+</Button>
                    </span>
                  </div>
                  <Button variant="outline" className="mt-2">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
            <div className="max-lg:hidden lg:w-1/2  font-normal text-xl ">
              {data.description}
            </div>
          </div>
        </div>

        <div className=" mt-4">
          <h1 className="text-xl font-semibold ml-2">User Reviews</h1>

          {data.reviews.length > 0 && <Reviews reviews={data.reviews} />}
          <div className="flex ml-2 ">
            <form className="flex flex-col bg-[#020817] p-4 rounded-md my-4 gap-y-2 w-[50vw] max-sm:w-full mx-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Rating" />
                </SelectTrigger>
                <SelectContent className="bg-black text-white border-black">
                  <SelectGroup>
                    <SelectLabel>Rate</SelectLabel>
                    <SelectItem value="1">1 (Very bad)</SelectItem>
                    <SelectItem value="2">2 (Bad)</SelectItem>
                    <SelectItem value="3">3 (Average)</SelectItem>
                    <SelectItem value="4">4 (Good)</SelectItem>
                    <SelectItem value="5">5 (Excellent)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div>
                <Label>Review</Label>
                <Textarea placeholder="Type your review" />
              </div>
              <Button>Post</Button>
            </form>
          </div>
        </div>
        <div className="p-2 bg-black my-2 lg:hidden">
          <h1 className=" text-xl ">Description</h1>
          <div className="border-t py-1 ">{data.description}</div>
        </div>
      </div>
      <Separator className="my-4" />
      <RecommendedProducts productId={productId} />
    </div>
  );
}

export default SingleProduct;
