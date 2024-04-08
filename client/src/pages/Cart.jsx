import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

function Cart() {
  return (
    <div className="m-2 max-sm:m-1">
      {/* --------------------FOR SMALLER SCREEN--------------*/}
      <Table className="border rounded-md md:hidden">
        <TableHeader>
          <TableRow className="text-lg">
            <TableHead>Image</TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow className="mt-2">
            <TableCell>
              <img
                src="https://www.roadtovr.com/wp-content/uploads/2023/06/maxresdefault-12.jpg"
                alt="product_img"
                className="h-12"
              />
            </TableCell>
            <TableCell className="flex flex-col">
              <span>Apple Vision Pro</span>
              <span>$ 3500</span>
            </TableCell>
            <TableCell>
              <div className="flex max-sm:flex-col items-center sm:gap-x-1">
                <button className="px-2 rounded-sm font-extrabold bg-white text-black">
                  +
                </button>
                <span>5</span>
                <button className="px-2 rounded-sm font-extrabold bg-white text-black">
                  -
                </button>
              </div>
            </TableCell>
            <TableCell>
              <i className="fa-solid fa-trash text-red-500"></i>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* --------------------FOR BIGGER SCREEN--------------*/}
      <Table className="border rounded-md max-md:hidden px-2">
        <TableHeader>
          <TableRow className="text-lg">
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow className="mt-2">
            <TableCell>
              <img
                src="https://www.roadtovr.com/wp-content/uploads/2023/06/maxresdefault-12.jpg"
                alt="product_img"
                className="h-12"
              />
            </TableCell>
            <TableCell>Apple Vision Pro</TableCell>
            <TableCell>$ 3500</TableCell>
            <TableCell>
              <div className="flex max-sm:flex-col items-center sm:gap-x-2">
                <button className="px-2 rounded-sm font-extrabold bg-white text-black">
                  +
                </button>
                <span>5</span>
                <button className="px-2 rounded-sm font-extrabold bg-white text-black">
                  -
                </button>
              </div>
            </TableCell>
            <TableCell>
              <i className="fa-solid fa-trash text-red-500"></i>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="flex max-md:flex-col md:justify-between mt-4">
        <div >
          <Button>Clear Cart</Button>
        </div>
        <div className="flex justify-end flex-end flex-col w-full  items-end">
          <form className="flex gap-x-4">
            <Input placeholder="Coupon Code" type="text" className="w-32" />
            <Button>Apply</Button>
          </form>
          <div className="flex mt-4  ">
            <Card className="p-2 gap-y-2">
              <div className=" mr-2 p-2 px-4">
                <div className="flex gap-x-2">
                  <p className="text-gray-500">SubTotal:</p>
                  <p className="font-semibold">1000</p>
                </div>
                <div className="flex gap-x-2">
                  <p className="text-gray-500">Shipping Fee:</p>
                  <p className="font-semibold">15</p>
                </div>
                <div className="flex gap-x-2">
                  <p className="text-gray-500">Coupon Discount:</p>
                  <p className="font-semibold">20</p>
                </div>
                <div className="flex gap-x-2 border-t pt-4">
                  <p className="text-gray-500">Grand Total:</p>
                  <p className="font-semibold">995</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
