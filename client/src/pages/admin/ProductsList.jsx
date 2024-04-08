import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

function ProductsList() {
  const navigate=useNavigate()
  return (
    <div className="mx-2 mt-2">
      <div className="flex justify-between w-full items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products (10)</h2>
        </div>
        <div>
          <Button onClick={()=>navigate('/productslist/new')}>
            <PlusIcon className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>
      </div>
      <Separator className="my-4" />
      <div>
        <Input placeholder="search products..." />
        <Table className="border rounded-md my-2">
          <TableHeader>
            <TableRow className="text-lg">
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Edit</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow className="mt-2">
              <TableCell><img src="http://res.cloudinary.com/dyuppnk6r/image/upload/v1707043969/qv52v6xuqsq2mzpmq3gc.jpg" alt="" className="h-12" /></TableCell>
              <TableCell>Gaming PC</TableCell>
              <TableCell>$1200</TableCell>
              <TableCell>Computer</TableCell>
              <TableCell>Asus</TableCell>
              <TableCell><i className="fas fa-edit"></i></TableCell>
              <TableCell><i className="fa-solid fa-trash"></i></TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="flex justify-end gap-x-2 mr-2 mt-2">
          <Button variant="outline">Prev</Button>
          <Button variant="outline">Next</Button>
        </div>
      </div>
    </div>
  );
}

export default ProductsList;
