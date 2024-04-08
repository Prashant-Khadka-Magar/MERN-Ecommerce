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

function OrdersList() {
  return (
    <div className="mx-2 mt-2">
      <div className="flex justify-between w-full items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Orders (10)</h2>
        </div>
        
      </div>
      <Separator className="my-4" />
      <div>
        <Input placeholder="search orders..." />
        <Table className="border rounded-md my-2">
          <TableHeader>
            <TableRow className="text-lg">
              <TableHead>Id</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Paid</TableHead>
              <TableHead>Delivered</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow className="mt-2">
              <TableCell>65cd893....</TableCell>
              <TableCell>Prashant Magar</TableCell>
              <TableCell>2024-02-15 </TableCell>
              <TableCell>$1195</TableCell>
              <TableCell>✔</TableCell>
              <TableCell>❌</TableCell>
              <TableCell>
                <Button>Details</Button>
              </TableCell>
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

export default OrdersList;
