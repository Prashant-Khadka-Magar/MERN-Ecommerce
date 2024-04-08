import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import RatingStar from "./RatingStar";
import { useSelector } from "react-redux";

function Reviews({ reviews }) {
  const reviewPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastReview = currentPage * reviewPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewPerPage;
  const reviewsToShow = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const totalPage = Math.ceil(reviews.length / reviewPerPage);


  const prevHandler=()=>{
    if(currentPage<=1){
      return;
    }
    setCurrentPage((prev)=>prev-1)
  }


  const nextHandler=()=>{
    if(totalPage<=currentPage){
      return;
    }
    setCurrentPage((prev)=>prev+1)
  }

  const { userInfo } = useSelector((state) => state.auth);

  console.log(userInfo)

  return (
    <div className="border-t border-gray-500 border-b pb-2 pl-2">
      {reviewsToShow.map((review) => (
        <div className="bg-[#020817] mt-2 py-2" key={review._id}>
          <div className=" flex gap-x-2">
            <Avatar>
              <AvatarImage src={review.avatar} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <h1 className="font-semibold text-base">{review.name}</h1>
              <h2>{RatingStar(review.rating)}</h2>
              <p>{review.createdAt.substring(0, 10)}</p>
              <p>{review.comment}</p>
            </div>
          </div>
          {review.reply && (
            <div className="pl-4 bg-[#1a1b1f]">
              <div className="text-md font-semibold text-orange-500">
                Seller Response
              </div>
              <div className="pl-2">{review.reply}</div>
            </div>
          )}
          {!review.reply && userInfo.isAdmin && (
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive">Reply</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-black">
                  <DialogHeader>
                    <DialogTitle>Reply to the User</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className=" items-center ">
                      <Textarea placeholder="Type your reply here." />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Reply</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      ))}
      <div className="flex justify-end gap-x-2 mr-2 mt-2">
        <Button variant="outline" onClick={prevHandler}>Prev</Button>
        <Button variant="outline" onClick={nextHandler}>Next</Button>
      </div>
    </div>
  );
}

export default Reviews;
