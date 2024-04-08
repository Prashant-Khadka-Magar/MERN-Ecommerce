import ProductCard from "@/components/ProductCard";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useGetAllProductsQuery } from "@/slices/productsApiSlice";
import Loader from "@/components/Loader";

function AllProducts() {
  const { data, isLoading, isError, error } = useGetAllProductsQuery();

  if (!isLoading) {
    console.log(data);
  }
  return (
    <div className="mx-2 my-4">
      <header className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-green-400">1200 products</h2>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort the Products" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by</SelectLabel>
              <SelectItem value="apple">Most Reviewed</SelectItem>
              <SelectItem value="banana">Low to High</SelectItem>
              <SelectItem value="blueberry">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="md:hidden">
          <Drawer className="md:hidden">
            <DrawerTrigger>
              <Button
                variant="outline"
                className="bg-white text-black md:hidden"
              >
                <i className="fa-solid fa-filter "></i>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-black border-gray-500 md-hidden">
              <div className="md:hidden px-2 mb-4 ">
                <div>
                  <h1 className="text-lg">Brands</h1>
                  <div className="flex items-center gap-x-2 my-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className=" font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Asus
                    </label>
                  </div>
                  <div className="flex items-center gap-x-2 my-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className=" font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Meta
                    </label>
                  </div>
                  <div className="flex items-center gap-x-2 my-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Apple
                    </label>
                  </div>
                </div>
                <Separator className="my-4" />
                <div>
                  <h1 className="text-lg">Categories</h1>
                  <div className="flex items-center gap-x-2 my-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className=" font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Virtual Reality
                    </label>
                  </div>
                  <div className="flex items-center gap-x-2 my-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className=" font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Desktop
                    </label>
                  </div>
                  <div className="flex items-center gap-x-2 my-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Laptop
                    </label>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex gap-x-2">
                  <Input placeholder="$Min" className="w-20" />
                  <Input placeholder="$Max" className="w-20" />
                  <Button>Go</Button>
                </div>
                <Separator className="my-4" />
                <Button variant="destructive">Clear Filters</Button>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </header>

      <Separator className="my-2" />
      <div className="md:flex gap-x-2">
        <div className="max-md:hidden">
          <div>
            <h1>Brands</h1>
            <div className="flex items-center gap-x-2 my-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Asus
              </label>
            </div>
            <div className="flex items-center gap-x-2 my-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className=" font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Meta
              </label>
            </div>
            <div className="flex items-center gap-x-2 my-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Apple
              </label>
            </div>
          </div>
          <Separator className="my-4" />
          <div>
            <h1>Categories</h1>
            <div className="flex items-center gap-x-2 my-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Virtual Reality
              </label>
            </div>
            <div className="flex items-center gap-x-2 my-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Desktop
              </label>
            </div>
            <div className="flex items-center gap-x-2 my-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Laptop
              </label>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex gap-x-2">
            <Input placeholder="$Min" className="w-20" />
            <Input placeholder="$Max" className="w-20" />
            <Button>Go</Button>
          </div>
          <Separator className="my-4" />
          <Button variant="destructive">Clear FIlters</Button>
        </div>

        {!isLoading ? (
          <div>
            {data.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default AllProducts;
