import React from "react";
import { Separator } from "./ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

function CreateProduct() {
  return (
    <div className="mt-2 mx-2">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Create Product</h2>
      </div>
      <Separator className="my-4" />
      <div className="">
        <div>
          <h1 className="font-semibold">Images</h1>
          <div className="my-4 flex gap-2 flex-wrap">
            <div className="relative inline-block">
              <img
                src="https://next-shadcn-dashboard-starter.vercel.app/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2Fb94d91d0-e87a-402a-84c7-b5aec064c341-err4z7.jpg&w=1920&q=75"
                alt=""
                className="h-32"
              />
              <i className="fa-solid fa-trash text-red-500 absolute right-2 top-2"></i>
            </div>
            <div className="relative inline-block">
              <img
                src="https://next-shadcn-dashboard-starter.vercel.app/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2Fb94d91d0-e87a-402a-84c7-b5aec064c341-err4z7.jpg&w=1920&q=75"
                alt=""
                className="h-32"
              />
              <i className="fa-solid fa-trash text-red-500 absolute right-2 top-2"></i>
            </div>
            <div className="relative inline-block">
              <img
                src="https://next-shadcn-dashboard-starter.vercel.app/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2Fb94d91d0-e87a-402a-84c7-b5aec064c341-err4z7.jpg&w=1920&q=75"
                alt=""
                className="h-32"
              />
              <i className="fa-solid fa-trash text-red-500 absolute right-2 top-2"></i>
            </div>
          </div>
          <div className="my-4 bg-gray-800 flex flex-col justify-between items-center p-2 rounded-md">
            <span>
              <i className="fa-solid fa-upload"></i>
            </span>
            <h1>Choose product images to upload</h1>
            <h2 className="text-sm text-gray-500">Upload atleast three</h2>
          </div>
        </div>
        <form className="">
          <div className="grid md:grid-cols-2 gap-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Product Name"
                required
                type="text"
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input id="price" placeholder="Price" required type="number" />
            </div>
            <div>
              <Label htmlFor="brnad">Brand</Label>
              <Input
                id="brand"
                placeholder="Product Brand"
                required
                type="text"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="Product Category"
                required
                type="text"
              />
            </div>
            <div>
              <Label htmlFor="stock">Count In Stock</Label>
              <Input
                id="stock"
                placeholder="Count In Stock"
                required
                type="number"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="About Product"
                required
                type="text"
              />
            </div>
          </div>
          <div className="text-center my-4">
            <Button>Create</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;
