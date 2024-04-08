import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";

function MyOrders() {
  return (
    <Table className="border rounded-md ">
      <TableHeader>
        <TableRow className="text-lg">
          <TableHead>Id</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Paid</TableHead>
          <TableHead>Delivered</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow className="mt-2">
          <TableCell>65cd893daa469ea92c09f286</TableCell>
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
  );
}

export default MyOrders;
