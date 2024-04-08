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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

function CouponsList() {
  return (
    <div className="mx-2 mt-2">
      <div className="flex justify-between w-full items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Users (10)</h2>
        </div>
        <div>
          <Dialog>
            <DialogTrigger asChild className="mt-4">
              <Button variant="outline" className="bg-white text-black">
                <PlusIcon className="mr-2 h-4 w-4" />
                Create New
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-black border-gray-500">
              <DialogHeader>
                <DialogTitle>Create Coupon</DialogTitle>
                <DialogDescription>
                  Enter the details of the coupons you want to create.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="code" className="text-right">
                    Coupon Code
                  </Label>
                  <Input
                    id="name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Discount Amount
                  </Label>
                  <Input
                    id="amount"
                    className="col-span-3"
                    type="number"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Expirey Date
                  </Label>
                  <Input
                    id="date"
                    className="col-span-3"
                    type="date"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-white text-black">
                  Create
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Separator className="my-4" />
      <div>
        <Input placeholder="search coupons..." />
        <Table className="border rounded-md my-2">
          <TableHeader>
            <TableRow className="text-lg">
              <TableHead>Coupon Code</TableHead>
              <TableHead>Discount Amount</TableHead>
              <TableHead>Expires On</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow className="mt-2">
              <TableCell>CYB3R_99</TableCell>
              <TableCell className="text-green-500">$ 50</TableCell>
              <TableCell className="text-red-500">2024-09-14</TableCell>
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

export default CouponsList;
